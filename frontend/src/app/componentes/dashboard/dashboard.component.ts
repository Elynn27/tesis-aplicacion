import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../../services/auth.service';  // importamos Usuario para tipado

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class DashboardComponent {
  isSidebarOpen = true;
  
  menuItems = [
    
    { name: 'Indicadores CTI', path: '/dashboard/indicadores', icon: 'insights' },
    { name: 'Desagregados por Facultad', path: '/dashboard/desagregados', icon: 'view_column' },
    { name: 'Expertos', path: '/dashboard/expertos', icon: 'emoji_people' },
    { name: 'Eventos', path: '/dashboard/eventos', icon: 'event' },
    { name: 'Proyectos', path: '/dashboard/proyectos', icon: 'work' },
    { name: 'Grupos Científicos', path: '/dashboard/gruposcientificos', icon: 'groups' },
    { name: 'Publicaciones', path: '/dashboard/publicaciones', icon: 'article' },
    { name: 'Libros', path: '/dashboard/libros', icon: 'menu_book' },
    { name: 'Registros CENDA', path: '/dashboard/registros-cenda', icon: 'inventory_2' },
    { name: 'Premios', path: '/dashboard/premios', icon: 'emoji_events' },
    { name: 'Transferencias', path: '/dashboard/transferencias', icon: 'transfer_within_a_station' },
    { name: 'Resultados Intro.', path: '/dashboard/resultados-introducidos', icon: 'thumb_up' }
  ];

  constructor(private router: Router, private auth: AuthService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isDashboardHome(): boolean {
    return this.router.url === '/';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Getter para devolver el nombre completo del usuario logueado
  get userName(): string {
    const user: Usuario | null = this.auth.currentUser;
    return user ? `${user.nombre} ${user.apellidos}` : '';
  }
}
