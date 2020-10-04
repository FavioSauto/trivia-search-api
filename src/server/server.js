import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import main from './main';

dotenv.config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;
const app = express();

app.use(express.static(`${__dirname}/public`));

if (ENV === 'development') {
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.disable('x-powered-by');
}

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/', main);

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Server running on http://localhost:${PORT} as ${ENV}`);
});
