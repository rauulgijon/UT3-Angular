import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-competiciones-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './competicionesAdmin.html',
    styleUrl: './competicionesAdmin.scss'
})
export class CompeticionesAdminComponent implements OnInit {
    
    private adminService = inject(AdminService);

    listaCompeticiones: any[] = [];
    competicionesFiltradas: any[] = [];
    busqueda: string = '';
    
    mostrarFormulario: boolean = false;
    idEdicion: string | null = null;

    nuevaCompeticion = {
        nombre: '',
        deporte: '',
        nivel: 'Amateur',
        temporada: '',
        premios: ''
    };

    ngOnInit() {
        this.cargarCompeticiones();
    }

    cargarCompeticiones() {
        this.adminService.obtenerCompeticiones().subscribe({
            next: (data) => {
                this.listaCompeticiones = data;
                this.filtrar();
            },
            error: (e) => console.error('Error al cargar competiciones:', e)
        });
    }

    filtrar() {
        if (!this.busqueda) {
            this.competicionesFiltradas = this.listaCompeticiones;
        } else {
            const texto = this.busqueda.toLowerCase();
            this.competicionesFiltradas = this.listaCompeticiones.filter(c => 
                (c.nombre && c.nombre.toLowerCase().includes(texto)) ||
                (c.deporte && c.deporte.toLowerCase().includes(texto))
            );
        }
    }

    guardar() {
        if (!this.nuevaCompeticion.nombre || !this.nuevaCompeticion.deporte) {
            alert('El nombre y el deporte son obligatorios');
            return;
        }

        if (this.idEdicion) {
            this.adminService.actualizarCompeticion(this.idEdicion, this.nuevaCompeticion).subscribe({
                next: () => { 
                    this.cerrarFormulario(); 
                    this.cargarCompeticiones(); 
                },
                error: () => alert('Error al actualizar')
            });
        } else {
            this.adminService.crearCompeticion(this.nuevaCompeticion).subscribe({
                next: () => { 
                    this.cerrarFormulario(); 
                    this.cargarCompeticiones(); 
                },
                error: () => alert('Error al crear')
            });
        }
    }

    editar(item: any) {
        this.idEdicion = item._id;
        this.nuevaCompeticion = { ...item };
        this.mostrarFormulario = true;
    }

    borrar(id: string) {
        if(confirm('¿Estás seguro de eliminar esta competición y todos sus partidos?')) {
            this.adminService.borrarCompeticion(id).subscribe(() => this.cargarCompeticiones());
        }
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.idEdicion = null;
        this.nuevaCompeticion = { 
            nombre: '', 
            deporte: '', 
            nivel: 'Amateur', 
            temporada: '', 
            premios: '' 
        };
    }
}