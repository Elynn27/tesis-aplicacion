import { Component, OnInit } from '@angular/core';
import { TransferenciasService, Transferencia } from '../../services/transferencias/transferencias.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.scss']
})
export class TransferenciasComponent implements OnInit {
  datos: Transferencia[] = [];
  mostrarFormulario = false;
  modoEdicion = false;
  transferenciaSeleccionada: Transferencia | null = null;

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

  // Para creación, omitimos id
  nuevaTransferencia: Omit<Transferencia, 'id'> = {
    area: '',
    numero: 0,
    tecnologia: '',
    valorTotal: 0,
    sectorEstrategico: '',
    equipamiento: 0,
    asistenciaTecnica: 0,
    propiedadIntelectual: 0,
    formacionEntrenamiento: 0,
    otros: '',
    descripcion: ''
  };

  constructor(private svc: TransferenciasService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.svc.getAll().subscribe({
      next: d => this.datos = d,
      error: err => console.error('Error al cargar transferencias:', err)
    });
  }

  /** Getter para enlazar el formulario al objeto correcto */
  get formModel(): any {
    return this.modoEdicion
      ? this.transferenciaSeleccionada!
      : this.nuevaTransferencia;
  }

  /** Abre/Cierra el formulario */
  toggleFormulario(): void {
    if (this.mostrarFormulario && this.modoEdicion) {
      this.cancelarEdicion();
    } else {
      this.mostrarFormulario = !this.mostrarFormulario;
    }
  }

  /** Crea una nueva transferencia */
  agregarTransferencia(): void {
    if (!this.validarFormulario()) {
      return;
    }
    this.svc.create(this.nuevaTransferencia).subscribe({
      next: (t: Transferencia) => {
        this.datos.push(t);
        this.mostrarFormulario = false;
        this.limpiarFormulario();
      },
      error: err => console.error('Error al crear transferencia:', err)
    });
  }

  /** Carga un registro en el formulario para editar */
  iniciarEdicion(t: Transferencia): void {
    this.transferenciaSeleccionada = { ...t };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
  }

  /** Envía la actualización */
  actualizarTransferencia(): void {
    if (!this.transferenciaSeleccionada || !this.validarFormulario()) {
      return;
    }
    const id = this.transferenciaSeleccionada!.id as number;
    this.svc.update(id, this.transferenciaSeleccionada).subscribe({
      next: (actualizada: Transferencia) => {
        const idx = this.datos.findIndex(x => x.id === actualizada.id);
        if (idx !== -1) {
          this.datos[idx] = actualizada;
        }
        this.cancelarEdicion();
      },
      error: err => console.error('Error al actualizar transferencia:', err)
    });
  }

  /** Elimina una transferencia */
  eliminarTransferencia(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar esta transferencia?')) {
      return;
    }
    this.svc.delete(id).subscribe({
      next: () => {
        this.datos = this.datos.filter(x => x.id !== id);
      },
      error: err => console.error('Error al eliminar transferencia:', err)
    });
  }

  /** Cancela edición y resetea estado */
  cancelarEdicion(): void {
    this.transferenciaSeleccionada = null;
    this.modoEdicion = false;
    this.mostrarFormulario = false;
    this.limpiarFormulario();
  }

  /** Validación básica de campos obligatorios */
  private validarFormulario(): boolean {
    const m = this.formModel;
    return !!m.area &&
           m.numero > 0 &&
           !!m.tecnologia &&
           m.valorTotal > 0 &&
           !!m.sectorEstrategico;
  }

  /** Resetea el formulario de creación */
  private limpiarFormulario(): void {
    this.nuevaTransferencia = {
      area: '',
      numero: 0,
      tecnologia: '',
      valorTotal: 0,
      sectorEstrategico: '',
      equipamiento: 0,
      asistenciaTecnica: 0,
      propiedadIntelectual: 0,
      formacionEntrenamiento: 0,
      otros: '',
      descripcion: ''
    };
  }
}
