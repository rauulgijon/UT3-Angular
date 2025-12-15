import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { AdminComponent } from './components/admin/admin';
import { UsuariosAdminComponent } from './components/admin/usuariosAdmin/usuariosAdmin';
import { ArbitrosAdminComponent } from './components/admin/arbitrosAdmin/arbitrosAdmin';
// IMPORTANTE: Importar los nuevos componentes
import { CompeticionesAdminComponent } from './components/admin/competicionesAdmin/competicionesAdmin';
import { PartidosAdminComponent } from './components/admin/partidosAdmin/partidosAdmin';

import { ArbitroComponent } from './components/arbitro/arbitro';
import { JugadorComponent } from './components/jugador/jugador';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    
    // Panel Principal Admin
    { path: 'admin', component: AdminComponent }, 
    
    // Secciones del Admin
    { path: 'admin/usuariosAdmin', component: UsuariosAdminComponent },
    { path: 'admin/arbitrosAdmin', component: ArbitrosAdminComponent },
    
    // --- ESTAS SON LAS RUTAS QUE TE FALTABAN ---
    { path: 'admin/competiciones', component: CompeticionesAdminComponent },
    // El :id es la parte dinámica (el código raro de la URL)
    { path: 'admin/competiciones/:id/partidos', component: PartidosAdminComponent },

    // Pantallas de otros roles
    { path: 'arbitro', component: ArbitroComponent},
    { path: 'jugador', component: JugadorComponent}
];