import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';

import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class App {
  protected readonly title = signal('proyectoBloque2');
}
