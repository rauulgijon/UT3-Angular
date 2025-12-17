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
  listaEquipos: any[] = []; 
  
  equipoSeleccionado: string = ''; 
  vistaActual: 'partidos' | 'perfil' = 'partidos';

  ngOnInit() {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
      
      if (this.usuario.equipo) {
          this.equipoSeleccionado = this.usuario.equipo._id || this.usuario.equipo;
      }

      this.cargarDatos();
    } else {
        window.location.href = '/login';
    }
  }

  cargarDatos() {
    this.adminService.obtenerMisPartidos(this.usuario._id).subscribe({
      next: (data) => this.misPartidos = data,
      error: (e) => console.error('Error cargando partidos', e)
    });

    this.adminService.obtenerEquipos().subscribe({
      next: (data) => this.listaEquipos = data,
      error: (e) => console.error('Error cargando equipos', e)
    });
  }

  guardarPerfil() {
    this.usuario.equipo = this.equipoSeleccionado || null;

    this.adminService.actualizarUsuario(this.usuario._id, this.usuario).subscribe({
      next: (res) => {
          alert('Perfil actualizado correctamente');
          
          this.usuario = res.usuario; 
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          
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