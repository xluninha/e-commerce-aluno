import { Component, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produto/produto';
import { ProdutosService } from '../produto/produtos.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  // ===== SIGNALS =====
  // AGORA VEM DA API (inicia vazio)
  produtos = signal<{ nome: string; preco: number }[]>([]);
  produtoSelecionado = signal<string | null>(null);
  carrinho = signal<{ nome: string; preco: number }[]>([]);
  carregando = signal(true);

  // ===== COMPUTED =====
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) => total + item.preco, 0);
  });
  quantidadeCarrinho = computed(() => this.carrinho().length);
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item) => total + item.preco, 0);
  });

  // ===== INJEÇÃO DE DEPENDÊNCIA =====
  private produtosService = inject(ProdutosService);

  // ===== CONSTRUTOR =====
  constructor() {
    // carrega da API
    this.carregarProdutos();

    // effects continuam iguais
    effect(() => {
      console.log('Lista de produtos alterada:', this.produtos());
    });
    effect(() => {
      console.log('Valor total atualizado:', this.valorTotal());
    });
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalProdutos()}) Minha Loja`;
      }
    });
  }

  // ===== MÉTODO HTTP (API) =====
  carregarProdutos() {
    this.carregando.set(true);
    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando.set(false);
      },
    });
  } // <--- Chave que estava faltando fechar aqui!

  // ===== MÉTODOS EXISTENTES =====
  exibirProduto(nome: string) {
    this.produtoSelecionado.set(nome);
  }

  adicionarProduto() {
    this.produtos.update((listaAtual) => [
      ...listaAtual,
      { nome: 'Teclado', preco: 250 },
    ]);
  }

  substituirProdutos() {
    this.produtos.set([{ nome: 'Produto novo', preco: 999 }]);
  }

  adicionarAoCarrinho(produto: { nome: string; preco: number }) {
    this.carrinho.update((listaAtual) => [...listaAtual, produto]);
  }
}