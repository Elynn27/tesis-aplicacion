// src/app/componentes/registro/registro.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,    // para *ngIf, *ngFor, etc.
    FormsModule,     // para [(ngModel)]
    RouterModule     // para routerLink, etc.
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegisterComponent {
  correo = '';
  nombre = '';
  apellidos = '';
  password = '';
  error = '';
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.register({
      correo: this.correo,
      nombre: this.nombre,
      apellidos: this.apellidos,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = err.error?.message || 'Error al registrar'
    });
  }
  
}
