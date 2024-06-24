# Chat con socket io - Frontend y Backend

Este repo tiene el código base de un cliente y un servidor para un chat (section 19)

## Comandos para correr Backend en local

```bash
  # Cliente: cd to /client
  npm install
  yarn dev
  ó
  npm run dev

  # Server: npm run dev
  npm install
  npm run start
```

## Configuración para correr Front en local

- Cambia en App.jsx la instancia de `io()`:

```js
  const socket = io("http://localhost:4000"); // dev - local
```

- En server en el index.js cambiar el cors origin a local:

```js
  const io = new SocketServer(server, {
    cors: {
      // origin: 'http://localhost:5173',
      origin: '*',
    }
  });
```

## Descripción

- Código del servidor para conectar con build React
- Chat Básico pero base suficiente para escalar (tu imaginación es el limite)

## Tecnologías

- Node
- React
- Socket.io
- Socket.io-client
- Tailwind

## Notas

- script para hacer build del cliente en Heroku:

```bash
  "build": "npm --prefix client install && npm run --prefix client build"
```

- `morgan` - muestra en consola las peticiones que hace el servidor con detalles de esta

## Vista Previa y Enlace en linea

[Vista Previa](https://cool-chat-87a5e9.netlify.app/) - Heroku esta fallando

![Pagina Principal](./assets/chat-node-react.jpeg)
