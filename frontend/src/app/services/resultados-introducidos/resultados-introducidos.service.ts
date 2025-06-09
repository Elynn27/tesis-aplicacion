import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Resultado {
  id: number;
  area: string;
  resultado: string;
  tipoImpacto: string;
  valoracionCualitativa?: string;
  valor: number;
  sectoresEstrategicos?: string;
}

@Injectable({ providedIn: 'root' })
export class ResultadosIntroducidosService {
  private apiUrl = '/api/resultados-introducidos';

  constructor(private http: HttpClient) { }

  // Obtener todos los resultados
  getAll(): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(this.apiUrl);
  }

  // Obtener un resultado por ID
  getById(id: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo resultado
  create(resultado: Omit<Resultado, 'id'>): Observable<Resultado> {
    return this.http.post<Resultado>(this.apiUrl, resultado);
  }

  // Actualizar un resultado existente
  update(id: number, resultado: Partial<Resultado>): Observable<Resultado> {
    return this.http.put<Resultado>(`${this.apiUrl}/${id}`, resultado);
  }

  // Eliminar un resultado
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}