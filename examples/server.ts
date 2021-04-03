import { serve } from 'https://deno.land/std@0.92.0/http/server.ts';
import template from './helpers/template.ts';

const port = 8080;
const server = serve({ hostname: '0.0.0.0', port });
console.log(`HTTP webserver running: http://localhost:${port}/`);

for await (const request of server) {
  request.respond({
    status: 200,
    body: new TextEncoder().encode(await template),
    headers: new Headers({ 'content-type': 'text/html' }),
  });
}
