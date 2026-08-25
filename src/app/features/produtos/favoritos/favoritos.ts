import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [FormsModule, CdkObserveContent],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  // Estado principal reativo usando Signals
  favoritos = signal<string[]>([]);
  novoProduto: string = '';

  // Adiciona um produto usando .update()
  adicionar(): void {
    if (this.novoProduto.trim()) {
      this.favoritos.update(lista => [...lista, this.novoProduto.trim()]);
      this.novoProduto = '';
    }
  }

  // Remove um produto usando .update() com filter
  remover(itemParaRemover: string): void {
    this.favoritos.update(lista => lista.filter(item => item !== itemParaRemover));
  }
}