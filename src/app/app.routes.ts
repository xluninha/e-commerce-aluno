//?Este arquivo funciona como o mapa de rotas (URLs) do seu e-commerce. Ele diz qual componente carregar para cada caminho e protege as páginas privadas.
import { Routes } from '@angular/router';
import { Favoritos } from './features/produtos/favoritos/favoritos';
// Proteções (Guards) que verificam permissões antes de liberar o acesso às páginas
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';

export const routes: Routes = [


  {
    path: 'favoritos', component: Favoritos, // https://seusite.com/favoritos: Página de favoritos
  },

  {
    // Caminho vazio (https://seusite.com/): Página Inicial
    path: '',
    loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
  },
  {
    // https://seusite.com/produtos: Vitrine/Listagem de produtos
    path: 'produtos',
    loadComponent: () => import('./features/produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
  },
  {
    // https://seusite.com/carrinho: Carrinho de compras
    path: 'carrinho',
    canActivate: [authGuard], // EXIGE LOGIN: Só entra se o usuário estiver autenticado
    loadComponent: () => import('./features/carrinho/carrinho/carrinho').then((m) => m.Carrinho),
  },
  {
    // https://seusite.com/checkout: Finalização do pedido
    path: 'checkout',
    canActivate: [authGuard], // EXIGE LOGIN: Só entra se o usuário estiver autenticado
    loadComponent: () => import('./features/checkout/checkout/checkout').then((m) => m.Checkout),
  },
  {
    // https://seusite.com/admin: Painel Administrativo
    path: 'admin',
    canActivate: [adminGuard], // EXIGE PERMISSÃO DE ADMIN: Só entra se for administrador
    loadComponent: () => import('./features/admin/admin/admin').then((m) => m.Admin),
  },
  {
    // https://seusite.com/acesso-negado: Página de erro quando o usuário tenta acessar o que não deve
    path: 'acesso-negado',
    loadComponent: () => import('./features/acesso-negado/acesso-negado/acesso-negado').then((m) => m.AcessoNegado),
  },
  {
    // https://seusite.com/login: Tela de Login
    path: 'login',
    loadComponent: () => import('./features/login/login/login').then((m) => m.Login),
  },
  {
    // Rota curinga ('**'): Captura qualquer URL inexistente/digitada errada
    path: '**',
    redirectTo: '', // Redireciona o usuário de volta para a Home
  },
];