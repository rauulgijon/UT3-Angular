import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './usuariosAdmin.html',
    styleUrl: './usuariosAdmin.scss'
})
export class UsuariosAdminComponent implements OnInit {
    
    private adminService = inject(AdminService);

    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];
    busqueda: string = '';
    
    mostrarFormulario: boolean = false;
    idEdicion: string | null = null;

    nuevoUsuario: any = {
        username: '',
        email: '',
        password: '',
        rol: 'jugador',
        deporte: '',
        dni: '',
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
            error: (e) => console.error('Error al cargar usuarios:', e)
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

    guardar() {
        if (!this.nuevoUsuario.username || !this.nuevoUsuario.email || (!this.idEdicion && !this.nuevoUsuario.password)) {
            alert('Usuario, Email y Contraseña son obligatorios');
            return;
        }

        if (this.idEdicion) {
            if (!this.nuevoUsuario.password) {
                delete this.nuevoUsuario.password;
            }
            
            this.adminService.actualizarUsuario(this.idEdicion, this.nuevoUsuario).subscribe({
                next: () => { 
                    this.cerrarFormulario(); 
                    this.cargarUsuarios(); 
                },
                error: (e) => alert('Error al actualizar usuario')
            });
        } else {
            this.adminService.crearUsuario(this.nuevoUsuario).subscribe({
                next: () => { 
                    this.cerrarFormulario(); 
                    this.cargarUsuarios(); 
                },
                error: (e) => alert('Error al crear usuario')
            });
        }
    }

    editar(item: any) {
        this.idEdicion = item._id;
        this.nuevoUsuario = { ...item, password: '' }; 
        this.mostrarFormulario = true;
    }

    borrar(id: string) {
        if(confirm('¿Estás seguro de eliminar este usuario?')) {
            this.adminService.borrarUsuario(id).subscribe(() => this.cargarUsuarios());
        }
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.idEdicion = null;
        this.nuevoUsuario = {
            username: '',
            email: '',
            password: '',
            rol: 'jugador',
            deporte: '',
            dni: '',
            telefono: ''
        };
    }
}