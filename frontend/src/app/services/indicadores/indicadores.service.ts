// src/app/services/indicadores/indicadores.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable, map } from 'rxjs';

import { Proyecto } from '../../services/proyectos/proyectos.service';
import { Publicacion } from '../../services/publicaciones/publicaciones.service';
import { Registro } from '../../services/registros-cenda/registros-cenda.service';
import { Premio } from '../../services/premios/premios.service';
import { Transferencia } from '../../services/transferencias/transferencias.service';
import { Page } from '../../models/page';

export interface IndicadorCTI {
  id?: number;
  numero: string;
  oe: string | null;
  indicador: string;
  meta: number;
  real: number;
  porcentajeCumplimiento: number;
}
export interface IndicadoresCTI {
  id?: number;
  numero: string;
  oe: string | null;
  indicador: string;
  meta: number;
  real: number;
  porcentajeCumplimiento: number;
}


@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private readonly PROYECTOS_API     = '/api/proyectos';
  private readonly PUBLICACIONES_API = '/api/publicaciones';
  private readonly CENDA_API         = '/api/registros-cenda';
  private readonly PREMIOS_API       = '/api/premios';
  private readonly TRANSF_API        = '/api/transferencias';
  private readonly INDICADORES_API   = '/api/indicadores';

  constructor(private http: HttpClient) {}

  obtenerIndicadores(): Observable<IndicadorCTI[]> {
    const params = new HttpParams().set('page', '0').set('size', '1000');

    return forkJoin({
      indicadoresDB: this.http.get<IndicadorCTI[]>(this.INDICADORES_API),
      proyectosPage: this.http.get<Page<Proyecto>>(this.PROYECTOS_API, { params }),
      publicaciones: this.http.get<Publicacion[]>(this.PUBLICACIONES_API),
      cenda: this.http.get<Registro[]>(this.CENDA_API),
      premios: this.http.get<Premio[]>(this.PREMIOS_API),
      transferencias: this.http.get<Transferencia[]>(this.TRANSF_API)
    }).pipe(
      map(({ indicadoresDB, proyectosPage, publicaciones, cenda, premios, transferencias }) => {

        // 1) Preparar map de indicadores ya guardados en BD
        const dbMap = new Map<string, IndicadorCTI>();
        indicadoresDB.forEach(ind => {
          if (ind.numero) {
            dbMap.set(ind.numero, ind);
          }
        });

        // 2) Filtrar proyectos en ejecución
        const proyectos = proyectosPage.content;
        const hoy = new Date();
        const enEjecucion = proyectos.filter(p =>
          !p.fechaFin || new Date(p.fechaFin) >= hoy
        );
        const totalEnEjec = enEjecucion.length;
        const pct = (count: number): number =>
          totalEnEjec
            ? parseFloat(((count * 100) / totalEnEjec).toFixed(2))
            : 0;
             const porcentaje = (count: number): number => totalEnEjec ? parseFloat(((count * 100) / totalEnEjec).toFixed(2)) : 0;

        // 3) Contar para los cuatro indicadores porcentuales
        const cntPAPN    = enEjecucion.filter(p => p.clasificacion === 'PAPN').length;
        const cntPAPS    = enEjecucion.filter(p => p.clasificacion === 'PAPS').length;
        const cntPAPT    = enEjecucion.filter(p => p.clasificacion === 'PAPT').length;
        const cntPNAPExt = enEjecucion
          .filter(p => p.clasificacion === 'PNAP' && p.tipoParticipacion?.toUpperCase() === 'EXTERNA')
          .length;

        // 4) Otros contadores personalizados
        const totalEq = 100; // ajustar si se calcula dinámicamente
        const por100 = (count: number): number =>
          totalEq
            ? parseFloat(((count * 100) / totalEq).toFixed(2))
            : 0;

        const cntProyEstr  = enEjecucion.filter(p => !!p.sectorEstrategico).length;
        const cntPubs100   = por100(publicaciones.length);
        const cntPatCon    = cenda.filter(r =>
          r.categoria === 'PATENTES Y MODELOS DE UTILIDAD SOLICITADOS' ||
          r.categoria === 'PATENTES Y MODELOS DE UTILIDAD CONCEDIDOS'
        ).length;
        const cntSw        = cenda.filter(r =>
          r.categoria === 'REGISTROS INFORMÁTICOS'
        ).length;
        const cntACC       = premios.filter(r =>
          r.tipoResultado === 'Premios ACC'
        ).length;
        const cntACCEstr   = premios.filter(r =>
          r.tipoResultado === 'Premios ACC' &&
          enEjecucion.some(p => String(p.id) === String(r.proyecto) && !!p.sectorEstrategico)
        ).length;
        const cntNatEstr   = premios.filter(r =>
          r.otrosNacionales &&
          enEjecucion.some(p => String(p.id) === String(r.proyecto) && !!p.sectorEstrategico)
        ).length;
        const cntProv      = premios.filter(r =>
          (r.tipoResultado === 'Provinciales' &&
           (r.provinciales?.tipo === 'Premios CITMA provinciales a resultados de I+D' ||
            r.provinciales?.tipo === 'Premio CITMA Provincial de innovación'))
        ).length;
        const cntStu       = premios.filter(r =>
          r.estudiantiles &&
          r.tipoResultado === 'Premios CITMA a Joven Investigador y Estudiante Investigador'
        ).length;
        const cntLocalACC  = premios.filter(r =>
          r.tipoResultado === 'Premios ACC' &&
          r.premioACC === 'Otras Entidades'
        ).length;
        const cntLocalProv = premios.filter(r =>
          r.provinciales?.tipo === 'impacto local'
        ).length;
        const cntTransEstr = transferencias.filter(t =>
          !!t.sectorEstrategico
        ).length;

        // 5) Construir el array final sobrescribiendo real y %cumpl.
        const indicadores: IndicadorCTI[] = [];
        const add = (numero: string, texto: string, realVal: number) => {
          const saved = dbMap.get(numero);
          const metaVal = saved?.meta ?? 0;
          const oeVal   = saved?.oe   ?? null;
          const idVal   = saved?.id   ?? undefined;
          const pctCum  = metaVal
            ? parseFloat(((realVal * 100) / metaVal).toFixed(2))
            : 0;
          indicadores.push({
            id: idVal,
            numero,
            oe: oeVal,
            indicador: texto,
            meta: metaVal,
            real: realVal,
            porcentajeCumplimiento: pctCum
          });
        };

        // 5.1) Porcentajes PAPN/PAPS/PAPT/PNAP-EXT
        add('PAPN',     'Porciento de Proyectos Asociados a Programas Nacionales (PAPN)', porcentaje(cntPAPN));
        add('PAPS',     'Porciento de Proyectos Asociados a Programas Sectoriales (PAPS)', porcentaje(cntPAPS));
        add('PAPT',     'Porciento de Proyectos Asociados a Programas Territoriales (PAPT)', porcentaje(cntPAPT));
        add('PNAP-EXT', 'Porciento de Proyectos No Asociados a Programas (PNAP) con demanda externa', porcentaje(cntPNAPExt));

        // 5.2) Indicadores I1–I12
        add('I1',  'Cantidad de proyectos de I+D+i en sectores estratégicos', cntProyEstr);
        add('I2',  'Cantidad de publicaciones en bases de datos especializadas internacionales y Scielo por 100 profesores e investigadores equivalentes', cntPubs100);
        add('I3',  'Cantidad de patentes obtenidas', cntPatCon);
        add('I4',  'Cantidad de software registrados en CENDA', cntSw);
        add('I5',  'Cantidad de premios de la ACC', cntACC);
        add('I6',  'Cantidad de premios de la ACC en los Sectores Estratégicos', cntACCEstr);
        add('I7',  'Cantidad de premios nacionales de innovación en los Sectores Estratégicos', cntNatEstr);
        add('I8',  'Cantidad de premios provinciales del CITMA', cntProv);
        add('I9',  'Cantidad de premios del CITMA a estudiantes y jóvenes investigadores', cntStu);
        add('I10', 'Cantidad de premios de la ACC que contribuyen al desarrollo local', cntLocalACC);
        add('I11', 'Cantidad de premios Provinciales del CITMA con impactos en el desarrollo local', cntLocalProv);
        add('I12', 'Cantidad de tecnologías transferidas a los sectores estratégicos', cntTransEstr);

        return indicadores;
      })
    );
  }

  actualizarIndicador(ind: IndicadorCTI): Observable<IndicadorCTI> {
    return this.http.put<IndicadorCTI>(`${this.INDICADORES_API}/${ind.id}`, ind);
  }

  obtenerIndicador(id: number): Observable<IndicadorCTI> {
    return this.http.get<IndicadorCTI>(`${this.INDICADORES_API}/${id}`);
  }
  getIndicador(): Observable<IndicadorCTI[]> {
    return this.http.get<IndicadorCTI[]>(this.INDICADORES_API);
  }

  
}