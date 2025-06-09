import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Meta, MetasService } from '../../services/metas/metas.service';
import { IndicadoresService, IndicadorCTI } from '../../services/indicadores/indicadores.service';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas: Meta[] = [];
  indicadores: IndicadorCTI[] = [];

  // Mapa interno: indicador (texto largo) → porcentajeCumplimiento
  cumplimientoMap = new Map<string, number>();

  metaForm!: FormGroup;

  editing = false;
  selectedMetaId: number | null = null;
  showForm = false;

  constructor(
    private metasService: MetasService,
    private indicadoresService: IndicadoresService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadAllData();
  }

  /**
   * 1) Construye el formulario reactivo:
   * - oe: solo lectura (pero lo incluimos en el FormGroup)
   * - indicador: solo lectura
   * - metavalor: editable, validado
   */
  private buildForm(): void {
  this.metaForm = this.fb.group({
    oe:         [{ value: '', disabled: true }, []],
    indicador:  [{ value: '', disabled: true }, []],
    metaValor:  [0, [Validators.required, Validators.min(0)]]   // ← camelCase
  });
}


  /** Carga simultáneamente: todos los Metas y el cálculo de Indicadores */
  private loadAllData(): void {
    // 1) Cargar metas
    this.metasService.getMetas().subscribe({
      next: (data: Meta[]) => {
        this.metas = data;
        // 2) Una vez que tenemos metas, cargamos indicadores
        this.loadIndicadores();
      },
      error: (err) => console.error('Error cargando metas:', err)
    });
  }

  /** Llama a IndicadoresService para obtener lista completa de IndicadorCTI */
  private loadIndicadores(): void {
    this.indicadoresService.obtenerIndicadores().subscribe({
      next: (lista) => {
        this.indicadores = lista;
        // Reconstruir el map indicador→porcentajeCumplimiento
        this.cumplimientoMap.clear();
        this.indicadores.forEach(ic => {
          // ic.indicador es el texto largo, igual a Meta.indicador
          this.cumplimientoMap.set(ic.indicador, ic.porcentajeCumplimiento);
        });
      },
      error: (err) => console.error('Error cargando indicadores:', err)
    });
  }

  /** Getter para acceder a los controles de metaForm desde la plantilla */
  get f() {
    return this.metaForm.controls;
  }

  /**
   * Devuelve el porcentajeCumplimiento para el texto “indicador” dado.
   * Si no existe en el map, devuelve 0.
   */
  getPorcentajeCumplimiento(textoIndicador: string): number {
    return this.cumplimientoMap.get(textoIndicador) ?? 0;
  }

  /**
   * Se ejecuta al pulsar “Editar” en una fila de la tabla.
   *  - Guarda selectedMetaId
   *  - Carga formulario con “oe”, “indicador” y “metavalor”
   *  - Deja “oe” e “indicador” deshabilitados (solo lectura)
   *  - Muestra el modal
   */
  onEdit(meta: Meta): void {
    this.editing = true;
    this.selectedMetaId = meta.id ?? null;

    // Habilitamos temporalmente los controles de lectura para asignar el valor
    this.metaForm.get('oe')!.enable();
    this.metaForm.get('indicador')!.enable();

    this.metaForm.patchValue({
      oe: meta.oe ?? '',
      indicador: meta.indicador,
      metavalor: meta.metaValor
    });

    // Volvemos a deshabilitar oe e indicador para que queden solo lectura
    this.metaForm.get('oe')!.disable();
    this.metaForm.get('indicador')!.disable();

    this.showForm = true;
  }

  /**
   * Cierra el modal y resetea el formulario
   */
  closeForm(): void {
    this.showForm = false;
    this.editing = false;
    this.selectedMetaId = null;
    this.metaForm.reset({ oe: '', indicador: '', metavalor: 0 });

    // Asegurarse de que los campos de solo lectura queden deshabilitados
    this.metaForm.get('oe')!.disable();
    this.metaForm.get('indicador')!.disable();
  }

  /**
   * Se dispara al enviar el formulario.
   * Usamos getRawValue() para que incluya controles deshabilitados.
   * Enviamos el objeto completo al back-end (oe, indicador y metavalor).
   */
  onSubmit(): void {
    if (this.metaForm.invalid || this.selectedMetaId === null) {
      this.metaForm.markAllAsTouched();
      return;
    }

    // Obtenemos TODOS los valores, incluso los deshabilitados
    const formValues = this.metaForm.getRawValue();
    const objetoActualizado: Meta = {
      id: this.selectedMetaId,
      oe: formValues.oe,
      indicador: formValues.indicador,
      metaValor: formValues.meta_valor
    };
      
    // Llamamos al servicio pasando el objeto completo
    this.metasService.updateMeta(objetoActualizado).subscribe({
      next: () => {
        // 1) Recargar la lista de metas (ya actualizado en la BD)
        this.metasService.getMetas().subscribe({
          next: (data: Meta[]) => {
            this.metas = data;
            // 2) Una vez recargadas metas, volver a consultar indicadores
            this.loadIndicadores();
          },
          error: (err) => console.error('Error recargando metas después de update:', err)
        });

        // Ocultar formulario y resetear estado
        this.closeForm();
      },
      error: (err) => console.error('Error actualizando meta:', err)
    });
  }

  /**
   * Se dispara al pulsar “Eliminar” en una fila.
   * Borra la fila completa de la BD y quita el elemento de this.metas.
   */
  onDelete(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta meta?')) {
      return;
    }
    this.metasService.deleteMeta(id).subscribe({
      next: () => {
        // Filtrar localmente sin la fila eliminada
        this.metas = this.metas.filter(m => m.id !== id);
        // Luego recargamos indicadores para actualizar el porcentaje en caso de que haya dependencias
        this.loadIndicadores();
      },
      error: (err) => console.error('Error eliminando meta:', err)
    });
  }
}
