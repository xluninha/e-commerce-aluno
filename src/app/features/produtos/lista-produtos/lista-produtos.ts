import { Component, effect, signal, computed } from '@angular/core';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //! remover a lista de produtos, dados carregados via API Fakestoreapi
  produtos = signal <
  { nome: string ; preco: number } []> ([]);
//? criar estado de carregamentoo, 
//** true: requisição em andamento, exibir indicador no template
//! false: esconder indicador e exibir a lista de produtos
  carregando = signal(true);
  produtoSelecionado = signal<string | null>(null);
  carrinho = signal<{ nome: string; valor: number }[]>([]);

   carregarProdutos() {
    this.carregando.set(true);
    this.http.get<
      { title: string; valor: number }[]
    >
      ('https://fakstore.com/products')
      .subscribe({
        next: (dados) => {
          const produtosFormatados = dados.map(p => ({
            nome: p.title, preco: p.valor
          }));
          this.produtos.set(produtosFormatados);
          this.carregando.set(false);
        },
        error: (e) => {
          console.error('Erro ao carregar produtos: ', e);
          this.carregando.set(false);
        }
      })
  }

  // Computeds
  totalProdutos = computed(() => this.produtos().length);
  valorTotal = computed(() => this.produtos().reduce((total, item) => total + item.preco, 0));
  quantidadeCarrinho = computed(() => this.carrinho().length);
  totalCarrinho = computed(() => this.carrinho().reduce((total, item) => total + item.valor, 0));

  // O construtor correto em inglês
  //! injetar httpClient dentro de construct, reestruturar constructor!!!
  constructor( private http: HttpClient ) {
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