import { Injectable, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { UserPhoto } from '../models/photo.model';

const STORAGE_KEY = 'user_photos_storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // 1. Estado reactivo privado inicializado desde LocalStorage para conservar fotos al recargar
  private photosSignal = signal<UserPhoto[]>(this.loadSavedPhotos());

  // 2. Exposición de solo lectura del estado para los componentes
  public readonly photos = this.photosSignal.asReadonly();

  /**
   * Carga las fotografías guardadas previamente en el almacenamiento local
   */
  private loadSavedPhotos(): UserPhoto[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al cargar fotos de localStorage:', error);
      return [];
    }
  }

  /**
   * Guarda el arreglo de fotografías en el almacenamiento local
   */
  private saveToStorage(photos: UserPhoto[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
      console.error('Error al persistir fotos en localStorage:', error);
    }
  }

  /**
   * Convierte una URI / Blob web en formato Base64 para persistencia permanente al recargar la página
   */
  private async readAsBase64(webPath: string): Promise<string> {
    try {
      const response = await fetch(webPath);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('No se pudo convertir a Base64, usando webPath original:', error);
      return webPath;
    }
  }

  /**
   * Captura una foto permitiendo al usuario elegir origen y calidad.
   * @param isHighDef Define si la imagen se procesa en alta calidad o ahorro de datos.
   * @returns boolean true si la foto fue tomada, false si hubo error o permiso denegado.
   */
  async takeNewPhoto(isHighDef: boolean = false): Promise<{ success: boolean; reason?: 'permission_denied' | 'cancelled' | 'error' }> {
    try {
      // 1. Verificación y solicitud de permisos para plataformas nativas (Android/iOS)
      if (Capacitor.isNativePlatform()) {
        const checkStatus = await Camera.checkPermissions();

        if (checkStatus.camera !== 'granted' || checkStatus.photos !== 'granted') {
          const request = await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
          if (request.camera !== 'granted' && request.photos !== 'granted') {
            console.warn('Permisos de cámara o galería no concedidos.');
            return { success: false, reason: 'permission_denied' };
          }
        }
      }

      // 2. Parámetros dinámicos según el modo seleccionado
      const imageQuality = isHighDef ? 95 : 60;
      const targetWidth = isHighDef ? 1920 : 800;

      // 3. Captura con CameraSource.Prompt (Diálogo nativo: Cámara o Carrete)
      const capturedPhoto: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // Permite al usuario elegir entre cámara o galería
        quality: imageQuality,
        width: targetWidth,
        allowEditing: false,
        promptLabelHeader: 'Seleccionar Origen',
        promptLabelPhoto: 'Elegir de la Galería',
        promptLabelPicture: 'Tomar Fotografía'
      });

      // Convertimos a formato persistente en Base64 para que no se pierda al recargar la página
      let persistentWebPath = capturedPhoto.webPath;
      if (capturedPhoto.webPath) {
        persistentWebPath = await this.readAsBase64(capturedPhoto.webPath);
      }

      // 4. Mapeo a nuestro modelo de dominio
      const newPhoto: UserPhoto = {
        filepath: `${Date.now()}.${capturedPhoto.format}`,
        webPath: persistentWebPath,
        format: capturedPhoto.format
      };

      // 5. Actualización inmutable del estado y guardado en almacenamiento local
      this.photosSignal.update(photos => {
        const updated = [newPhoto, ...photos];
        this.saveToStorage(updated);
        return updated;
      });

      return { success: true };

    } catch (error: any) {
      const msg = error?.message?.toLowerCase() || '';
      if (msg.includes('cancel') || msg.includes('dismiss') || msg.includes('closed') || msg.includes('no file selected') || msg.includes('no files selected')) {
        console.log('El usuario canceló la captura de imagen.');
        return { success: false, reason: 'cancelled' };
      }
      console.error('Error durante la captura:', error);
      return { success: false, reason: 'error' };
    }
  }

  /**
   * Método para eliminar una imagen del estado y actualizar el almacenamiento local
   * @param index Índice de la foto a eliminar
   */
  deletePhoto(index: number): void {
    this.photosSignal.update(photos => {
      const updated = photos.filter((_, i) => i !== index);
      this.saveToStorage(updated);
      return updated;
    });
  }
}
