import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importamos RouterModule

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule], // Necesario para la navegación
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {
  private router = inject(Router);

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('usuario'); // Borramos el usuario guardado
    this.router.navigate(['/login']);   // Mandamos al login
  }

  // Función para navegar a las sub-páginas
  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
}