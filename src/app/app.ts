//? Este é o componente principal da sua aplicação. Ele junta a lógica com o HTML e CSS.

// Importação de componentes
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';

@Component({
  selector: 'app-root',
  
  // Componentes e recursos que este arquivo precisa usar no HTML dele
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Cria uma variável reativa do Angular (Signal) com o nome interno do projeto
  protected readonly title = signal('e-commerce-aluno');
  // Variável comum que guarda o nome público da sua loja
  nomeLoja = 'Lunupi';
}