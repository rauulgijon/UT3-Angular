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

    constructor(private authService: AuthService, private router: Router) {}

    login() {
        console.log('Intentando login con', this.username, this.password);
        this.authService.login(this.username, this.password).subscribe({
            next: res => {
                console.log('Login exitoso:', res);
            
                // --- CORRECCIÓN: Guardar el usuario en memoria ---
                if (res.user) {
                    localStorage.setItem('usuario', JSON.stringify(res.user));
                }
                // ------------------------------------------------

                // Redirección según el rol
                if (res.user && res.user.rol === 'admin'){
                    this.router.navigate(['/admin']);
                } else if (res.user && res.user.rol === 'arbitro'){
                    this.router.navigate(['/arbitro']);
                } else if (res.user && res.user.rol === 'jugador') {
                    this.router.navigate(['/jugador']);
                } else {
                    console.error('Rol no reconocido o usuario no encontrado');
                }
            },
            error: err => console.error('Error de login:', err)
        });
    }
}