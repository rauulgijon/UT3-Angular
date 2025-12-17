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
  //      GESTIÓN DE EQUIPOS (NUEVO)
  // ==========================================
  obtenerEquipos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/equipos`);
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
  //   RUTAS ESPECIALES (Árbitro y Jugador)
  // ==========================================

  // Para el Árbitro
  obtenerPartidosArbitro(idArbitro: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/arbitro/${idArbitro}`);
  }

  // Para el Jugador (NUEVO)
  obtenerMisPartidos(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partidos/jugador/${idUsuario}`);
  }

  actualizarResultado(idPartido: string, resultado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/partidos/${idPartido}`, { resultado });
  }
}