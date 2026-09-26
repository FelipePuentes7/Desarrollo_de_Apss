import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonList,
  IonListHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonNote,
  IonIcon,
  IonBadge,
  IonChip,
  IonAvatar,
  IonThumbnail,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonModal,
  IonPopover,
  IonToast,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonCheckbox,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonSearchbar,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonSpinner,
  IonText,
  IonRefresher,
  IonRefresherContent,
  IonReorderGroup,
  IonReorder,
  IonSegment,
  IonSegmentButton,
  ItemReorderEventDetail,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  albumsOutline,
  optionsOutline,
  alertCircleOutline,
  pricetagOutline,
  trailSignOutline,
  playOutline,
  cardOutline,
  checkboxOutline,
  hardwareChipOutline,
  documentTextOutline,
  calendarOutline,
  addCircleOutline,
  gridOutline,
  sparklesOutline,
  infiniteOutline,
  createOutline,
  listOutline,
  reorderFourOutline,
  imageOutline,
  menuOutline,
  openOutline,
  navigateOutline,
  chatbubbleEllipsesOutline,
  timeOutline,
  radioButtonOnOutline,
  refreshCircleOutline,
  swapVerticalOutline,
  gitBranchOutline,
  searchOutline,
  layersOutline,
  chevronDownCircleOutline,
  browsersOutline,
  notificationsOutline,
  toggleOutline,
  barChartOutline,
  textOutline,
  chevronForwardOutline,
  closeOutline,
  informationCircleOutline,
  codeSlashOutline,
  addOutline,
  trashOutline,
  shareSocialOutline,
  heartOutline,
  mailOutline,
  personCircleOutline,
  checkmarkCircleOutline,
  starOutline,
  sunnyOutline,
  moonOutline,
  colorPaletteOutline,
  callOutline,
  pinOutline,
  rocketOutline,
  volumeHighOutline,
  volumeMuteOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  flashOutline,
  eyeOutline,
  homeOutline,
  schoolOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonList,
    IonListHeader,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonNote,
    IonIcon,
    IonBadge,
    IonChip,
    IonAvatar,
    IonThumbnail,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonAccordion,
    IonAccordionGroup,
    IonActionSheet,
    IonAlert,
    IonModal,
    IonPopover,
    IonToast,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonCheckbox,
    IonInput,
    IonRadioGroup,
    IonRadio,
    IonRange,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonSearchbar,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
    IonSpinner,
    IonText,
    IonRefresher,
    IonRefresherContent,
    IonReorderGroup,
    IonReorder,
    IonSegment,
    IonSegmentButton,
  ],
})
export class Tab1Page {
  // Filtros principales
  searchQuery: string = '';
  activeCategory: string = 'all';

  // 1. Accordion
  accordionSelected: string = 'first';

  // 2. Action Sheet
  isActionSheetOpen: boolean = false;
  actionSheetButtons = [
    {
      text: 'Eliminar Elemento',
      role: 'destructive',
      icon: 'trash-outline',
      data: { action: 'delete' },
    },
    {
      text: 'Compartir Proyecto',
      icon: 'share-social-outline',
      data: { action: 'share' },
    },
    {
      text: 'Favorito',
      icon: 'heart-outline',
      data: { action: 'favorite' },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: { action: 'cancel' },
    },
  ];

  // 3. Alert
  isAlertOpen: boolean = false;
  alertButtons = ['Cancelar', 'Confirmar'];

  // 4. Badge
  badgeCount: number = 7;

  // 5. Breadcrumbs
  currentBreadcrumb: string = 'Tab1';

  // 6. Button
  buttonClickCount: number = 0;

  // 8. Checkbox
  checkboxState: boolean = true;
  checkboxMultiple = {
    html: true,
    typescript: true,
    ionic: true,
    capacitor: false,
  };

  // 9. Chip
  activeChip: string = 'Ionic v9';

  // 11. Datetime
  selectedDateTime: string = new Date().toISOString();

  // 15. Infinite scroll demo data
  infiniteItems: string[] = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4'];

