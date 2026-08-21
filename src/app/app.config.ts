//?Este arquivo é o painel de controle global da sua aplicação. É aqui que você ativa e configura todos os serviços globais do Angular.


// Importa tipos e funções essenciais de configuração do Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

// Importa as rotas (URLs) do site
import { routes } from './app.routes';
// Importa o interceptador HTTP que intercepta requisições enviadas ao servidor
import { httpInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura erros globais do navegador para evitar que o site quebre sem aviso
    provideBrowserGlobalErrorListeners(),

    // Ativa o sistema de navegação usando as rotas definidas no arquivo app.routes.ts
    provideRouter(routes), 

    // Otimiza o carregamento das páginas quando o Angular usa Server-Side Rendering (SSR)
    provideClientHydration(),

    // Configura o cliente de requisições HTTP (para conversar com APIs e backends)
    provideHttpClient(
      // Usa a API 'fetch' nativa do navegador para requisições mais modernas e rápidas
      withFetch(),
      // Registra o interceptador personalizado que trata as requisições (ex: insere tokens de autenticação)
      withInterceptors([httpInterceptor])
    ),
  ],
};