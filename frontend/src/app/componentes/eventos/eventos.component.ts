import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos/eventos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Evento {
  id: number;
  area: string;
  autores: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  categoria: string;
  linea: string;
  proyecto: string;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  mostrarFormularioEvento = false;
  eventoEnEdicion: number | null = null;
  nuevoEvento: Partial<Evento> = {
    area: '',
    autores: '',
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    categoria: '',
    linea: '',
    proyecto: ''
  };

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos(): void {
    this.eventosService.getEventos().subscribe({
      next: (data) => this.eventos = data,
      error: (err) => this.manejarError(err)
    });
  }

  agregarEvento(): void {
    if (!this.validarCampos()) return;

    if (this.eventoEnEdicion !== null) {
      this.actualizarEvento();
    } else {
      this.eventosService.createEvento(this.nuevoEvento as Evento).subscribe({
        next: (eventoCreado) => {
          this.eventos = [...this.eventos, eventoCreado];
          this.mostrarFormularioEvento = false;
          this.resetFormulario();
        },
        error: (error) => this.manejarError(error)
      });
    }
  }

  editarEvento(evento: Evento): void {
    this.eventoEnEdicion = evento.id;
    this.nuevoEvento = { ...evento };
    this.mostrarFormularioEvento = true;
  }

  actualizarEvento(): void {
    if (!this.eventoEnEdicion) return;

    this.eventosService.updateEvento(this.eventoEnEdicion, this.nuevoEvento as Evento).subscribe({
      next: (eventoActualizado) => {
        this.eventos = this.eventos.map(e => 
          e.id === this.eventoEnEdicion ? eventoActualizado : e
        );
        this.mostrarFormularioEvento = false;
        this.resetFormulario();
      },
      error: (error) => this.manejarError(error)
    });
  }

  confirmarEliminar(evento: Evento): void {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
    if (confirmado) {
      this.eventos = this.eventos.filter(e => e !== evento);
    }
  }
cancelarFormulario(): void {
    this.resetearFormulario();
  }
  resetearFormulario(): void {
    this.nuevoEvento = {
      
      area: '',
      autores: '',
      titulo: '',
      descripcion: '',
      fecha: '',
      lugar: '',
      categoria: '',
      linea: '',
      proyecto: ''
    };
    this.eventoEnEdicion = null;
  }

  eliminarEvento(id: number): void {
    this.eventosService.deleteEvento(id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.id !== id);
      },
      error: (error) => this.manejarError(error)
    });
  }

  private validarCampos(): boolean {
    return !!this.nuevoEvento.area?.trim() &&
           !!this.nuevoEvento.autores?.trim() &&
           !!this.nuevoEvento.titulo?.trim() &&
           !!this.nuevoEvento.descripcion?.trim() &&
           !!this.nuevoEvento.fecha &&
           !!this.nuevoEvento.lugar?.trim();
  }

  private resetFormulario(): void {
    this.nuevoEvento = {
      area: '',
      autores: '',
      titulo: '',
      descripcion: '',
      fecha: '',
      lugar: '',
      categoria: '',
      linea: '',
      proyecto: ''
    };
    this.eventoEnEdicion = null;
  }

  private manejarError(error: any): void {
    console.error('Error:', error);
    let mensaje = 'Ha ocurrido un error';
    
    if (error.error?.message) {
      mensaje = error.error.message;
    } else if (error.error?.errors) {
      mensaje = error.error.errors.map((e: any) => e.defaultMessage).join(', ');
    }
    
    alert(mensaje);
  }
}