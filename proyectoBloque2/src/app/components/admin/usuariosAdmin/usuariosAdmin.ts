import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
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
    
    // Datos
    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];
    
    // Interfaz
    busqueda: string = '';
    mostrarFormulario: boolean = false;

    // Objeto para formulario de nuevo usuario
    nuevoUsuario = {
        username: '',
        email: '',
        password: '',
        rol: 'jugador'
    };

    constructor(private adminService: AdminService) {}

    // Al iniciar la página, cargamos los datos
    ngOnInit() {
        this.cargarUsuarios();
    }

    // --- LÓGICA DE CONSULTAS ---

    cargarUsuarios() {
        this.adminService.obtenerUsuarios().subscribe({
            next: (datos) => {
                console.log('Usuarios recibidos:', datos);
                this.listaUsuarios = datos;
                this.filtrar(); // Inicializa la lista filtrada
            },
            error: (err) => console.error('Error al obtener usuarios:', err)
        });
    }

    borrar(id: string) {
        if(confirm('¿Estás seguro de eliminar este usuario?')) {
            this.adminService.borrarUsuario(id).subscribe({
                next: () => {
                    this.cargarUsuarios(); // Recargamos la tabla para ver los cambios
                },
                error: (err) => alert('Error al eliminar usuario')
            });
        }
    }

    // --- LÓGICA DE INTERFAZ ---

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
        // Aquí llamarías a this.adminService.crearUsuario(...)
        console.log("Guardar pulsado", this.nuevoUsuario);
        this.mostrarFormulario = false;
    }
}