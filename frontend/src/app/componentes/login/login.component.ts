// src/app/componentes/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo = '';
  password = '';
  error = '';
   isLoading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.login({
      correo: this.correo,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.error = err.error?.message || 'Credenciales inválidas'
    });
  }
}
