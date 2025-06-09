import { Component, OnInit } from '@angular/core';
import { PremiosService, Premio as PremioServiceModel } from '../../services/premios/premios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class PremiosComponent implements OnInit {
  errorMsg: string | null = null;
  premios: PremioServiceModel[] = [];
  mostrarFormularioPremio = false;
  editando = false;
  areas = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  tiposResultado = [
    'Premios ACC',
    'Otros Nacionales',
    'Provinciales',
    'Premios del Fórum de Ciencia y Técnica',
    'Premios CITMA a Joven Investigador y Estudiante Investigador',
    'Premios Internacionales',
    'Estudiantiles'
  ];

  nuevoPremio: any = {
    
    area: '',
    autores: '',
    tituloResultado: '',
    tipoResultado: '',
    fecha: '',
    proyecto: '',
    premioACC: '',
    otrosNacionales: '',
    provinciales: { 
      tipo: '', 
      provincia: '', 
      ejecutor: '', 
      participante: '' 
    },
    estudiantiles: { 
      concurso: '', 
      categoria: '' 
    }
  };

  constructor(private premiosService: PremiosService) { }

  ngOnInit(): void {
    this.cargarPremios();
  }

  cargarPremios(): void {
    this.premiosService.getPremios().subscribe(data => {
      this.premios = data;
    });
  }

  nuevoPremioForm() {
    this.mostrarFormularioPremio = !this.mostrarFormularioPremio;
    if (!this.mostrarFormularioPremio) {
      this.cancelarEdicion();
    }
  }

  editarPremio(premio: PremioServiceModel) {
    this.editando = true;
    this.mostrarFormularioPremio = true;
    this.nuevoPremio = { ...premio };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarPremio(id: number) {
    if (confirm('¿Está seguro de eliminar este premio?')) {
      this.premiosService.deletePremio(id).subscribe({
        next: () => {
          this.premios = this.premios.filter(p => p.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al eliminar premio';
          console.error('Error al eliminar premio', err);
        }
      });
    }
  }

  submitPremio() {
    if (this.editando) {
      this.actualizarPremio();
    } else {
      this.agregarPremio();
    }
  }

  agregarPremio() {
    if (this.validarFormulario() ) {
      const payload = { ...this.nuevoPremio } as any;
      delete payload.id;  // Eliminamos el campo "id" de la entidad
      this.premiosService.createPremio(this.nuevoPremio).subscribe({
        next: (premio) => {
          this.premios.push(premio);
          this.mostrarFormularioPremio = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al crear premio';
          console.error('Error al crear premio', err);
        }
      });
    }
  }

  actualizarPremio() {
    if (this.validarFormulario() && this.nuevoPremio.id != null) {
      this.premiosService.updatePremio(this.nuevoPremio.id, this.nuevoPremio).subscribe({
        next: (premioActualizado) => {
          const index = this.premios.findIndex(p => p.id === premioActualizado.id);
          if (index !== -1) {
            this.premios[index] = premioActualizado;
          }
          this.mostrarFormularioPremio = false;
          this.limpiarFormulario();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error?.message || 'Error al actualizar premio';
          console.error('Error al actualizar premio', err);
        }
      });
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.limpiarFormulario();
  }

  onTipoResultadoChange(): void {
    const tipo = this.nuevoPremio.tipoResultado;

    // Reiniciar valores de campos específicos al cambiar el tipo
    if (tipo !== 'Premios ACC') {
      this.nuevoPremio.premioACC = '';
    }

    if (tipo !== 'Otros Nacionales') {
      this.nuevoPremio.otrosNacionales = '';
    }

    if (tipo !== 'Provinciales') {
      this.nuevoPremio.provinciales = { 
        tipo: '', 
        provincia: '', 
        ejecutor: '', 
        participante: '' 
      };
    }

    if (tipo !== 'Estudiantiles') {
      this.nuevoPremio.estudiantiles = { 
        concurso: '', 
        categoria: '' 
      };
    }
  }

  private validarFormulario(): boolean {
    let valido = !!this.nuevoPremio.area &&
                !!this.nuevoPremio.autores &&
                !!this.nuevoPremio.tituloResultado &&
                !!this.nuevoPremio.tipoResultado &&
                !!this.nuevoPremio.fecha &&
                !!this.nuevoPremio.proyecto;

    switch(this.nuevoPremio.tipoResultado) {
      case 'Premios ACC':
        valido = valido && !!this.nuevoPremio.premioACC;
        break;
      case 'Otros Nacionales':
        valido = valido && !!this.nuevoPremio.otrosNacionales;
        break;
      case 'Provinciales':
        valido = valido && !!this.nuevoPremio.provinciales?.tipo &&
                          !!this.nuevoPremio.provinciales?.provincia;
        break;
      case 'Estudiantiles':
        valido = valido && !!this.nuevoPremio.estudiantiles?.concurso &&
                          !!this.nuevoPremio.estudiantiles?.categoria;
        break;
    }

    return valido;
  }

  private limpiarFormulario() {
    this.nuevoPremio = {
      id: 0,
      area: '',
      autores: '',
      tituloResultado: '',
      tipoResultado: '',
      fecha: new Date().toISOString().split('T')[0],
      proyecto: '',
      premioACC: '',
      otrosNacionales: '',
      provinciales: { 
        tipo: '', 
        provincia: '', 
        ejecutor: '', 
        participante: '' 
      },
      estudiantiles: { 
        concurso: '', 
        categoria: '' 
      }
    };
    this.editando = false;
  }
}