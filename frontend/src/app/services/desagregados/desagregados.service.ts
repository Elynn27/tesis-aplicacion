import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Proyecto } from '../proyectos/proyectos.service';
import { Publicacion } from '../publicaciones/publicaciones.service';
import { Registro as Registro } from '../registros-cenda/registros-cenda.service';
import { Premio } from '../premios/premios.service';
import { Transferencia } from '../transferencias/transferencias.service';
import { Page } from '../../models/page';

// Recuerda importar la interfaz Page si la tienes definida:


export interface IndicadorArea {
  area: string;
  indicadores: { numero: string; nombre: string; valor: number; }[];
}

@Injectable({ providedIn: 'root' })
export class DesagregadosService {
  private proyectosApi = '/api/proyectos';
  private publicacionesApi = '/api/publicaciones';
  private cendaApi = '/api/registros-cenda';
  private premiosApi = '/api/premios';
  private transferenciasApi = '/api/transferencias';

  constructor(private http: HttpClient) {}

  getIndicadoresPorArea(area: string): Observable<IndicadorArea> {
    // Paginación si tu API la requiere
    const params = new HttpParams().set('page','0').set('size','1000');

    return forkJoin({
      proyectosPage: this.http.get<Page<Proyecto>>(this.proyectosApi, { params }),
      publicaciones: this.http.get<Publicacion[]>(this.publicacionesApi),
      cenda: this.http.get<Registro[]>(this.cendaApi),
      premios: this.http.get<Premio[]>(this.premiosApi),
      transferencias: this.http.get<Transferencia[]>(this.transferenciasApi)
    }).pipe(
      map(({ proyectosPage, publicaciones, cenda, premios, transferencias }) => {
        const proyectos = proyectosPage.content; // <--- AQUÍ
        const hoy = new Date();

        const proyectosActivos = proyectos
          .filter(p => (!p.fechaFin || new Date(p.fechaFin) >= hoy) && p.area === area);
        const totalActivos = proyectosActivos.length;
        const pct = (count: number) => totalActivos ? parseFloat(((count * 100) / totalActivos).toFixed(2)) : 0;

        // Contadores de indicadores
        const cntProyEstr = proyectosActivos.filter(p => !!p.sectorEstrategico).length;
        const cntPubs100 = publicaciones.filter(pub => pub.area === area).length;
        const cntPatCon = cenda.filter(r => r.area === area && r.categoria.includes('PATENTES')).length;
        const cntSw = cenda.filter(r => r.area === area && r.categoria === 'REGISTROS INFORMÁTICOS').length;
        const cntACC = premios.filter(r => r.area === area && r.tipoResultado === 'Premios ACC').length;
        const cntACCEstr = premios.filter(r => r.area === area && r.tipoResultado === 'Premios ACC' &&
          proyectosActivos.some(p => String(p.id) === String(r.proyecto) && !!p.sectorEstrategico)
        ).length;
        const cntNatEstr = premios.filter(r => r.area === area && r.otrosNacionales &&
          proyectosActivos.some(p => String(p.id) === String(r.proyecto) && !!p.sectorEstrategico)
        ).length;
        const cntProv = premios.filter(r => r.area === area && !!r.provinciales).length;
        const cntStu = premios.filter(r => r.area === area && !!r.estudiantiles).length;
        const cntLocalACC = premios.filter(r => r.area === area && r.tipoResultado === 'Premios ACC' && r.premioACC === 'Otras Entidades').length;
        const cntLocalProv = premios.filter(r => r.area === area && r.provinciales?.tipo === 'impacto local').length;
        const cntTransEstr = transferencias.filter(t => t.area === area && !!t.sectorEstrategico).length;

        const indicadores = [
          { numero: 'I1', nombre: 'Proyectos en sectores estratégicos', valor: cntProyEstr },
          { numero: 'I2', nombre: 'Publicaciones por área', valor: cntPubs100 },
          { numero: 'I3', nombre: 'Patentes obtenidas', valor: cntPatCon },
          { numero: 'I4', nombre: 'Software registrados en CENDA', valor: cntSw },
          { numero: 'I5', nombre: 'Premios ACC', valor: cntACC },
          { numero: 'I6', nombre: 'Premios ACC sectores estratégicos', valor: cntACCEstr },
          { numero: 'I7', nombre: 'Premios nacionales innovación sectores estr.', valor: cntNatEstr },
          { numero: 'I8', nombre: 'Premios provinciales CITMA', valor: cntProv },
          { numero: 'I9', nombre: 'Premios CITMA estudiantiles/jóvenes', valor: cntStu },
          { numero: 'I10', nombre: 'Premios ACC desarrollo local', valor: cntLocalACC },
          { numero: 'I11', nombre: 'Premios CITMA impacto local', valor: cntLocalProv },
          { numero: 'I12', nombre: 'Transferencias sectores estratégicos', valor: cntTransEstr }
        ];

        return { area, indicadores };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('DesagregadosService error', error);
    return throwError(() => new Error(error.message));
  }
}