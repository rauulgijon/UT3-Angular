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
    
}