  // 16. Input
  textInputVal: string = 'Hola Profesor';
  emailInputVal: string = 'profesor@universidad.edu';
  passwordInputVal: string = 'ionic1234';

  // 21. Modal
  isModalOpen: boolean = false;

  // 23. Popover
  isPopoverOpen: boolean = false;

  // 24. Progress
  progressValue: number = 0.65;

  // 25. Radio
  selectedFramework: string = 'ionic-angular';

  // 26. Range
  sliderValue: number = 60;

  // 28. Reorder Group
  reorderItems: string[] = [
    '1. Introducción a Ionic y Componentes',
    '2. Creación de Vistas y Plantillas',
    '3. Gestión de Estado y Formularios',
    '4. Navegación por Pestañas y Rutas',
  ];

  // 30. Searchbar demo
  sampleSearchText: string = '';

  // 31. Segment demo
  demoSegment: string = 'preview';

  // 32. Select
  selectedTheme: string = 'dark';

  // 34. Toast
  isToastOpen: boolean = false;
  toastMessage: string = '¡Operación realizada con éxito!';

  // 35. Toggle
  toggleState: boolean = true;
  soundToggleState: boolean = false;

  constructor() {
    addIcons({
      albumsOutline,
      optionsOutline,
      alertCircleOutline,
      pricetagOutline,
      trailSignOutline,
      playOutline,
      cardOutline,
      checkboxOutline,
      hardwareChipOutline,
      documentTextOutline,
      calendarOutline,
      addCircleOutline,
      gridOutline,
      sparklesOutline,
      infiniteOutline,
      createOutline,
      listOutline,
      reorderFourOutline,
      imageOutline,
      menuOutline,
      openOutline,
      navigateOutline,
      chatbubbleEllipsesOutline,
      timeOutline,
      radioButtonOnOutline,
      refreshCircleOutline,
      swapVerticalOutline,
      gitBranchOutline,
      searchOutline,
      layersOutline,
      chevronDownCircleOutline,
      browsersOutline,
      notificationsOutline,
      toggleOutline,
      barChartOutline,
      textOutline,
      chevronForwardOutline,
      closeOutline,
      informationCircleOutline,
      codeSlashOutline,
      addOutline,
      trashOutline,
      shareSocialOutline,
      heartOutline,
      mailOutline,
      personCircleOutline,
      checkmarkCircleOutline,
      starOutline,
      sunnyOutline,
      moonOutline,
      colorPaletteOutline,
      callOutline,
      pinOutline,
      rocketOutline,
      volumeHighOutline,
      volumeMuteOutline,
      refreshOutline,
      shieldCheckmarkOutline,
      flashOutline,
      eyeOutline,
      homeOutline,
      schoolOutline,
    });
  }

  // Manejo de Reordenamiento
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const itemToMove = this.reorderItems.splice(ev.detail.from, 1)[0];
    this.reorderItems.splice(ev.detail.to, 0, itemToMove);
    ev.detail.complete();
  }

  // Manejo de Refresher
  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.badgeCount += 1;
      this.toastMessage = '¡Contenido actualizado mediante IonRefresher!';
      this.isToastOpen = true;
      (event.target as HTMLIonRefresherElement).complete();
    }, 1500);
  }

  // Manejo de Infinite Scroll
  addMoreInfiniteItems() {
    const nextIndex = this.infiniteItems.length + 1;
    this.infiniteItems.push(`Elemento ${nextIndex}`, `Elemento ${nextIndex + 1}`);
  }

  // Incrementar click
  incrementClick() {
    this.buttonClickCount++;
  }

  // Mostrar Toast personalizado
  showToast(msg: string) {
    this.toastMessage = msg;
    this.isToastOpen = true;
  }

  // Filtro de visibilidad
  isVisible(id: string, category: string): boolean {
    const matchesCategory = this.activeCategory === 'all' || this.activeCategory === category;
    if (!matchesCategory) return false;

    const term = this.searchQuery.toLowerCase().trim();
    if (!term) return true;

    return id.toLowerCase().includes(term) || category.toLowerCase().includes(term);
  }
}
