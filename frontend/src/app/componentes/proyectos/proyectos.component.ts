// proyectos.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface Proyecto {
  id: number;
  area: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;      // “YYYY-MM-DD”
  fechaFin: string;         // “YYYY-MM-DD”
  presupuesto: number;
  clasificacion: string;
  tipo: string;
  tituloPrograma: string;
  sectorEstrategico: string;
  tipoParticipacion: string;
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
  @ViewChild('proyectoForm') proyectoForm!: NgForm;

  proyectos: Proyecto[] = [];
  filteredProyectos: Proyecto[] = [];
  editando = false;
  mostrarFormularioProyecto = false;

  // Opciones para los selectores
  areas = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  clasificaciones = ['PAPN', 'PAPS', 'PAPT', 'PNAP'];
  tipos = [
    'Proyecto empresarial PE',
    'Proyecto no empresariales y la admon pública PNE',
    'Proyectos de desarrollo local PDL',
    'Proyecto de relacion a la colaboración internacional PRCI'
  ];
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
  tiposParticipacion = ['Entidad ejecutora principal', 'Entidad participante'];

  newProyecto: Proyecto = {
    id: 0,
    area: '',
    codigo: '',
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: 0,
    clasificacion: '',
    tipo: '',
    tituloPrograma: '',
    sectorEstrategico: '',
    tipoParticipacion: ''
  };

  // Variables para ordenamiento
  sortBy: keyof Proyecto = 'titulo';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Variables para paginación
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  // Para el modal de confirmación de eliminación
  showDeleteModal = false;


  constructor(private proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(): void {
    this.proyectosService.getProyectos().subscribe((response: any) => {
      this.proyectos = response.content;
      this.filteredProyectos = [...response.content];
      this.sortData();
    });
  }

  mostrarFormulario(): void {
    this.mostrarFormularioProyecto = !this.mostrarFormularioProyecto;
    this.editando = false;
    if (!this.mostrarFormularioProyecto) {
      this.resetForm();
    }
  }

  // Comprobar si fechaFin < fechaInicio (ambas no vacías)
  fechasInvalidas(): boolean {
    if (!this.newProyecto.fechaInicio || !this.newProyecto.fechaFin) return false;
    return this.newProyecto.fechaFin < this.newProyecto.fechaInicio;
  }

  submitProyecto(): void {
    // Si el formulario Angular es inválido, bloqueamos
    if (this.proyectoForm.invalid) {
      this.proyectoForm.form.markAllAsTouched();
      return;
    }
    // Validación extra: fechas cruzadas
    if (this.fechasInvalidas()) {
      return;
    }

    if (this.editando && this.newProyecto.id) {
      this.updateProyecto();
    } else {
      this.addProyecto();
    }
  }

  addProyecto(): void {
    const { id, ...proyectoWithoutId } = this.newProyecto;

    this.proyectosService.addProyecto(proyectoWithoutId).subscribe({
      next: (data) => {
        this.proyectos = [...this.proyectos, data];
        this.filteredProyectos = [...this.proyectos];
        this.resetForm();
        this.mostrarFormularioProyecto = false;
        this.sortData();
      },
      error: (err) => {
        console.error('Error al crear proyecto:', err);
      }
    });
  }

  updateProyecto(): void {
    if (!this.newProyecto.id) return;

    this.proyectosService.updateProyecto(
      this.newProyecto.id,
      this.newProyecto
    ).subscribe({
      next: (proyectoActualizado) => {
        const index = this.proyectos.findIndex(p => p.id === this.newProyecto.id);
        if (index !== -1) {
          this.proyectos[index] = proyectoActualizado;
          this.filteredProyectos = [...this.proyectos];
        }
        this.resetForm();
        this.mostrarFormularioProyecto = false;
        this.sortData();
      },
      error: (err) => console.error('Error actualizando proyecto:', err)
    });
  }

  // Abre el modal indicando cuál ID eliminar
 

  
  eliminarProyecto(id: number) {
    if (confirm('¿Está seguro de eliminar este proyecto?')) {
      this.proyectosService.deleteProyecto(id).subscribe({
        next: () => {
          this.proyectos = this.proyectos.filter(p => p.id !== id);
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
  

  editarProyecto(proyecto: Proyecto): void {
    this.editando = true;
    this.mostrarFormularioProyecto = true;
    this.newProyecto = { ...proyecto };
  }

  cancelarEdicion(): void {
    this.resetForm();
    this.mostrarFormularioProyecto = false;
    this.editando = false;
  }

  private resetForm(): void {
    this.newProyecto = {
      id:0,
      area: '',
      codigo: '',
      titulo: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      presupuesto: 0,
      clasificacion: '',
      tipo: '',
      tituloPrograma: '',
      sectorEstrategico: '',
      tipoParticipacion: ''
    };
    this.proyectoForm.resetForm();
  }

  // ==========================
  // Métodos de ordenamiento
  // ==========================
  sort(column: keyof Proyecto): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  private sortData(): void {
    this.filteredProyectos.sort((a, b) => {
      const valueA = a[this.sortBy];
      const valueB = b[this.sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortOrder === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }
      return 0;
    });
    this.currentPage = 1;
  }

  // ==========================
  // Métodos de paginación
  // ==========================
  get paginatedProjects(): Proyecto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProyectos.slice(start, start + this.pageSize);
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
  }

  totalPages(): number {
    return Math.ceil(this.filteredProyectos.length / this.pageSize);
  }

  get visiblePages(): number[] {
    const total = this.totalPages();
    const visible: number[] = [];
    const range = 2;

    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(total, this.currentPage + range);

    if (this.currentPage - range > 1) visible.push(1);
    if (this.currentPage - range > 2) visible.push(-1); // -1 => “...”

    for (let i = start; i <= end; i++) visible.push(i);

    if (this.currentPage + range < total - 1) visible.push(-1);
    if (this.currentPage + range < total) visible.push(total);

    return visible;
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  onClasificacionChange(): void {
    if (this.newProyecto.clasificacion !== 'PAPN') {
      this.newProyecto.tipo = '';
    }
  }
}
