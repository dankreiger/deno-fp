#!/usr/bin/env bash

[ ! -d "/build/" ] && mkdir build

npx concurrently \
-n bundle,server \
"deno bundle examples/index.ts --unstable --watch build/puppy.bundle.js" \
"denon run --allow-net --allow-read examples/server.ts"

