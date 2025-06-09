import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proyecto {
  id: number;
  area: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  presupuesto: number;
  clasificacion: string;
  tipo: string;
  tituloPrograma: string;
  sectorEstrategico: string;
  tipoParticipacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private apiUrl = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  addProyecto(proyecto: Omit<Proyecto, 'id'>): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, proyecto);
  }
  updateProyecto(id: number, proyecto: Omit<Proyecto, 'id'>): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiUrl}/${id}`, proyecto);
  }

  deleteProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}