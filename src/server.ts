/**Este é o servidor Node.js/Express responsável pelo Server-Side Rendering (SSR).
 *  Ele renderiza as páginas no lado do servidor antes de mandar para o navegador, deixando o site mais rápido e bom para o Google (SEO).*/


import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Define a pasta onde estão os arquivos estáticos compilados do navegador
const browserDistFolder = join(import.meta.dirname, '../browser');

// Cria a aplicação do servidor web Express
const app = express();
// Inicializa o motor SSR do Angular
const angularApp = new AngularNodeAppEngine();

// Servir arquivos estáticos (imagens, CSS, scripts) com cache de 1 ano
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Intercepta todas as outras requisições e faz o Angular renderizar a página no servidor
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Inicializa o servidor ouvindo na porta configurada (padrão 4000)
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Manipulador exportado para rodar em nuvens como Firebase Cloud Functions ou Vercel
export const reqHandler = createNodeRequestHandler(app);
