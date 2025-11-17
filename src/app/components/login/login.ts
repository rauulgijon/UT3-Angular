import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { HttpClientModule } from "@angular/common/http";

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

  constructor(private authService: AuthService) {}

  login() {
    // LÓGICA necearia para autenticar al usario
    console.log("Intentando iniciar sesión con:", this.username, this.password);
    this.authService.login(this.username, this.password).subscribe({
      next: res => console.log("Inicio de sesión exitoso:", res),
      error: err => console.error("Error al iniciar sesión:", err)
    });
  }
}