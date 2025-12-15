import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuariosAdmin.html',
    styleUrl: './usuariosAdmin.scss'
})
export class UsuariosAdminComponent implements OnInit {
    
    private adminService = inject(AdminService);

    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];
    busqueda: string = '';
    mostrarFormulario: boolean = false;
    
    // Variable para saber si estamos editando (tendrá el ID) o creando (será null)
    idEdicion: string | null = null;

    nuevoUsuario = {
        username: '',
        email: '',
        password: '',
        rol: 'jugador',
        dni: '',
        deporte: '',
        telefono: ''
    };

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.adminService.obtenerUsuarios().subscribe({
            next: (data) => {
                this.listaUsuarios = data;
                this.filtrar();
            },
            error: (e) => console.error('Error:', e)
        });
    }

    filtrar() {
        if (!this.busqueda) {
            this.usuariosFiltrados = this.listaUsuarios;
        } else {
            const texto = this.busqueda.toLowerCase();
            this.usuariosFiltrados = this.listaUsuarios.filter(u => 
                (u.username && u.username.toLowerCase().includes(texto)) ||
                (u.email && u.email.toLowerCase().includes(texto))
            );
        }
    }

    // Función unificada para Guardar (Crear o Editar)
    guardar() {
        if (!this.nuevoUsuario.username || !this.nuevoUsuario.email) {
            alert('Usuario y Email son obligatorios');
            return;
        }

        if (this.idEdicion) {
            // --- MODO EDICIÓN ---
            this.adminService.actualizarUsuario(this.idEdicion, this.nuevoUsuario).subscribe({
                next: () => {
                    alert('Usuario actualizado correctamente');
                    this.cerrarFormulario();
                    this.cargarUsuarios();
                },
                error: (e) => alert('Error al actualizar')
            });
        } else {
            // --- MODO CREACIÓN ---
            if (!this.nuevoUsuario.password) {
                alert('La contraseña es obligatoria para nuevos usuarios');
                return;
            }
            this.adminService.crearUsuario(this.nuevoUsuario).subscribe({
                next: () => {
                    alert('Usuario creado correctamente');
                    this.cerrarFormulario();
                    this.cargarUsuarios();
                },
                error: (e) => alert('Error al crear')
            });
        }
    }

    // Cargar datos en el formulario para editar
    editar(usuario: any) {
        this.idEdicion = usuario._id; // Guardamos el ID que estamos editando
        this.nuevoUsuario = { ...usuario }; // Copiamos los datos al formulario
        this.nuevoUsuario.password = ''; // Por seguridad, limpiamos la contraseña (opcional)
        this.mostrarFormulario = true; // Abrimos el formulario
    }

    borrar(id: string) {
        if(confirm('¿Borrar usuario permanentemente?')) {
            this.adminService.borrarUsuario(id).subscribe(() => this.cargarUsuarios());
        }
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.idEdicion = null; // Resetear modo edición
        this.limpiarModelo();
    }

    limpiarModelo() {
        this.nuevoUsuario = {
            username: '',
            email: '',
            password: '',
            rol: 'jugador',
            dni: '',
            deporte: '',
            telefono: ''
        };
    }
}