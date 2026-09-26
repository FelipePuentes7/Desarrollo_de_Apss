import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonImg, IonFab,
  IonFabButton, IonIcon, IonCard, IonButton,
  IonItem, IonLabel, IonToggle, IonBadge, IonButtons,
  ToastController, AlertController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  camera, trashOutline, sparkles, flashOffOutline,
  informationCircleOutline, imagesOutline, alertCircleOutline
} from 'ionicons/icons';
import { PhotoService } from '../services/photo.service';
import { UserPhoto } from '../models/photo.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonImg, IonFab,
    IonFabButton, IonIcon, IonCard, IonButton,
    IonItem, IonLabel, IonToggle, IonBadge, IonButtons
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title>Camara</ion-title>
        <ion-buttons slot="end">
          <ion-badge color="light" class="photo-counter">
            {{ photoService.photos().length }} {{ photoService.photos().length === 1 ? 'foto' : 'fotos' }}
          </ion-badge>
        </ion-buttons>
      </ion-toolbar>

      <!-- Barra de configuración de calidad -->
      <ion-toolbar color="light" class="quality-toolbar">
        <ion-item lines="none">
          <ion-icon
            [name]="isHighDef() ? 'sparkles' : 'flash-off-outline'"
            slot="start"
            [color]="isHighDef() ? 'tertiary' : 'medium'">
          </ion-icon>
          <ion-label>
            <h3>{{ isHighDef() ? 'Modo Alta Definición (1080p)' : 'Modo Ahorro de Datos (800px)' }}</h3>
            <p>{{ isHighDef() ? 'Calidad 95% • Mayor detalle' : 'Calidad 60% • Carga rápida' }}</p>
          </ion-label>
          <ion-toggle
            [checked]="isHighDef()"
            (ionChange)="toggleQuality($event.detail.checked)"
            color="tertiary">
          </ion-toggle>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding gallery-content">
      <ion-grid>
        <ion-row>
          <!-- Iteración reactiva sobre la señal del servicio -->
          @for (photo of photoService.photos(); track photo.filepath; let i = $index) {
            <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
              <ion-card class="photo-card">
                <div class="image-wrapper">
                  <ion-img [src]="photo.webPath" [alt]="photo.filepath"></ion-img>
                  <ion-badge color="dark" class="format-badge">{{ photo.format | uppercase }}</ion-badge>
                </div>
                <div class="card-actions ion-padding-horizontal ion-padding-bottom ion-padding-top">
                  <ion-button
                    color="medium"
                    fill="clear"
                    size="small"
                    (click)="showPhotoDetails(photo)">
                    <ion-icon slot="icon-only" name="information-circle-outline"></ion-icon>
                  </ion-button>
                  
                  <!-- Botón de eliminación con confirmación vía AlertController -->
                  <ion-button
                    color="danger"
                    fill="outline"
                    size="small"
                    (click)="confirmDelete(i, photo)">
                    <ion-icon slot="start" name="trash-outline"></ion-icon>
                    Eliminar
                  </ion-button>
                </div>
              </ion-card>
            </ion-col>
          } @empty {
            <!-- Bloque mostrado cuando no hay fotografías -->
            <ion-col size="12" class="ion-text-center">
              <div class="empty-state">
                <div class="empty-icon-container">
                  <ion-icon name="images-outline" class="empty-icon"></ion-icon>
                </div>
                <h2>Sin fotografías registradas</h2>
                <p>Presione el botón de la cámara inferior para capturar o seleccionar su primera evidencia.</p>
              </div>
            </ion-col>
          }
        </ion-row>
      </ion-grid>

      <!-- Botón Flotante para Capturar (FAB) -->
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button color="primary" (click)="takePhoto()">
          <ion-icon name="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [`
    .photo-counter {
      margin-right: 12px;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .quality-toolbar ion-item {
      --background: transparent;
      --padding-start: 16px;
      --padding-end: 16px;
    }

    .photo-card {
      border-radius: 16px;
      overflow: hidden;
      margin: 8px 0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .photo-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      height: 220px;
      background: #f1f5f9;
      overflow: hidden;
    }

    .image-wrapper ion-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .format-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
      opacity: 0.9;
    }

    .card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .empty-state {
      margin-top: 60px;
      padding: 24px;
      color: #64748b;
    }

    .empty-icon-container {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .empty-icon {
      font-size: 42px;
      color: #94a3b8;
    }

    .empty-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 8px;
    }

    .empty-state p {
      font-size: 0.95rem;
      max-width: 320px;
      margin: 0 auto;
      line-height: 1.5;
    }

    ion-fab-button {
      --box-shadow: 0 6px 20px rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.4);
      transform: scale(1.1);
      margin-bottom: 16px;
    }
  `]
})
export class GalleryPage {
  public photoService = inject(PhotoService);
  private toastController = inject(ToastController);
  private alertController = inject(AlertController);

  // Señal local para el estado del interruptor de calidad
  public isHighDef = signal<boolean>(false);

  constructor() {
    addIcons({
      camera,
      trashOutline,
      sparkles,
      flashOffOutline,
      informationCircleOutline,
      imagesOutline,
      alertCircleOutline
    });
  }

  toggleQuality(enabled: boolean): void {
    this.isHighDef.set(enabled);
  }

  async takePhoto(): Promise<void> {
    const result = await this.photoService.takeNewPhoto(this.isHighDef());

    if (!result.success) {
      if (result.reason === 'permission_denied') {
        await this.showPermissionAlert();
      } else if (result.reason === 'cancelled') {
        await this.showCancelledAlert();
      } else if (result.reason === 'error') {
        await this.showErrorAlert();
      }
    }
  }

  /**
   * Muestra una alerta (AlertController) cuando el usuario cancela o cierra la cámara sin tomar la foto
   */
  private async showCancelledAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Acción no completada',
      subHeader: 'Captura cancelada',
      message: 'No se capturó ninguna fotografía. La cámara o selector fue cerrado sin tomar la foto.',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  /**
   * Muestra un AlertController en caso de fallo inesperado de hardware
   */
  private async showErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error de Cámara',
      subHeader: 'No se pudo completar la acción',
      message: 'Ocurrió un inconveniente al intentar abrir o procesar la imagen.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  /**
   * Muestra un AlertController con advertencia detallada si se deniegan los permisos
   */
  private async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permisos Requeridos',
      subHeader: 'Cámara y Galería no disponibles',
      message: 'Para capturar o seleccionar fotografías de evidencias, debe conceder permisos de acceso a la cámara y a la galería en los ajustes del dispositivo.',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  /**
   * Confirmación de eliminación de fotografía utilizando AlertController (Puntos Extras)
   * @param index Posición de la foto en la lista
   * @param photo Fotografía a eliminar
   */
  async confirmDelete(index: number, photo: UserPhoto): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      subHeader: photo.filepath,
      message: '¿Está seguro de que desea eliminar permanentemente esta evidencia fotográfica?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.photoService.deletePhoto(index);
            this.showDeletedToast();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Muestra los detalles de la fotografía mediante AlertController
   */
  async showPhotoDetails(photo: UserPhoto): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Detalle de la Evidencia',
      subHeader: `Formato: ${photo.format.toUpperCase()}`,
      message: `<strong>Nombre de archivo:</strong><br>${photo.filepath}<br><br><strong>Ruta web:</strong><br><small style="word-break: break-all;">${photo.webPath || 'En memoria'}</small>`,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  private async showDeletedToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Fotografía eliminada con éxito.',
      duration: 2500,
      position: 'bottom',
      color: 'dark',
      icon: 'trash-outline'
    });

    await toast.present();
  }
}
