import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-acesso-negado',
  imports: [],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  voltar() {
    this.router.navigate(['/login']);
  }
}