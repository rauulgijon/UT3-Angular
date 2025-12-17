import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    // En src/app/components/login/login.ts

    login() {
        console.log('Intentando login con', this.username, this.password);
        this.authService.login(this.username, this.password).subscribe({
            next: res => {
                console.log('Respuesta del servidor:', res); // 1. Ver qué llega exactamente

                if (res.user) {
                    localStorage.setItem('usuario', JSON.stringify(res.user));

                    // Normalizamos el rol a minúsculas para evitar errores de mayúsculas
                    const rol = res.user.rol ? res.user.rol.toLowerCase().trim() : '';
                    console.log('Rol detectado (normalizado):', rol);

                    if (rol === 'admin') {
                        this.router.navigate(['/admin']);
                    } else if (rol === 'arbitro') {
                        this.router.navigate(['/arbitro']);
                    } else if (rol === 'jugador') {
                        this.router.navigate(['/jugador']);
                    } else {
                        console.error('Rol no reconocido:', res.user.rol);
                        alert('Usuario logueado pero sin rol válido: ' + res.user.rol);
                    }
                }
            },
            error: err => {
                console.error('Error de login:', err);
                alert('Credenciales incorrectas o usuario no encontrado');
            }
        });
    }
}