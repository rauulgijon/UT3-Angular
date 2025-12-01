import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Asegúrate de que esta URL coincide con la de tu server.js
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // --- CONSULTAS DE USUARIOS ---

  // 1. GET: Pedir todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // 2. DELETE: Borrar un usuario
  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
  
  // 3. POST: Crear usuario (Opcional, si quieres usarlo desde aquí)
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}