import { Component, OnInit } from '@angular/core';
import { LibrosService, Libro } from '../../services/libros/libros.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class LibrosComponent implements OnInit {
  errorMsg: string | null = null;
  libros: Libro[] = [];
  mostrarFormularioLibro = false;
  editando = false;
  areas = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  gruposMes = ['I', 'II', 'III', 'IV'];
  
  // Inicializamos sin id para que no envíe id = 0 en creación
  nuevoLibro: Partial<Libro> = {
    area: '',
    autores: '',
    tituloLibro: '',
    tituloCapitulo: '',
    editorial: '',
    ano: new Date().getFullYear(),
    isbn: '',
    pais: '',
    url: '',
    grupoMes: ''
  };

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    this.librosService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }

  nuevoLibroForm() {
    this.mostrarFormularioLibro = !this.mostrarFormularioLibro;
    if (!this.mostrarFormularioLibro) {
      this.cancelarEdicion();
    }
  }

  editarLibro(libro: Libro) {
    this.editando = true;
    this.mostrarFormularioLibro = true;
    this.nuevoLibro = { ...libro };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarLibro(id: number) {
    if (confirm('¿Está seguro de eliminar este libro?')) {
      this.librosService.deleteLibro(id).subscribe({
        next: () => {
          this.libros = this.libros.filter(libro => libro.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al eliminar libro';
          console.error('Error al eliminar libro', err);
        }
      });
    }
  }

  submitLibro() {
    if (this.editando) {
      this.actualizarLibro();
    } else {
      this.agregarLibro();
    }
  }

  agregarLibro() {
    if (this.validarFormulario()) {
      // Creamos un payload sin id para que Hibernate haga INSERT
      const payload = { ...this.nuevoLibro } as any;
      delete payload.id;
      this.librosService.createLibro(payload).subscribe({
        next: (libro: Libro) => {
          this.libros.push(libro);
          this.mostrarFormularioLibro = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al crear libro';
          console.error('Error al crear libro', err);
        }
      });
    }
  }

  actualizarLibro() {
    if (this.validarFormulario() && this.nuevoLibro.id != null) {
      this.librosService.updateLibro(this.nuevoLibro.id, this.nuevoLibro as Libro).subscribe({
        next: (libroActualizado: Libro) => {
          const index = this.libros.findIndex(l => l.id === libroActualizado.id);
          if (index !== -1) {
            this.libros[index] = libroActualizado;
          }
          this.mostrarFormularioLibro = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al actualizar libro';
          console.error('Error al actualizar libro', err);
        }
      });
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.limpiarFormulario();
  }

  private validarFormulario(): boolean {
    return !!this.nuevoLibro.area &&
           !!this.nuevoLibro.autores &&
           !!this.nuevoLibro.tituloLibro &&
           !!this.nuevoLibro.editorial &&
           !!this.nuevoLibro.isbn &&
           !!this.nuevoLibro.pais &&
           !!this.nuevoLibro.grupoMes;
  }

  private limpiarFormulario() {
    this.nuevoLibro = {
      area: '',
      autores: '',
      tituloLibro: '',
      tituloCapitulo: '',
      editorial: '',
      ano: new Date().getFullYear(),
      isbn: '',
      pais: '',
      url: '',
      grupoMes: ''
    };
    this.editando = false;
  }
}
