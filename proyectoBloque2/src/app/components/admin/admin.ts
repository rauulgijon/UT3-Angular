import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('usuario'); 
    this.router.navigate(['/login']); 
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
}