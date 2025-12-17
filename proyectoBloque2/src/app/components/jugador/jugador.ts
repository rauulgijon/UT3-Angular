import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jugador.html',
  styleUrl: './jugador.scss'
})
export class JugadorComponent implements OnInit {
  private adminService = inject(AdminService);
  
  usuario: any = {};
  misPartidos: any[] = [];
  vistaActual: 'partidos' | 'perfil' = 'partidos';

  ngOnInit() {
    // 1. Recuperar usuario logueado
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
      this.cargarMisPartidos();
    } else {
        // Si no hay usuario, volver al login (seguridad básica)
        window.location.href = '/login';
    }
  }

  cargarMisPartidos() {
    this.adminService.obtenerMisPartidos(this.usuario._id).subscribe({
      next: (data) => this.misPartidos = data,
      error: (e) => console.error('Error cargando partidos', e)
    });
  }

  guardarPerfil() {
    this.adminService.actualizarUsuario(this.usuario._id, this.usuario).subscribe({
      next: () => {
          alert('Perfil actualizado correctamente');
          // Actualizamos el localStorage con los nuevos datos
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
      },
      error: () => alert('Error al actualizar perfil')
    });
  }
  
  cerrarSesion() {
      localStorage.removeItem('usuario');
      window.location.href = '/login';
  }
}