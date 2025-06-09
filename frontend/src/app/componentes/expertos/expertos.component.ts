import { Component, OnInit } from '@angular/core';
import { ExpertosService } from '../../services/expertos/expertos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Experto {
  id: number;
  area: string;
  nombreApellidos: string;
  gradoCientifico: string;
  areaConocimiento: string;
  instanciaAsesora: string;
  programa: string;
}

@Component({
  selector: 'app-expertos',
  templateUrl: './expertos.component.html',
  styleUrls: ['./expertos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ExpertosComponent implements OnInit {
  listado: Experto[] = [];
  mostrarFormularioExperto = false;
  nuevoExperto: Partial<Experto> = {};
  editando = false;
  expertoSeleccionadoId: number | null = null;

  constructor(private expertosService: ExpertosService) { }

  ngOnInit(): void {
    this.cargarExpertos();
  }

  cargarExpertos(): void {
    this.expertosService.getExpertos().subscribe({
      next: (data) => this.listado = data,
      error: (err) => console.error('Error cargando expertos:', err)
    });
  }

  // Abrir formulario para nuevo experto
  nuevoExpertoForm(): void {
    this.mostrarFormularioExperto = true;
    this.editando = false;
    this.nuevoExperto = {};
  }

  // Preparar formulario para editar experto
  editarExperto(experto: Experto): void {
    this.editando = true;
    this.mostrarFormularioExperto = true;
    this.expertoSeleccionadoId = experto.id;
    this.nuevoExperto = { ...experto };
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.mostrarFormularioExperto = false;
    this.editando = false;
    this.nuevoExperto = {};
    this.expertoSeleccionadoId = null;
  }

  // Manejar envío del formulario (crear o actualizar)
  submitExperto(): void {
    if (this.editando && this.expertoSeleccionadoId !== null) {
      this.actualizarExperto();
    } else {
      this.agregarExperto();
    }
  }

  agregarExperto(): void {
    this.expertosService.createExperto(this.nuevoExperto as Experto).subscribe({
      next: (expertoCreado) => {
        this.listado.push(expertoCreado);
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error creando experto:', err)
    });
  }

  actualizarExperto(): void {
    if (this.expertoSeleccionadoId === null) return;

    this.expertosService.updateExperto(
      this.expertoSeleccionadoId, 
      this.nuevoExperto as Experto
    ).subscribe({
      next: (expertoActualizado) => {
        const index = this.listado.findIndex(e => e.id === this.expertoSeleccionadoId);
        if (index !== -1) {
          this.listado[index] = expertoActualizado;
        }
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error actualizando experto:', err)
    });
  }

  eliminarExperto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este experto?')) {
      this.expertosService.deleteExperto(id).subscribe({
        next: () => {
          this.listado = this.listado.filter(e => e.id !== id);
        },
        error: (err) => console.error('Error eliminando experto:', err)
      });
    }
  }
}