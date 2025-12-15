import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-arbitros-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './arbitrosAdmin.html',
    styleUrl: './arbitrosAdmin.scss'
})
export class ArbitrosAdminComponent implements OnInit {
    
    private adminService = inject(AdminService);

    listaArbitros: any[] = [];
    arbitrosFiltrados: any[] = [];
    busqueda: string = '';
    
    // Control del Modal
    mostrarFormulario: boolean = false;
    idEdicion: string | null = null;

    nuevoArbitro = {
        username: '',
        email: '',
        password: '',
        rol: 'arbitro', // Fijo para esta sección
        deporte: '',
        dni: '',
        telefono: ''
    };

    ngOnInit() {
        this.cargarArbitros();
    }

    cargarArbitros() {
        this.adminService.obtenerArbitros().subscribe({
            next: (data) => {
                this.listaArbitros = data;
                this.filtrar();
            },
            error: (e) => console.error('Error al cargar árbitros:', e)
        });
    }

    filtrar() {
        if (!this.busqueda) {
            this.arbitrosFiltrados = this.listaArbitros;
        } else {
            const texto = this.busqueda.toLowerCase();
            this.arbitrosFiltrados = this.listaArbitros.filter(a => 
                (a.username && a.username.toLowerCase().includes(texto)) ||
                (a.email && a.email.toLowerCase().includes(texto)) ||
                (a.deporte && a.deporte.toLowerCase().includes(texto))
            );
        }
    }

    guardar() {
        // Validaciones básicas
        if (!this.nuevoArbitro.username || !this.nuevoArbitro.email) {
            alert('Nombre y Email son obligatorios');
            return;
        }

        // Asegurar el rol
        this.nuevoArbitro.rol = 'arbitro';

        if (this.idEdicion) {
            // --- EDITAR ---
            this.adminService.actualizarUsuario(this.idEdicion, this.nuevoArbitro).subscribe({
                next: () => {
                    this.cerrarFormulario();
                    this.cargarArbitros();
                },
                error: (e) => alert('Error al actualizar árbitro')
            });
        } else {
            // --- CREAR ---
            if (!this.nuevoArbitro.password) {
                alert('La contraseña es obligatoria para nuevos árbitros');
                return;
            }
            this.adminService.crearUsuario(this.nuevoArbitro).subscribe({
                next: () => {
                    this.cerrarFormulario();
                    this.cargarArbitros();
                },
                error: (e) => alert('Error al crear árbitro')
            });
        }
    }

    editar(arbitro: any) {
        this.idEdicion = arbitro._id;
        this.nuevoArbitro = { ...arbitro }; // Copiar datos
        this.nuevoArbitro.password = ''; // Limpiar contraseña por seguridad
        this.mostrarFormulario = true;
    }

    borrar(id: string) {
        if(confirm('¿Seguro que deseas eliminar este árbitro permanentemente?')) {
            this.adminService.borrarArbitro(id).subscribe(() => this.cargarArbitros());
        }
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.idEdicion = null;
        this.limpiarModelo();
    }

    limpiarModelo() {
        this.nuevoArbitro = {
            username: '',
            email: '',
            password: '',
            rol: 'arbitro',
            deporte: '',
            dni: '',
            telefono: ''
        };
    }
}