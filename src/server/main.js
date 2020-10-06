import axios from 'axios';
import React from 'react';
import App from '../frontend/App';
import { renderToString } from 'react-dom/server';

require('dotenv').config();

const render = html => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Trivia API</title>
        <link rel="stylesheet" href="./assets/app.css" type="text/css"></link>
      </head>
      <body>
        <div id="app">${html}</div>
        
        <script src="./assets/app.js" type="text/javascript"></script>
      </body>
    </html>
  `;
};

const main = async (req, res, next) => {
  try {
    const html = renderToString(<App />);

    res.send(render(html));
  } catch (error) {
    next(error);
  }
};

export default main;
