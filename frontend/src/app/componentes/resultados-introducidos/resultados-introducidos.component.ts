import { Component, OnInit } from '@angular/core';
import { ResultadosIntroducidosService, Resultado } from '../../services/resultados-introducidos/resultados-introducidos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resultados-introducidos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './resultados-introducidos.component.html',
  styleUrls: ['./resultados-introducidos.component.scss']
})
export class ResultadosIntroducidosComponent implements OnInit {
  datos: Resultado[] = [];
  mostrarFormulario = false;
  modoEdicion = false;
  resultadoSeleccionado: Resultado | null = null;

  areas = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  sectoresEstrategicos = [
    'Turismo',
    'Industria biotecnológica y farmacéutica',
    'Electroenergético',
    'Telecomunicaciones e informática',
    'Producción de alimentos',
    'Construcciones',
    'Logistica',
    'Redes hidráulicas y sanitarias',
    'Agroindustria azucarera',
    'Industria ligera',
    'Servicios técnicos profesionales'
  ];
  tiposImpacto = ['Nacional', 'Exportacion'];

  // Para crear, omitimos id
  nuevoResultado: Omit<Resultado, 'id'> = {
    area: '',
    resultado: '',
    valoracionCualitativa: '',
    tipoImpacto: '',
    valor: 0,
    sectoresEstrategicos: ''
  };

  constructor(private svc: ResultadosIntroducidosService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.svc.getAll().subscribe({
      next: d => this.datos = d,
      error: err => console.error('Error al cargar datos:', err)
    });
  }

  /** Devuelve el modelo de formulario (crear / editar) */
  get formModel(): any {
    return this.modoEdicion
      ? this.resultadoSeleccionado!
      : this.nuevoResultado;
  }

  /** Abre/cierra formulario */
  toggleFormulario(): void {
    if (this.mostrarFormulario && this.modoEdicion) {
      this.cancelarEdicion();
    } else {
      this.mostrarFormulario = !this.mostrarFormulario;
    }
  }

  /** Crea un nuevo resultado */
  agregarResultado(): void {
    if (!this.validarFormulario()) return;
    this.svc.create(this.nuevoResultado).subscribe({
      next: (r: Resultado) => {
        this.datos.push(r);
        this.mostrarFormulario = false;
        this.limpiarFormulario();
      },
      error: err => console.error('Error al crear resultado:', err)
    });
  }

  /** Carga un resultado en el formulario para editar */
  iniciarEdicion(r: Resultado): void {
    this.resultadoSeleccionado = { ...r };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
  }

  /** Envía la actualización */
  actualizarResultado(): void {
    if (!this.resultadoSeleccionado || !this.validarFormulario()) return;
    const id = this.resultadoSeleccionado.id as number;
    this.svc.update(id, this.resultadoSeleccionado).subscribe({
      next: (actualizado: Resultado) => {
        const idx = this.datos.findIndex(x => x.id === actualizado.id);
        if (idx !== -1) this.datos[idx] = actualizado;
        this.cancelarEdicion();
      },
      error: err => console.error('Error al actualizar resultado:', err)
    });
  }

  /** Elimina un resultado */
  eliminarResultado(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar este resultado?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.datos = this.datos.filter(x => x.id !== id),
      error: err => console.error('Error al eliminar resultado:', err)
    });
  }

  /** Cancela edición */
  cancelarEdicion(): void {
    this.resultadoSeleccionado = null;
    this.modoEdicion = false;
    this.mostrarFormulario = false;
    this.limpiarFormulario();
  }

  /** Validación básica */
  private validarFormulario(): boolean {
    const m = this.formModel;
    return !!m.area &&
           !!m.resultado &&
           !!m.tipoImpacto &&
           m.valor > 0 &&
           !!m.sectoresEstrategicos;
  }

  /** Resetea el formulario de creación */
  private limpiarFormulario(): void {
    this.nuevoResultado = {
      area: '',
      resultado: '',
      valoracionCualitativa: '',
      tipoImpacto: '',
      valor: 0,
      sectoresEstrategicos: ''
    };
  }
}
