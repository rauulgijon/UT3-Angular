import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-arbitros-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './arbitrosAdmin.html',
    styleUrl: './arbitrosAdmin.scss'
})
export class ArbitrosAdminComponent implements OnInit {
    
    listaArbitros: any[] = [];
    
    nuevoArbitro = {
        username: '',
        email: '',
        password: '',
        rol: 'arbitro', // Rol fijo para esta pantalla
        deporte: '',
        dni: '',      // Se envían vacíos si no se usan en el form visual
        telefono: ''
    };

    constructor(private adminService: AdminService) {}

    ngOnInit() {
        this.cargarArbitros();
    }

    cargarArbitros() {
        this.adminService.obtenerArbitros().subscribe({
            next: (data) => {
                this.listaArbitros = data;
            },
            error: (e) => console.error('Error al cargar árbitros:', e)
        });
    }

    guardar() {
        if(!this.nuevoArbitro.username || !this.nuevoArbitro.email || !this.nuevoArbitro.password) {
            alert("Por favor, rellena los datos obligatorios.");
            return;
        }

        this.adminService.crearUsuario(this.nuevoArbitro).subscribe({
            next: () => {
                alert('Árbitro creado con éxito');
                this.cargarArbitros();
                // Limpiar formulario
                this.nuevoArbitro = { 
                    username: '', email: '', password: '', 
                    rol: 'arbitro', deporte: '', dni: '', telefono: '' 
                };
            },
            error: (err) => {
                console.error(err);
                alert('Error al crear árbitro');
            }
        });
    }

    borrar(id: string) {
        if(confirm('¿Seguro que deseas eliminar este árbitro?')) {
            this.adminService.borrarArbitro(id).subscribe(() => this.cargarArbitros());
        }
    }
}