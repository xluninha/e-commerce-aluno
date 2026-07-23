import { Component, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produto/produto';

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

// Carrinho continua igual
carrinho = signal<{ nome: string; preco: number }[]>([]);

// controle de carregamento
carregando = signal(true);

// ===== COMPUTED =====
totalProdutos = computed(() => this.produtos().length);
valorTotal = computed(() => {
return this.produtos()
.reduce((total, item) => total + item.preco, 0);
});
quantidadeCarrinho = computed(() => this.carrinho().length);
totalCarrinho = computed(() => {
return this.carrinho()
.reduce((total, item) => total + item.preco, 0);
});
// ===== CONSTRUTOR =====
constructor(private http: HttpClient) {
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

// inicia loading
this.carregando.set(true);

this.http.get<{ title: string; price: number }[]>
('https://fakestoreapi.com/products')
.subscribe({
next: (dados) => {

// Adaptação da API para o nosso projeto
const produtosFormatados = dados.map(p => ({
nome: p.title,
preco: p.price
}));

this.produtos.set(produtosFormatados);
this.carregando.set(false); // finaliza loading
},

error: (erro) => {
console.error('Erro ao carregar produtos:', erro);
this.carregando.set(false); // evita loading infinito
}
});
}

// ===== MÉTODOS EXISTENTES (INALTERADOS) =====
exibirProduto(nome: string) {
this.produtoSelecionado.set(nome);
}

adicionarProduto() {
this.produtos.update(listaAtual => [
...listaAtual,
{ nome: 'Teclado', preco: 250 }
]);
}

substituirProdutos() {
this.produtos.set([
{ nome: 'Produto novo', preco: 999 }
]);
}

adicionarAoCarrinho(produto: { nome: string; preco: number }) {
this.carrinho.update(listaAtual => [
...listaAtual,
produto
]);
}
}