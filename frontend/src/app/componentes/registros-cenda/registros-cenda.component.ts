import { Component, OnInit } from '@angular/core';
import { RegistrosCendaService } from '../../services/registros-cenda/registros-cenda.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

interface Registro {
  id?: number;
  area: string;
  autores: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  linea: string;
  proyecto: string;
}

@Component({
  selector: 'app-registros-cenda',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registros-cenda.component.html',
  styleUrls: ['./registros-cenda.component.scss']
})
export class RegistrosCendaComponent implements OnInit {
  errorMsg: string | null = null;
  registros: Registro[] = [];
  mostrarFormularioRegistro = false;
  editando = false;
  areas = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  categorias = [
    'PATENTES Y MODELOS DE UTILIDAD SOLICITADOS',
    'PATENTES Y MODELOS DE UTILIDAD CONCEDIDOS',
    'REGISTROS DE NUEVAS VARIEDADES VEGETALES Y MICROORGANISMOS',
    'REGISTROS INFORMÁTICOS'
  ];

  nuevoRegistro: Registro = {
    
    area: '',
    autores: '',
    titulo: '',
    descripcion: '',
    categoria: '',
    linea: '',
    proyecto: ''
  };

  constructor(private svc: RegistrosCendaService) {}

  ngOnInit() { 
    this.cargarRegistros();
  }

  cargarRegistros(): void {
   this.svc.getRegistros().subscribe( data => {
     this.registros = data;
   });
  }


  nuevoRegistroForm() {
    this.mostrarFormularioRegistro = !this.mostrarFormularioRegistro;
    if (!this.mostrarFormularioRegistro) {
      this.cancelarEdicion();
    }
  }

  editarRegistro(registro: Registro) {
    this.editando = true;
    this.mostrarFormularioRegistro = true;
    this.nuevoRegistro = { ...registro };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarRegistro(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.svc.delete(id).subscribe({
        next: () => {
          this.registros = this.registros.filter(r => r.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al eliminar registro';
          console.error('Error al eliminar registro', err);
        }
      });
    }
  }

  submitRegistro() {
    if (this.editando) {
      this.actualizarRegistro();
    } else {
      this.agregarRegistro();
    }
  }

  agregarRegistro() {
    if (this.validarFormulario()) {
      const payload = { ...this.nuevoRegistro } as any;
      delete payload.id;  // Eliminamos el campo "id" de la entidad
      this.svc.create(this.nuevoRegistro).subscribe({
        next: (registro) => {
          this.registros.push(registro);
          this.mostrarFormularioRegistro = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al crear registro';
          console.error('Error al crear registro', err);
        }
      });
    }
  }

  actualizarRegistro() {
    if (this.validarFormulario() &&  this.nuevoRegistro.id != null) {
      this.svc.update(this.nuevoRegistro.id, this.nuevoRegistro).subscribe({
        next: (registroActualizado) => {
          const index = this.registros.findIndex(r => r.id === registroActualizado.id);
          if (index !== -1) {
            this.registros[index] = registroActualizado;
          }
          this.mostrarFormularioRegistro = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al actualizar registro';
          console.error('Error al actualizar registro', err);
        }
      });
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.limpiarFormulario();
  }

  private validarFormulario(): boolean {
    return !!this.nuevoRegistro.area &&
           !!this.nuevoRegistro.autores &&
           !!this.nuevoRegistro.titulo &&
           !!this.nuevoRegistro.descripcion &&
           !!this.nuevoRegistro.categoria &&
           !!this.nuevoRegistro.linea &&
           !!this.nuevoRegistro.proyecto;
  }

  private limpiarFormulario() {
    this.nuevoRegistro = {
      id: 0,
      area: '',
      autores: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      linea: '',
      proyecto: ''
    };
    this.editando = false;
  }
}