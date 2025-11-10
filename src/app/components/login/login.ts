import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
@Component({
  selector: "app-login",
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})

export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    // LÓGICA necearia para autenticar al usario
  }
}