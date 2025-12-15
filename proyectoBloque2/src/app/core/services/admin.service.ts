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

  // ==========================================
  //        GESTIÓN DE USUARIOS
  // ==========================================

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // Crear usuario (sirve también para árbitros desde el panel)
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  // Actualizar usuario
  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  // Borrar usuario
  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // ==========================================
  //        GESTIÓN DE ÁRBITROS
  // ==========================================

  // Obtener solo árbitros
  obtenerArbitros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arbitros`);
  }
  
  // Borrar árbitro
  borrarArbitro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/arbitros/${id}`);
  }

  // ==========================================
  //      GESTIÓN DE COMPETICIONES (Ligas)
  // ==========================================

  // Obtener todas las competiciones
  obtenerCompeticiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/competiciones`);
  }

  // Crear competición
  crearCompeticion(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/competiciones`, datos);
  }

  // Editar competición
  actualizarCompeticion(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/competiciones/${id}`, datos);
  }

  // Eliminar competición
  borrarCompeticion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/competiciones/${id}`);
  }

  // ==========================================
  //      GESTIÓN DE PARTIDOS
  // ==========================================

  // Obtener partidos filtrados por la ID de la competición
  // IMPORTANTE: Esta ruta debe existir en tu server.js como app.get("/api/partidos/:competicionId", ...)
  obtenerPartidosPorCompeticion(competicionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/${competicionId}`);
  }

  // Crear partido
  crearPartido(partido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/partidos`, partido);
  }

  // Editar partido (resultado, fecha, etc.)
  actualizarPartido(id: string, partido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/partidos/${id}`, partido);
  }

  // Borrar partido
  borrarPartido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/partidos/${id}`);
  }
}