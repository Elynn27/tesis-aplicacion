import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../services/publicaciones/publicaciones.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Publicacion {
  id: number;
  area: string;
  titulo: string;
  autores: string;
  revista: string;
  ano: number;
  numeroVolumen: string;
  issn: string;
  baseDatos: string;
  linea: string;
  grupoMes: string;
  url: string;
}

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  areas = ['CITEC', 'FTI', 'FIO', 'FTE', 'FTL', 'FCS'];
  gruposMes = ['I', 'II', 'III', 'IV'];
  lineas = [
    'Ciberseguridad',
    'Computación científica',
    'Desafíos e impacto social de las TIC',
    'Formación del profesional de la informática',
    'Inteligencia artificial',
    'Ingeniería de Software',
    'Sistemas de información y transformación digital',
    'Informática médica',
    'Sistemas computacionales para la industria',
    'Tecnologías de Interfaz Hombre-Computadora'
  ];
  
  currentYear = new Date().getFullYear();
  mostrarFormulario = false;
  publicacionEditando: Publicacion | null = null;
  
  nuevaPublicacion: Omit<Publicacion, 'id'> = {
    area: '',
    titulo: '',
    autores: '',
    revista: '',
    ano: this.currentYear,
    numeroVolumen: '',
    issn: '',
    baseDatos: '',
    linea: '',
    grupoMes: '',
    url: ''
  };

  constructor(private publicacionesService: PublicacionesService) { }

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(): void {
    this.publicacionesService.getPublicaciones().subscribe(data => {
      this.publicaciones = data;
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.publicacionEditando = null;
      this.resetFormulario();
    }
  }

  submitPublicacion() {
    if (!this.validarFormulario()) return;

    const operacion = this.publicacionEditando 
      ? this.publicacionesService.update(this.publicacionEditando.id, this.nuevaPublicacion as Publicacion)
      : this.publicacionesService.create(this.nuevaPublicacion);

    operacion.subscribe({
      next: (publicacion) => {
        if (this.publicacionEditando) {
          this.publicaciones = this.publicaciones.map(p => 
            p.id === publicacion.id ? publicacion : p
          );
        } else {
          this.publicaciones.push(publicacion);
        }
        this.resetFormulario();
        this.mostrarFormulario = false;
        this.publicacionEditando = null;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  editarPublicacion(publicacion: Publicacion) {
    this.nuevaPublicacion = { ...publicacion };
    this.publicacionEditando = publicacion;
    this.mostrarFormulario = true;
  }

  eliminarPublicacion(id: number) {
    if (confirm('¿Está seguro de eliminar esta publicación?')) {
      this.publicacionesService.delete(id).subscribe({
        next: () => {
          this.publicaciones = this.publicaciones.filter(p => p.id !== id);
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  cancelarEdicion() {
    this.resetFormulario();
    this.mostrarFormulario = false;
    this.publicacionEditando = null;
  }

  validarFormulario(): boolean {
    return !!this.nuevaPublicacion.area &&
           !!this.nuevaPublicacion.titulo &&
           !!this.nuevaPublicacion.autores &&
           !!this.nuevaPublicacion.revista &&
           !!this.nuevaPublicacion.ano &&
           !!this.nuevaPublicacion.url &&
           !!this.nuevaPublicacion.grupoMes &&
           !!this.nuevaPublicacion.linea;
  }

  private resetFormulario() {
    this.nuevaPublicacion = {
      area: '',
      titulo: '',
      autores: '',
      revista: '',
      ano: this.currentYear,
      numeroVolumen: '',
      issn: '',
      baseDatos: '',
      linea: '',
      grupoMes: '',
      url: ''
    };
  }
}