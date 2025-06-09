import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Registro {
  id?: number;
  area: string;
  autores: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  linea: string;
  proyecto: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrosCendaService {
  private apiUrl = '/api/registros-cenda';
  
  constructor(private http: HttpClient) {}

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.apiUrl);
  }

  create(registro: Omit<Registro, 'id'>): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrl, registro);
  }
  update(id: number, registro: Omit<Registro, 'id'>): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}/${id}`, registro);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}