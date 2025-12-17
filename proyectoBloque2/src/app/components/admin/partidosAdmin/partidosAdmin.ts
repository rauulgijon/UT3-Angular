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
    styleUrl: './partidosAdmin.scss'
})
export class PartidosAdminComponent implements OnInit {
    
    private route = inject(ActivatedRoute);
    private adminService = inject(AdminService);

    competicionId: string = '';
    listaPartidos: any[] = [];
    listaArbitros: any[] = []; 

    mostrarFormulario: boolean = false;
    idEdicion: string | null = null;

    // Modelo para el formulario (Incluye Deporte)
    nuevoPartido = {
        local: '',
        visitante: '',
        deporte: '', // <--- NUEVO CAMPO
        fecha: '',
        hora: '',
        arbitro: '',
        estado: 'Pendiente',
        resultado: '-/-',
        competicion: ''
    };

    ngOnInit() {
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
            alert('Debes escribir el nombre de los equipos');
            return;
        }

        // Validación extra
        if (!this.nuevoPartido.deporte) {
            alert('Por favor selecciona un deporte');
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
        
        // Intentamos recuperar el deporte de uno de los equipos ya existentes
        const deporteExistente = partido.local?.deporte || 'Fútbol';

        this.nuevoPartido = { 
            ...partido,
            local: partido.local?.nombre || partido.local || '',
            visitante: partido.visitante?.nombre || partido.visitante || '',
            deporte: deporteExistente, // Rellenamos el select
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
        // Reseteamos el formulario
        this.nuevoPartido = {
            local: '', visitante: '', deporte: '',
            fecha: '', hora: '', 
            arbitro: '', estado: 'Pendiente', resultado: '-/-',
            competicion: this.competicionId
        };
    }
}