// src/app/services/metas/metas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa una fila de la tabla "metas".
 * - id:        identificador único (serial)
 * - oe:        string con el valor OE (ej. "4/9", "3/4", etc.)
 * - indicador: texto largo con la descripción del indicador
 * - metavalor: número (decimal) que el usuario podrá modificar
 */
export interface Meta {
  id: number;
  oe: string | null;
  indicador: string;
  metaValor: number;
}
@Injectable({ providedIn: 'root' })
export class MetasService {
  private apiUrl = '/api/metas';  // o la URL que tengas configurada

  constructor(private http: HttpClient) {}

  // GET all metas (ejemplo)
  getMetas(): Observable<Meta[]> {
    // Llama a GET /api/metas
    return this.http.get<Meta[]>(`${this.apiUrl}`);
  }

  // UPDATE meta completa
  updateMeta(meta: Meta): Observable<Meta> {
    // Llama a PUT /api/metas/{id}
    const url = `${this.apiUrl}/${meta.id}`; 
    return this.http.put<Meta>(url, meta);
  }

  // DELETE meta
  deleteMeta(id: number): Observable<void> {
    // Llama a DELETE /api/metas/{id}
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Si quisieras actualizar sólo el metavalor con PATCH:
  // updateMetaValor(id: number, metavalor: number): Observable<Meta> {
  //   return this.http.patch<Meta>(`${this.apiUrl}/${id}`, { metavalor });
  // }
}
