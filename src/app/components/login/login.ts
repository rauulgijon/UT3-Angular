import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router"; // Importar Router

@Component({
  selector: "app-login",
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("Intentando iniciar sesión con:", this.username, this.password);
    
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log("Inicio de sesión exitoso:", res);
        
        if (res && res.user && res.user.rol) {
            // Guardar sesión (opcional pero recomendado)
            localStorage.setItem('user', JSON.stringify(res.user));

            // Redirigir según el rol recibido del backend
            switch(res.user.rol) {
                case 'admin':
                    this.router.navigate(['/admin']); // Coincide con path: 'admin'
                    break;
                case 'jugador':
                    this.router.navigate(['/jugador']); // Coincide con path: 'jugador'
                    break;
                case 'arbitro':
                    this.router.navigate(['/arbitro']); // Coincide con path: 'arbitro'
                    break;
                default:
                    console.error("Rol desconocido:", res.user.rol);
            }
        }
      },
      error: (err) => {
        console.error("Error al iniciar sesión:", err);
        alert("Credenciales incorrectas");
      }
    });
  }
}