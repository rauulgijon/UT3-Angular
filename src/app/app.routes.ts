import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
    // Rutas públicas
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    
    // Rutas según el rol (Lazy Loading ajustado a tu estructura)
    { 
        path: 'admin', 
        loadComponent: () => import('./components/admin_view/admin_view').then(m => m.AdminViewComponent) 
    },
    { 
        path: 'jugador', 
        loadComponent: () => import('./components/jugador_view/jugador_view').then(m => m.JugadorViewComponent) 
    },
    { 
        path: 'arbitro', 
        loadComponent: () => import('./components/arbitro_view/arbitro_view').then(m => m.ArbitroViewComponent) 
    },

    // Redirección por defecto para rutas desconocidas
    { path: '**', redirectTo: '' }
];