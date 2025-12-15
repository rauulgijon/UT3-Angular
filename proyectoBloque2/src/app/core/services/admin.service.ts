import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  // Asegúrate de que este puerto sea el mismo que el de tu server.js (3000)
  private apiUrl = 'http://localhost:3000/api'; 

  constructor() { }

  // --- CRUD USUARIOS ---

  // LEER: Obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // CREAR: Usamos la ruta de registro ya existente
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  // BORRAR: Eliminar usuario por ID
  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // --- MÉTODOS EXTRA (para árbitros, si los usas luego) ---
  obtenerArbitros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arbitros`);
  }
  
  borrarArbitro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/arbitros/${id}`);
  }
}