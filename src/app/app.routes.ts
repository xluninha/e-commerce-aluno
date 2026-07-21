import { Routes } from '@angular/router';
import { Carrinho } from './features/carrinho/carrinho/carrinho';
import { Home } from './features/home/home/home';
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'produtos',
    loadComponent: () =>
      import('./features/produtos/lista-produtos/lista-produtos').then(
        (m) => m.ListaProdutos
      ),
  },
  {
    path: 'carrinho',
    component: Carrinho,
  },
];
