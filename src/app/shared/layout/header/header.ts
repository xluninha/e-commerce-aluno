import { Component } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatAnchor, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Lunupi';
  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  quantidadeHeader = this.carrinhoService.quantidadeItens;
  estaLogado = this.authService.estaLogado;
usuarioAtual = this.authService.usuarioAtual;
sair() {
this.authService.logout();
}
}
