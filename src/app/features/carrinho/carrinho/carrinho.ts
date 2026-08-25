import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
@Component({
selector: 'app-carrinho',
imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe],
templateUrl: './carrinho.html',
styleUrl: './carrinho.css',
})
export class Carrinho {
 private router = inject(Router);
  public carrinhoFacade = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade);

// A página do carrinho passa a consumir o estado global do carrinho.
CarrinhoFacade = inject(CarrinhoFacade);
removerItem(indice: number) {
// Remove um item específico da lista.
this.carrinhoFacade.removerItem(indice);
}
limparCarrinho() {
// Limpa todos os itens do carrinho.
this.carrinhoFacade.limparCarrinho();
}
  cancelarCompra(){
    this.carrinhoFacade.limparCarrinho();   
    this.authFacade.sair();
    this.router.navigate(['/login']);
  }
}