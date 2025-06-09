import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ValorEspecialPipe } from '../../pipes/valor-especial.pipe';
import { FormsModule } from '@angular/forms';
import { IndicadoresService, IndicadorCTI , IndicadoresCTI} from '../../services/indicadores/indicadores.service';

interface Indicador {
  id: number;
  numero: string;
  oe: string;
  indicador: string;
  meta: number;
  real: number;
  porcentajeCumplimiento: number;
}

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
  standalone: true,
  imports: [
    NgxChartsModule,
    ValorEspecialPipe,
    FormsModule
  ]
})
export class IndicadoresComponent implements OnInit {
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#4682B4']
  };
  IndicadoresCTI:IndicadoresService[] = [];
  indicadores: IndicadorCTI[] = [];
  datosCumplimiento: any[] = [];
  datosComparativa: any[] = [];
  nuevoIndicador : IndicadorCTI = {
    id: 0,
    numero: '',
    oe: '',
    indicador: '',
    meta: 0,
    real: 0,
    porcentajeCumplimiento: 0
  };
  
  // Variables para paginación
  paginaActual: number = 0;
  indicadoresPorPagina: number = 4;
  totalPaginas: number = 1;

  constructor(private indicadoresService: IndicadoresService) { }

  ngOnInit(): void {
    this.cargarIndicadores();
  }

  cargarIndicadores(): void {
    this.indicadoresService.obtenerIndicadores().subscribe({
      next: (data) => {
        this.indicadores = data.map((item,index) => ({ ...item, id: index + 1 }));
        this.totalPaginas = Math.ceil(this.indicadores.length / this.indicadoresPorPagina);
        this.prepararDatosGraficos();
      },
      error: (error) => {
        console.error('Error al cargar indicadores:', error);
      }
    });
  }

  actualizarPorcentaje(item: IndicadorCTI): void {
    if (item.meta && item.meta !== 0) {
      // Calcular con 2 decimales
      item.porcentajeCumplimiento = parseFloat(
        ((item.real / item.meta) * 100).toFixed(2)
      );
    } else {
      item.porcentajeCumplimiento = 0;
    }
    
    // Guardar cambios en la API
    this.indicadoresService.actualizarIndicador(item).subscribe({
      next: () => console.log('Meta actualizada en el servidor'),
      error: (err) => {
        console.error('Error al actualizar:', err);
        // Aquí podrías revertir los cambios si falla la actualización
      }
    });
    
    this.prepararDatosGraficos();
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.prepararDatosGraficos();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.prepararDatosGraficos();
    }
  }

  private prepararDatosGraficos(): void {
    // Calcular total de cumplimiento para el gráfico de pastel
    const totalIndicadores = this.indicadores.length;
    const cumplidos = this.indicadores.filter(i => i.porcentajeCumplimiento >= 100).length;
    const noCumplidos = totalIndicadores - cumplidos;

    this.datosCumplimiento = [
      { name: 'Metas Cumplidas', value: cumplidos },
      { name: 'Metas No Cumplidas', value: noCumplidos }
    ];

    // Obtener indicadores para la página actual
    const inicio = this.paginaActual * this.indicadoresPorPagina;
    const fin = inicio + this.indicadoresPorPagina;
    const indicadoresPagina = this.indicadores.slice(inicio, fin);

    this.datosComparativa = indicadoresPagina.map(item => ({
      name: `${item.numero}: ${item.indicador.substring(0, 20)}${item.indicador.length > 20 ? '...' : ''}`,
      series: [
        { name: 'Meta', value: item.meta },
        { name: 'Real', value: item.real },
        { name: '% Cumplimiento', value: item.porcentajeCumplimiento }
      ]
    }));
  }

  obtenerIndicador(id: number): void {
    this.indicadoresService.obtenerIndicador(id).subscribe({
      next: (indicador) => {
        console.log('indicador obtenido:', indicador);
      },
      error: (err) => console.error('Error obteniendo indicador:', err)
    });
  }
}