import { serve } from "https://deno.land/std@0.92.0/http/server.ts";
import routeParser from "https://jspm.dev/route-parser";

import {
  compose,
  head,
  pipe,
  tap,
  toUpper,
} from "https://deno.land/x/ramda@v0.27.2/mod.ts";

export { compose, head, pipe, routeParser, serve, tap, toUpper };
