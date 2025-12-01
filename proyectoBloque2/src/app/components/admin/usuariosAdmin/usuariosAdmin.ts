import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './usuariosAdmin.html',
    styleUrl: './usuariosAdmin.scss'
})
export class UsuariosAdminComponent implements OnInit {
    
    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];
    busqueda: string = '';
    mostrarFormulario: boolean = false;

    // AHORA INCLUYE LOS CAMPOS EXTRA
    nuevoUsuario = {
        username: '',
        email: '',
        password: '',
        rol: 'jugador',
        dni: '',
        deporte: '',
        telefono: ''
    };

    constructor(private adminService: AdminService) {}

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
                u.username.toLowerCase().includes(texto) ||
                u.email.toLowerCase().includes(texto)
            );
        }
    }

    guardar() {
        // Validación básica
        if (!this.nuevoUsuario.username || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
            alert('Rellena los campos obligatorios');
            return;
        }

        // Enviamos TODO al servidor (incluidos DNI y deporte si están rellenos)
        this.adminService.crearUsuario(this.nuevoUsuario).subscribe({
            next: () => {
                alert('Usuario creado con éxito');
                this.mostrarFormulario = false;
                this.limpiarFormulario();
                this.cargarUsuarios();
            },
            error: (e) => alert('Error al crear usuario')
        });
    }

    borrar(id: string) {
        if(confirm('¿Borrar usuario?')) {
            this.adminService.borrarUsuario(id).subscribe(() => this.cargarUsuarios());
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