import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-partidos-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './partidosAdmin.html',
    styleUrl: './partidosAdmin.scss' // Reusaremos el estilo base
})
export class PartidosAdminComponent implements OnInit {
    
    private route = inject(ActivatedRoute);
    private adminService = inject(AdminService);

    competicionId: string = '';
    listaPartidos: any[] = [];
    listaArbitros: any[] = []; // Para el select del modal

    mostrarFormulario: boolean = false;
    idEdicion: string | null = null;

    nuevoPartido = {
        local: '',
        visitante: '',
        fecha: '',
        hora: '',
        arbitro: '',
        estado: 'Pendiente',
        resultado: '-/-',
        competicion: ''
    };

    ngOnInit() {
        // 1. Obtener ID de la competición de la URL
        this.competicionId = this.route.snapshot.paramMap.get('id') || '';
        this.nuevoPartido.competicion = this.competicionId;

        if(this.competicionId) {
            this.cargarPartidos();
            this.cargarArbitros();
        }
    }

    cargarPartidos() {
        this.adminService.obtenerPartidosPorCompeticion(this.competicionId).subscribe({
            next: (data) => this.listaPartidos = data,
            error: (e) => console.error(e)
        });
    }

    cargarArbitros() {
        this.adminService.obtenerArbitros().subscribe(data => this.listaArbitros = data);
    }

    guardar() {
        if (!this.nuevoPartido.local || !this.nuevoPartido.visitante) {
            alert('Indica los equipos local y visitante');
            return;
        }

        if (this.idEdicion) {
            this.adminService.actualizarPartido(this.idEdicion, this.nuevoPartido).subscribe(() => {
                this.cerrarFormulario();
                this.cargarPartidos();
            });
        } else {
            this.adminService.crearPartido(this.nuevoPartido).subscribe(() => {
                this.cerrarFormulario();
                this.cargarPartidos();
            });
        }
    }

    editar(partido: any) {
        this.idEdicion = partido._id;
        // Importante: Si el árbitro viene poblado (objeto), cogemos solo su ID para el select
        this.nuevoPartido = { 
            ...partido, 
            arbitro: partido.arbitro?._id || partido.arbitro || '' 
        };
        this.mostrarFormulario = true;
    }

    borrar(id: string) {
        if(confirm('¿Eliminar partido?')) {
            this.adminService.borrarPartido(id).subscribe(() => this.cargarPartidos());
        }
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.idEdicion = null;
        this.nuevoPartido = {
            local: '', visitante: '', fecha: '', hora: '', 
            arbitro: '', estado: 'Pendiente', resultado: '-/-',
            competicion: this.competicionId
        };
    }
}