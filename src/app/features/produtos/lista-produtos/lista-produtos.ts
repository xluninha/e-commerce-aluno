import { Component, effect, signal, computed } from '@angular/core';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    { nome: 'Pirulito da Antonela', preco: 54.99 },
    { nome: 'Lollo', preco: 299.99 },
    { nome: 'Paçoquita', preco: 32.99 },
    { nome: 'Pipoca das Marias', preco: 179.95 },
    { nome: 'Chocolate Tortuguita', preco: 10.00 }
  ]);

  produtoSelecionado = signal<string | null>(null);
  carrinho = signal<{ nome: string; valor: number }[]>([]);

  // Computeds
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => this.produtos().reduce((total, item) => total + item.preco, 0));
  quantidadeCarrinho = computed(() => this.carrinho().length);
  totalCarrinho = computed(() => this.carrinho().reduce((total, item) => total + item.valor, 0));

  // O construtor correto em inglês
  constructor() {
    effect(() => {
      console.log("Lista de Produtos Alterados: ", this.produtos());
    });
    
    effect(() => {
      console.log("Valor total atualizado: ", this.valorTotal());
    });

    effect(() => {
      if (typeof document !== "undefined") {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }

  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  adicionarProduto() {
    this.produtos.update(listaAtual => [
      ...listaAtual, 
      { nome: 'Biscoito Passatempo', preco: 29.90 }
    ]);
  }

  substituirProdutos() {
    this.produtos.set([
      { nome: 'Toddynho', preco: 109.24 },
      { nome: 'Marshmallows Fini', preco: 5.99 }
    ]);
  }

  adicionarAoCarrinho(produto: { nome: string; valor: number }) {
    this.carrinho.update(listaAtual => [...listaAtual, produto]);
  }

  removeTodosProdutos() {
    this.produtos.set([]);
  }
}