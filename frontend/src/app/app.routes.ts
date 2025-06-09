// src/app/app.routes.ts (o app-routing.module.ts)
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 1) Rutas públicas: Login y Registro
  {
    path: 'login',
    loadComponent: () =>
      import('./componentes/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./componentes/registro/registro.component').then(m => m.RegisterComponent)
  },

  // 2) Layout protegido: Dashboard + todas las rutas hijas
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./componentes/dashboard/dashboard.component').then(m => m.DashboardComponent),  // carga DashboardComponent
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      
      

      // → Rutas hijas protegidas:
      {
        path: 'metas',
        loadComponent: () =>
          import('./componentes/metas/metas.component').then(m => m.MetasComponent)
      },
      {
        path: 'eventos',
        loadComponent: () =>
          import('./componentes/eventos/eventos.component').then(m => m.EventosComponent)
      },
      {
        path: 'indicadores',
        loadComponent: () =>
          import('./componentes/indicadores/indicadores.component').then(m => m.IndicadoresComponent)
      },
      {
        path: 'libros',
        loadComponent: () =>
          import('./componentes/libros/libros.component').then(m => m.LibrosComponent)
      },
      {
        path: 'premios',
        loadComponent: () =>
          import('./componentes/premios/premios.component').then(m => m.PremiosComponent)
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./componentes/proyectos/proyectos.component').then(m => m.ProyectosComponent)
      },
      {
        path: 'desagregados',
        loadComponent: () =>
          import('./componentes/desagregados/desagregados.component').then(m => m.DesagregadosComponent)
      },
      {
        path: 'gruposcientificos',
        loadComponent: () =>
          import('./componentes/grupos-cientificos/grupos-cientificos.component').then(m => m.GruposCientificosComponent)
      },
      {
        path: 'registros-cenda',
        loadComponent: () =>
          import('./componentes/registros-cenda/registros-cenda.component').then(m => m.RegistrosCendaComponent)
      },
      {
        path: 'transferencias',
        loadComponent: () =>
          import('./componentes/transferencias/transferencias.component').then(m => m.TransferenciasComponent)
      },
      {
        path: 'resultados-introducidos',
        loadComponent: () =>
          import('./componentes/resultados-introducidos/resultados-introducidos.component')
            .then(m => m.ResultadosIntroducidosComponent)
      },
      {
        path: 'expertos',
        loadComponent: () =>
          import('./componentes/expertos/expertos.component').then(m => m.ExpertosComponent)
      },
      {
        path: 'publicaciones',
        loadComponent: () =>
          import('./componentes/publicaciones/publicaciones.component').then(m => m.PublicacionesComponent)
      }
    ]
  },

  // 3) Ruta comodín: si no coincide nada, redirige a '/login'
  {
    path: '**',
    redirectTo: 'login'
  }
];
