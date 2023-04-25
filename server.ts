import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const viteServer = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const app = express();

app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use(viteServer.middlewares);

app.use(async (req, res) => {
  const data = await viteServer.transformIndexHtml(
    req.originalUrl,
    fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
  );

  const parts = data.split('<!--ssr-outlet-->');
  const { render } = await viteServer.ssrLoadModule('/dist/server/serverApp.js');
  const stream = await render(req.url, {
    onShellReady() {
      res.write(parts[0]);
      stream.pipe(res);
    },
    // onShellError(err: Error) {
    //   console.error(err);
    // },
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    // onError(err: Error) {
    //   console.error(err);
    // },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
