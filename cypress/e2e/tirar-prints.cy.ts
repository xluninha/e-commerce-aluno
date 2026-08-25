/// <reference types="cypress" />

describe('Capturar Screenshots das Telas', () => {

  // 1. Telas PÚBLICAS
  const rotasPublicas = [
    { nome: '01-inicio', url: '/' },
    { nome: '02-produtos', url: '/produtos' },
    { nome: '03-login', url: '/login' },
    { nome: '08-acesso-negado', url: '/acesso-negado' },
  ];

  // 2. Telas PRIVADAS (precisam de login)
  const rotasPrivadas = [
    { nome: '04-carrinho', url: '/carrinho' },
    { nome: '05-checkout', url: '/checkout' },
    { nome: '06-favoritos', url: '/favoritos' },
    { nome: '07-admin', url: '/admin' },
  ];

  // Captura de telas públicas
  rotasPublicas.forEach(rota => {
    it(`Print público: ${rota.nome}`, () => {
      cy.visit(rota.url, { failOnStatusCode: false });
      cy.wait(500);
      cy.screenshot(rota.nome);
    });
  });

  // Captura de telas privadas após autenticação
  context('Sessão Autenticada', () => {
    beforeEach(() => {
      cy.visit('/login');

      // Preenche os campos
      cy.get('input[type="email"], input[name="email"], input[formcontrolname="email"]').type('aluno@email.com');
      cy.get('input[type="password"], input[name="senha"], input[formcontrolname="senha"]').type('123456');

      // Clica em qualquer botão que seja de envio ou que contenha o texto Entrar/Login
      cy.get('button, input[type="submit"]').contains(/Entrar|Login|Acessar/i).click({ force: true });

      cy.wait(1000);
    });

    rotasPrivadas.forEach(rota => {
      it(`Print privado: ${rota.nome}`, () => {
        cy.visit(rota.url, { failOnStatusCode: false });
        cy.wait(500);
        cy.screenshot(rota.nome);
      });
    });
  });

});