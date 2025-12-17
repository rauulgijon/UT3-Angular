import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <--- Importante para el botón de volver
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-arbitros-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <--- Añadido aquí
  templateUrl: './arbitrosAdmin.html',
  styleUrl: './arbitrosAdmin.scss'
})
export class ArbitrosAdminComponent implements OnInit {
  private adminService = inject(AdminService);

  listaArbitros: any[] = [];
  mostrarFormulario: boolean = false;
  idEdicion: string | null = null;

  // Modelo completo con todos los datos
  nuevoArbitro = {
    username: '',
    email: '',
    password: '',
    dni: '',
    telefono: '',
    deporte: '',
    rol: 'arbitro' // Siempre será árbitro
  };

  ngOnInit() {
    this.cargarArbitros();
  }

  cargarArbitros() {
    this.adminService.obtenerArbitros().subscribe({
      next: (data) => this.listaArbitros = data,
      error: (e) => console.error('Error al cargar árbitros', e)
    });
  }

  guardar() {
    // Validaciones básicas
    if (!this.nuevoArbitro.username || !this.nuevoArbitro.email) {
      alert('Nombre y Email son obligatorios');
      return;
    }

    if (this.idEdicion) {
      // --- EDITAR ÁRBITRO EXISTENTE ---
      // Si la contraseña está vacía, la quitamos para no sobrescribirla
      const datosActualizar = { ...this.nuevoArbitro };
      if (!datosActualizar.password) {
        delete (datosActualizar as any).password;
      }

      this.adminService.actualizarUsuario(this.idEdicion, datosActualizar).subscribe({
        next: () => {
          this.cerrarFormulario();
          this.cargarArbitros();
        },
        error: (e) => alert('Error al actualizar árbitro')
      });

    } else {
      // --- CREAR NUEVO ÁRBITRO ---
      if (!this.nuevoArbitro.password) {
        alert('La contraseña es obligatoria para nuevos árbitros');
        return;
      }
      
      this.adminService.crearUsuario(this.nuevoArbitro).subscribe({
        next: () => {
          this.cerrarFormulario();
          this.cargarArbitros();
        },
        error: (e) => alert('Error al crear árbitro. Puede que el usuario o email ya existan.')
      });
    }
  }

  editar(arbitro: any) {
    this.idEdicion = arbitro._id;
    // Copiamos los datos al formulario
    this.nuevoArbitro = { 
      username: arbitro.username,
      email: arbitro.email,
      password: '', // La contraseña no se muestra por seguridad
      dni: arbitro.dni || '',
      telefono: arbitro.telefono || '',
      deporte: arbitro.deporte || '',
      rol: 'arbitro'
    };
    this.mostrarFormulario = true;
  }

  borrar(id: string) {
    if (confirm('¿Seguro que quieres eliminar este árbitro?')) {
      this.adminService.borrarArbitro(id).subscribe(() => this.cargarArbitros());
    }
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.idEdicion = null;
    this.nuevoArbitro = {
      username: '', email: '', password: '', 
      dni: '', telefono: '', deporte: '', rol: 'arbitro'
    };
  }
}