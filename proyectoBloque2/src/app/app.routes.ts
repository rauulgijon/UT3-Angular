import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { AdminComponent } from './components/admin/admin';
import { UsuariosAdminComponent } from './components/admin/usuariosAdmin/usuariosAdmin';
import { ArbitrosAdminComponent } from './components/admin/arbitrosAdmin/arbitrosAdmin';
import { CompeticionesAdminComponent } from './components/admin/competicionesAdmin/competicionesAdmin';
import { PartidosAdminComponent } from './components/admin/partidosAdmin/partidosAdmin';

import { ArbitroComponent } from './components/arbitro/arbitro';
import { JugadorComponent } from './components/jugador/jugador';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    
    { path: 'admin', component: AdminComponent }, 
    
    { path: 'admin/usuariosAdmin', component: UsuariosAdminComponent },
    { path: 'admin/arbitrosAdmin', component: ArbitrosAdminComponent },
    
    { path: 'admin/competiciones', component: CompeticionesAdminComponent },
    { path: 'admin/competiciones/:id/partidos', component: PartidosAdminComponent },

    { path: 'arbitro', component: ArbitroComponent},
    { path: 'jugador', component: JugadorComponent}
];