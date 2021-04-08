#!/usr/bin/env bash

if [[ ! -d "build/" ]]; then
  mkdir build
fi

SHARED_FLAGS="--unstable --watch"

# bundler
BUNDLER_FLAGS=$SHARED_FLAGS
BUNDLER_INPUT=examples/client/index.js
BUNDLER_OUTPUT=build/puppy.bundle.js

SERVER_PERMISSIONS="--allow-net=localhost:8080 --allow-read=$BUNDLER_OUTPUT"
SERVER_FLAGS=$SHARED_FLAGS
SERVER_ENTRY=examples/server/index.ts

npx concurrently \
-n format,bundle,server \
-c "bgBlue.bold,bgMagenta.bold,bgGreen.bold" \
"deno fmt ."      \
"deno bundle $BUNDLER_INPUT $BUNDLER_FLAGS $BUNDLER_OUTPUT" \
"deno run $SERVER_PERMISSIONS $SERVER_FLAGS $SERVER_ENTRY"

