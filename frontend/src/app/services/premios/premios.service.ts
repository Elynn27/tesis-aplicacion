

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Premio {
  id?: number;
  area: string;
  autores: string;
  tituloResultado: string;
  tipoResultado: string;
  premioACC?: string;
  otrosNacionales?: string;
  provinciales?: {
    tipo: string;
    provincia: string;
    ejecutor: string;
    participante: string;
  };
  estudiantiles?: {
    concurso: string;
    categoria: string;
  };
  fecha: string;
  proyecto: string;
}

@Injectable({
  providedIn: 'root'
})
export class PremiosService {
  // Ajusta esta URL al endpoint real de tu API REST en el backend
  private apiUrl = 'http://localhost:8080/api/premios';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los premios (GET /api/premios).
   */
  getPremios(): Observable<Premio[]> {
    return this.http.get<Premio[]>(this.apiUrl);
  }

  /**
   * Obtiene un premio por su ID (GET /api/premios/{id}).
   */
  getPremioById(id: number): Observable<Premio> {
    return this.http.get<Premio>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo premio (POST /api/premios).
   */
  createPremio(premio: Omit<Premio, 'id'>): Observable<Premio> {
    return this.http.post<Premio>(this.apiUrl, premio);
  }

  /**
   * Actualiza un premio existente (PUT /api/premios/{id}).
   */
  updatePremio(id: number, premio: Omit<Premio, 'id'>): Observable<Premio> {
    return this.http.put<Premio>(`${this.apiUrl}/${id}`, premio);
  }

  /**
   * Elimina un premio por su ID (DELETE /api/premios/{id}).
   */
  deletePremio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca premios cuyo título contenga la cadena dada (GET /api/premios/searchByTitulo?titulo=...).
   */
  searchByTitulo(titulo: string): Observable<Premio[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<Premio[]>(`${this.apiUrl}/searchByTitulo`, { params });
  }

  /**
   * Busca premios por área (GET /api/premios/searchByArea?area=...).
   */
  searchByArea(area: string): Observable<Premio[]> {
    const params = new HttpParams().set('area', area);
    return this.http.get<Premio[]>(`${this.apiUrl}/searchByArea`, { params });
  }
}
