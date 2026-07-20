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
    { nome: 'Teclado Gamer', preco: 149.00 },
    { nome: 'Mouse Gamer', preco: 299.99 },
    { nome: 'Monitor Gamer', preco: 1599.99 },
    { nome: 'Desktop Gamer', preco: 4999.99 },
    { nome: 'Headset Gamer', preco: 699.99 }
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
      { nome: 'Sony PlayStation 5', preco: 10000 }
    ]);
  }

  substituirProdutos() {
    this.produtos.set([
      { nome: 'Arroz Fazenda', preco: 400 },
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