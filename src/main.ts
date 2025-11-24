import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login';
import { RegistroComponent } from './app/components/registro/registro';
import {routes} from './app/app.routes';
import { App } from './app/app';
import 'zone.js'; 


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));