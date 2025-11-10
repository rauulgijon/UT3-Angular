import { Routes } from '@angular/router';

// un import por cad acomponenete que desarrollo

import { LoginComponent } from './components/login/login';
// import { EquiposComponent } from './components/equipos/equipos';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }
    // { path: 'equipos', component: EquiposComponent }
];

