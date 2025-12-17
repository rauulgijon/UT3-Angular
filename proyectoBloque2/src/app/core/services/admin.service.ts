import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; 

  constructor() { }

  // ==========================================
  //        GESTIÓN DE USUARIOS
  // ==========================================
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  borrarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // ==========================================
  //        GESTIÓN DE ÁRBITROS
  // ==========================================
  obtenerArbitros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arbitros`);
  }
  
  borrarArbitro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/arbitros/${id}`);
  }

  // ==========================================
  //      GESTIÓN DE COMPETICIONES
  // ==========================================
  obtenerCompeticiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/competiciones`);
  }

  crearCompeticion(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/competiciones`, datos);
  }

  actualizarCompeticion(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/competiciones/${id}`, datos);
  }

  borrarCompeticion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/competiciones/${id}`);
  }

  // ==========================================
  //      GESTIÓN DE PARTIDOS
  // ==========================================
  obtenerPartidosPorCompeticion(competicionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/${competicionId}`);
  }

  crearPartido(partido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/partidos`, partido);
  }

  actualizarPartido(id: string, partido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/partidos/${id}`, partido);
  }

  borrarPartido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/partidos/${id}`);
  }

  // ==========================================
  // NUEVO: FUNCIONALIDAD JUGADORES / ARBITROS
  // ==========================================

  // Obtener partidos donde juega un usuario específico
  // Si tu backend no tiene esta ruta exacta, deberás filtrar en el front o crearla en el back
  obtenerMisPartidos(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/usuario/${idUsuario}`);
  }

  // Obtener partidos asignados a un árbitro
  obtenerPartidosArbitro(idArbitro: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/arbitro/${idArbitro}`);
  }

  // Actualizar resultado (Acta del partido)
  // Se usa actualizarPartido o una ruta especifica si la tienes
  actualizarResultado(idPartido: string, resultado: string): Observable<any> {
    // Reutilizamos actualizarPartido enviando solo el resultado
    return this.http.put(`${this.apiUrl}/partidos/${idPartido}`, { resultado });
  }
}