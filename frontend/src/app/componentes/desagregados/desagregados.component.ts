// src/app/components/desagregados/desagregados.component.ts
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { DesagregadosService, IndicadorArea } from '../../services/desagregados/desagregados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desagregados-area',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, FormsModule],
  templateUrl: './desagregados.component.html',
  styleUrls: ['./desagregados.component.scss'],
})
export class DesagregadosComponent implements OnInit {
  // Definición compatible con Color
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF8C00', '#4682B4', '#00CED1', '#8A2BE2']
  };

  areas: string[] = ['FTL','FCS','FIO','FTI','CITEC','FTE','CICE','CENED'];
  areaSeleccionada = this.areas[0];
  indicadoresPorArea?: IndicadorArea;
  datosGrafico: any[] = [];

  constructor(private desagregadosService: DesagregadosService) {}

  ngOnInit() {
    this.cargarIndicadores();
  }

  onAreaChange() {
    this.cargarIndicadores();
  }

  private cargarIndicadores() {
    this.desagregadosService.getIndicadoresPorArea(this.areaSeleccionada)
      .subscribe({
        next: (res) => {
          this.indicadoresPorArea = res;
          this.datosGrafico = res.indicadores.map(i => ({ name: i.nombre, value: i.valor }));
        },
        error: (err) => console.error('Error al cargar indicadores por área:', err)
      });
  }
}