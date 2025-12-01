import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // --- USUARIOS ---
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
  
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  // --- ÁRBITROS ---
  obtenerArbitros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arbitros`);
  }
  
  borrarArbitro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/arbitros/${id}`);
  }
}