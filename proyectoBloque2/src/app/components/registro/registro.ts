import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";




@Component({
    selector: 'app-registro',
    templateUrl: './registro.html',
    styleUrls: ['./registro.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule]
})
export class RegistroComponent {
    username: string = '';
    password: string = '';
    email: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    registrar() {
        console.log('Registro con:', this.username, this.password, this.email);
        this.authService.registrar(this.username, this.password, this.email).subscribe({
            next: res => window.alert('Registro exitoso:' + JSON.stringify(res)),
            error: err => console.log('Error de registro:')
        });
    }

}