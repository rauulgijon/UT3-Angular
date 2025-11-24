import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { HttpClientModule } from "@angular/common/http";


@Component({
    selector: "app-registro",
    templateUrl: "./registro.html",
    styleUrls: ["./registro.scss"],
    imports: [CommonModule, FormsModule, HttpClientModule],
    standalone: true
})

export class RegistroComponent {
    
    name: string = "";
    surname: string = "";
    username: string = "";
    password: string = "";
    email: string = "";
   constructor(private authService: AuthService) {}

  registrar() {
    // LÓGICA necearia para autenticar al usario
    console.log("Registro con:", this.username, this.name, this.surname, this.email, this.password);
    this.authService.registrar(this.username, this.name, this.surname, this.email, this.password).subscribe({   
      next: res => window.alert("Registro exitoso:" + JSON.stringify(res)),
      error: err => console.log("Error al registrarse:", err)
    });
  }
}