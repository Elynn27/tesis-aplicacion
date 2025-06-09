// src/app/services/expertos/expertos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Experto {
  id: number;
  area: string;
  nombreApellidos: string;
  gradoCientifico: string;
  areaConocimiento: string;
  instanciaAsesora: string;
  programa: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpertosService {
  private apiUrl = 'http://localhost:8080/api/expertos';

  constructor(private http: HttpClient) { }

  /** Obtener todos los expertos */
  getExpertos(): Observable<Experto[]> {
    return this.http.get<Experto[]>(this.apiUrl);
  }

  /** Crear un nuevo experto */
  createExperto(experto: Partial<Experto>): Observable<Experto> {
    return this.http.post<Experto>(this.apiUrl, experto);
  }

  /** Actualizar un experto existente */
  updateExperto(id: number, experto: Partial<Experto>): Observable<Experto> {
    return this.http.put<Experto>(`${this.apiUrl}/${id}`, experto);
  }

  /** Eliminar un experto por su ID */
  deleteExperto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
