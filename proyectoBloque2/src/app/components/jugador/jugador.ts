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
  listaEquipos: any[] = []; // Lista para el desplegable
  
  equipoSeleccionado: string = ''; // ID para el ngModel del select
  vistaActual: 'partidos' | 'perfil' = 'partidos';

  ngOnInit() {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
      
      // Inicializamos el select si el usuario ya tiene equipo
      if (this.usuario.equipo) {
          // Si equipo es un objeto (populate), usamos _id, si es string, usamos tal cual
          this.equipoSeleccionado = this.usuario.equipo._id || this.usuario.equipo;
      }

      this.cargarDatos();
    } else {
        window.location.href = '/login';
    }
  }

  cargarDatos() {
    // 1. Cargar Partidos del Jugador
    this.adminService.obtenerMisPartidos(this.usuario._id).subscribe({
      next: (data) => this.misPartidos = data,
      error: (e) => console.error('Error cargando partidos', e)
    });

    // 2. Cargar Lista de Equipos para el perfil
    this.adminService.obtenerEquipos().subscribe({
      next: (data) => this.listaEquipos = data,
      error: (e) => console.error('Error cargando equipos', e)
    });
  }

  guardarPerfil() {
    // Asignamos el equipo seleccionado al objeto usuario
    this.usuario.equipo = this.equipoSeleccionado || null;

    this.adminService.actualizarUsuario(this.usuario._id, this.usuario).subscribe({
      next: (res) => {
          alert('Perfil actualizado correctamente');
          
          // Actualizamos el usuario local con la respuesta del servidor (que trae el equipo populated)
          this.usuario = res.usuario; 
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          
          // Recargamos los partidos por si ha cambiado de equipo
          this.cargarDatos();
      },
      error: () => alert('Error al actualizar perfil')
    });
  }
  
  cerrarSesion() {
      localStorage.removeItem('usuario');
      window.location.href = '/login';
  }
}