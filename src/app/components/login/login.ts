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
        
        if (res.user && res.user.rol === 'admin'){
            this.router.navigate(['/admin']);
        } else if (res.user && res.user.rol === 'arbitro'){
            this.router.navigate(['/arbitro']);
        }
        else if (res.user && res.user.rol === 'jugador') {
            this.router.navigate(['/jugador']);
        } else {
            console.error('Rol no reconocido o usuario no encontrado');
        }
      },
      error: (err) => {
        console.error("Error al iniciar sesión:", err);
        alert("Credenciales incorrectas");
      }
    });
  }
}