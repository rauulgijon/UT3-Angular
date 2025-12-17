import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-arbitro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './arbitro.html',
  styleUrl: './arbitro.scss'
})
export class ArbitroComponent implements OnInit {
  private adminService = inject(AdminService);
  
  usuario: any = {};
  partidosAsignados: any[] = [];
  
  vistaActual: 'partidos' | 'perfil' = 'partidos';

  mostrarModal: boolean = false;
  partidoSeleccionado: any = null;
  nuevoResultado: string = '';

  ngOnInit() {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
      if (!this.usuario.deporte) this.usuario.deporte = ""; 
      this.cargarPartidos();
    } else {
        window.location.href = '/login';
    }
  }

  cargarPartidos() {
    this.adminService.obtenerPartidosArbitro(this.usuario._id).subscribe({
        next: (data) => this.partidosAsignados = data,
        error: (e) => console.error('Error cargando partidos:', e)
    });
  }

  guardarPerfil() {
    this.adminService.actualizarUsuario(this.usuario._id, this.usuario).subscribe({
      next: (res) => {
          alert('Perfil guardado correctamente');
          if(res && res.usuario) this.usuario = res.usuario;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
      },
      error: (e) => {
          console.error(e);
          alert('Error al guardar el perfil.');
      }
    });
  }

  abrirActa(partido: any) {
      this.partidoSeleccionado = partido;
      this.nuevoResultado = partido.resultado || ''; 
      this.mostrarModal = true;
  }

  guardarActa() {
      if(!this.partidoSeleccionado) return;
      this.adminService.actualizarResultado(this.partidoSeleccionado._id, this.nuevoResultado).subscribe({
          next: () => {
              alert('Acta guardada correctamente');
              this.mostrarModal = false;
              this.cargarPartidos();
          },
          error: () => alert('Error al guardar el acta')
      });
  }
  
  cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }
}