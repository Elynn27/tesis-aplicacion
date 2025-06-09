// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id: number;
  correo: string;
  nombre: string;
  apellidos: string;
}

interface RegisterReq { correo: string; nombre: string; apellidos: string; password: string; }
interface LoginReq    { correo: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterReq): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginReq): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(user => {
          localStorage.setItem('usuario', JSON.stringify(user));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  get currentUser(): Usuario | null {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  }
}
