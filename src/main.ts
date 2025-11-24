import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config'; // Importamos la configuración buena

// Usamos appConfig en lugar de escribir los providers a mano
bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));