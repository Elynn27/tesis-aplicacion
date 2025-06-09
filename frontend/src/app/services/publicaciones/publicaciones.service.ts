import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Publicacion {
  id: number;
  area: string;
  titulo: string;
  autores: string;
  revista: string;
  ano: number;
  numeroVolumen: string;
  issn: string;
  baseDatos: string;
  linea: string;
  grupoMes: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private apiUrl = 'http://localhost:8080/api/publicaciones';

  constructor(private http: HttpClient) { }

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  create(publicacion: Omit<Publicacion, 'id'>): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.apiUrl, publicacion);
  }
  update(id: number, publicacion: Omit<Publicacion, 'id'>): Observable<Publicacion> {
    return this.http.put<Publicacion>(`${this.apiUrl}/${id}`, publicacion);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}