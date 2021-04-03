declare const Deno: any;

export default `<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
</head>
<body>
  <h1 class="is-size-4">Click the screen</h1>
  <div id="root"></div>
  <script type="module">
  ${await Deno.readTextFile('./build/puppy.bundle.js')}
  </script>
</body>
</html>`;
