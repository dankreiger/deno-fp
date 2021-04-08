const template = async (name: string) =>
  `<html>
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
      <style>
        body {
          font-family: sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100vh;
          font-size: 2em;
          color: white;
          background: black;
        }
        
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          font-size: 1em;
          margin-top: 40px;
          padding: 30px;
        }
        
        .flex {
          display: flex;
          flex-direction: column;
        }
        
        .woof {
          font-size: 0.4em;
          color: red;
        }  
      </style>
    </head>
    <body class="container">

      <a href="/home">Home</a>
      <a href="/dan">Dan</a>
      </br>
      <h1 class="is-size-4 mt-4"> <strong>${name}</strong></h1>
      </br>
      <div id="root"></div>
      <footer style="font-size: 2em;"></footer>
      <script type="module">
      ${await Deno.readTextFile('./build/puppy.bundle.js')}
      </script>
    </body>
  </html>`;

export { template };
