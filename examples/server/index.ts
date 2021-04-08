import { routeParser, serve } from "../deps.ts";
import { RouteParser } from "../types.ts";
import { template } from "./helpers/template.ts";
import { hostname, port } from "./config/index.ts";

const Route = routeParser as typeof RouteParser;

const server = serve({ hostname, port });
console.log(`HTTP webserver running: http://${hostname}:${port}/`);

const route = new Route("/:name");

for await (const request of server) {
  const match = route.match(request.url);
  const name = match ? match.name : "Puppy";

  request.respond({
    status: 200,
    body: new TextEncoder().encode(await template(name)),
    headers: new Headers({ "content-type": "text/html" }),
  });
}
