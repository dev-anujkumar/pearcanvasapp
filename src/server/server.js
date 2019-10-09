import path from 'path';
import express from 'express';
import webpack from 'webpack';
const https = require('https');
const fs = require('fs');
const open = require('open');
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
var proxyMiddleware = require('http-proxy-middleware');

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT || 443;
const COMPRESSION = process.env.COMPRESSION || false;

if (process.env.NODE_ENV === 'development') {
    const webpackConfig = require('../../webpack.dev.config.js');
    var devConfig = webpackConfig.devServer;
    const compiler = webpack(webpackConfig);

    if (COMPRESSION) {
        app.get('*.js', (req, res, next) => {
            if (req.header('Accept-Encoding').includes('br')) {
                req.url = req.url + '.br';
                console.log(`Requesting ${req.url} with Header ${req.header('Accept-Encoding')}`);
                res.set('Content-Encoding', 'br');
                res.set('Content-Type', 'application/javascript; charset=UTF-8');
            }
            next();
        });
    }

    app.get('/plugins/tiny_mce_wiris/plugin.js', function (request, response){
        response.sendFile(path.resolve(__dirname, '../../dist', 'plugins/tiny_mce_wiris/plugin.js'))
    })
    app.use(
        ['**/configurationjs**', '/pluginwiris_engine/**'],
        proxyMiddleware({
            target: 'https://dev-structuredauthoring.pearson.com/', 
            changeOrigin: true,
            pathRewrite: {
                '^/static/js' : '/tinywiris/tinymce4/js/tinymce'
            }
         })
      );
    

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));

    if(devConfig.proxy) {
        Object.keys(devConfig.proxy).forEach(function(context) {
          app.use(proxyMiddleware(context, devConfig.proxy[context]));
        });
      }

    /* ----- for local node testing over https ----- */
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(PORT, '0.0.0.0', function () {
        console.log(`https server starting to ${PORT}`);
        console.log('<------------------- Launching default browser ----------------->');
        open('https://localhost');
        console.log('Press Ctrl+C to quit.')
    });
}

// app.get('*', (req, res, next) => {
//     compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//         if (err) {
//             return next(err)
//         }
//         res.set('content-type', 'text/html')
//         res.send(result)
//         res.end()
//     })
// })