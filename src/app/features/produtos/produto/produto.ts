import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  // Entrada de dados
  @Input() nome: string = '';
  @Input() preco: number = 0; 
  
  // Saídas de dados para lista-produtos
  @Output() produtoSelecionado = new EventEmitter<string>();
  @Output() adicionarCarrinho = new EventEmitter<{ nome: string; valor: number }>();

  selecionarProduto() {
    this.produtoSelecionado.emit(this.nome);
  }

  // Função disparada ao clicar no botão de adicionar ao carrinho
  comprar() {
    this.adicionarCarrinho.emit({ nome: this.nome, valor: this.preco });
  }
}