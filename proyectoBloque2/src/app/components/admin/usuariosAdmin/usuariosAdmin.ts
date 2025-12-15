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

    listaUsuarios: any[] = [];      // Todos los usuarios traídos del servidor
    usuariosFiltrados: any[] = [];  // Los que se muestran en la tabla (filtrados)
    busqueda: string = '';
    mostrarFormulario: boolean = false;

    // Objeto para guardar los datos del nuevo usuario
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

    // 1. LEER (READ)
    cargarUsuarios() {
        this.adminService.obtenerUsuarios().subscribe({
            next: (data) => {
                this.listaUsuarios = data;
                this.filtrar(); // Actualizamos la vista
            },
            error: (e) => console.error('Error cargando usuarios:', e)
        });
    }

    // Lógica del buscador
    filtrar() {
        if (!this.busqueda) {
            this.usuariosFiltrados = this.listaUsuarios;
        } else {
            const texto = this.busqueda.toLowerCase();
            this.usuariosFiltrados = this.listaUsuarios.filter(u => 
                u.username.toLowerCase().includes(texto) ||
                u.email.toLowerCase().includes(texto)
            );
        }
    }

    // 2. CREAR (CREATE)
    guardar() {
        // Validación básica
        if (!this.nuevoUsuario.username || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
            alert('Por favor, rellena Usuario, Email y Contraseña.');
            return;
        }

        this.adminService.crearUsuario(this.nuevoUsuario).subscribe({
            next: () => {
                alert('Usuario creado con éxito');
                this.mostrarFormulario = false; // Ocultar formulario
                this.limpiarFormulario();       // Limpiar campos
                this.cargarUsuarios();          // ¡Importante! Recargar la tabla
            },
            error: (e) => {
                console.error(e);
                alert('Error al crear usuario. Verifica que el usuario o email no existan ya.');
            }
        });
    }

    // 3. BORRAR (DELETE)
    borrar(id: string) {
        if(confirm('¿Seguro que deseas eliminar este usuario permanentemente?')) {
            this.adminService.borrarUsuario(id).subscribe({
                next: () => {
                    this.cargarUsuarios(); // Recargar la tabla tras borrar
                },
                error: (err) => alert("Error al borrar el usuario")
            });
        }
    }

    limpiarFormulario() {
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