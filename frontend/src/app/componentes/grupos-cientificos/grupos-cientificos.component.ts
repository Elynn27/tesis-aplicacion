import { Component, OnInit } from '@angular/core';
import { GruposCientificosService } from '../../services/grupos-cientificos/grupos-cientificos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Grupo {
  id: number;
  facultad: string;
  nombre: string;
  anio: number;
  carrera: string;
  estudiantes: string;
}

@Component({
  selector: 'app-grupos-cientificos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './grupos-cientificos.component.html',
  styleUrls: ['./grupos-cientificos.component.scss']
})
export class GruposCientificosComponent implements OnInit {
  grupos: Grupo[] = [];
  facultades = ['CITEC', 'FTI', 'FTL', 'FIO', 'FTE', 'FCS'];
  nuevoGrupo: Partial<Grupo> = {
    facultad: '',
    nombre: '',
    anio: new Date().getFullYear(),
    carrera: '',
    estudiantes: ''
  };
  
  mostrarFormulario = false;
  grupoEditando: Grupo | null = null;

  constructor(private svc: GruposCientificosService) {}

  ngOnInit() { 
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.svc.getAll().subscribe(d => this.grupos = d);
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.grupoEditando = null;
      this.limpiarFormulario();
    }
  }

  agregarGrupo() {
    if (!this.validarFormulario()) return;

    const operacion = this.grupoEditando 
      ? this.svc.update(this.grupoEditando.id, this.nuevoGrupo as Grupo)
      : this.svc.create(this.nuevoGrupo as Omit<Grupo, 'id'>);

    operacion.subscribe({
      next: (grupo) => {
        if (this.grupoEditando) {
          this.grupos = this.grupos.map(g => g.id === grupo.id ? grupo : g);
        } else {
          this.grupos.push(grupo);
        }
        this.limpiarFormulario();
        this.mostrarFormulario = false;
        this.grupoEditando = null;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  editarGrupo(grupo: Grupo) {
    this.nuevoGrupo = { ...grupo };
    this.grupoEditando = grupo;
    this.mostrarFormulario = true;
  }

  eliminarGrupo(id: number) {
    if (confirm('¿Está seguro de eliminar este grupo?')) {
      this.svc.delete(id).subscribe({
        next: () => {
          this.grupos = this.grupos.filter(g => g.id !== id);
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.mostrarFormulario = false;
    this.grupoEditando = null;
  }

  private validarFormulario(): boolean {
    const isValid = !!this.nuevoGrupo.facultad && 
                   !!this.nuevoGrupo.nombre && 
                   !!this.nuevoGrupo.carrera && 
                   !!this.nuevoGrupo.estudiantes;

    if (!isValid) alert('Complete todos los campos requeridos');
    return isValid;
  }

  private limpiarFormulario() {
    this.nuevoGrupo = {
      facultad: '',
      nombre: '',
      anio: new Date().getFullYear(),
      carrera: '',
      estudiantes: ''
    };
  }
}