import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transferencia {
  id?: number;
  area: string;
  numero: number;
  tecnologia: string;
  valorTotal: number;
  equipamiento?: number;
  asistenciaTecnica?: number;
  propiedadIntelectual?: number;
  formacionEntrenamiento?: number;
  otros?: string;
  descripcion?: string;
  sectorEstrategico: string;
}

@Injectable({ providedIn: 'root' })
export class TransferenciasService {
  private apiUrl = 'http://localhost:8080/api/transferencias';

  constructor(private http: HttpClient) { }

  // Obtener todas las transferencias
  getAll(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.apiUrl);
  }

  // Obtener una transferencia por ID
  getById(id: number): Observable<Transferencia> {
    return this.http.get<Transferencia>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva transferencia
  create(transferencia: Omit<Transferencia, 'id'>): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.apiUrl, transferencia);
  }

  // Actualizar una transferencia existente
  update(id: number, transferencia: Partial<Transferencia>): Observable<Transferencia> {
    return this.http.put<Transferencia>(`${this.apiUrl}/${id}`, transferencia);
  }

  // Eliminar una transferencia
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}