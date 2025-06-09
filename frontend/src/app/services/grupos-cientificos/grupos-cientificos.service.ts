import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Grupo {
  id: number;
  facultad: string;
  nombre: string;
  anio: number;
  carrera: string;
  estudiantes: string;
}

@Injectable({ providedIn: 'root' })
export class GruposCientificosService {
  private apiUrl = '/api/grupos-cientificos';
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl);
  }

  create(grupo: Omit<Grupo, 'id'>): Observable<Grupo> {
    return this.http.post<Grupo>(this.apiUrl, grupo);
  }
  update(id: number, grupo: Omit<Grupo, 'id'>): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.apiUrl}/${id}`, grupo);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}