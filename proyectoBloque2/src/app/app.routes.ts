import { Routes } from '@angular/router';

//Un impor por cada componente que desarrollo
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { AdminComponent } from './components/admin/admin';
import { ArbitroComponent } from './components/arbitro/arbitro';
import { JugadorComponent } from './components/jugador/jugador';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'admin', component: AdminComponent }, 
    { path: 'arbitro', component: ArbitroComponent},
    { path: 'jugador', component: JugadorComponent}

];

