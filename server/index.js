import express from 'express';
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongodb from 'mongodb';
import webpackConfigDev from '../webpack.config.dev.js';
import webpackConfigProd from '../webpack.config.prod.js';
import route from './routes/index.js';

const mongoClient = mongodb.MongoClient;

const url = `mongodb://rahulrana95:9068390682Rr@ds147589.mlab.com:47589/alexa_va`;

const router = express.Router();
let app = express();
let compiler = {};
let webpackConfig = {};
if(process.env.mode == 'PRODUCTION') {
	webpackConfig = webpackConfigProd;
    compiler = webpack(webpackConfigProd);

    app.use(webpackMiddleware(compiler,{
        publicPath : webpackConfig.output.publicPath,
        noInfo: true
    }));

    console.log('Running in production mode...');
} else {
	webpackConfig = webpackConfigDev;
    compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler,{
        hot: true,
        publicPath : webpackConfig.output.publicPath,
        noInfo: true
    }));

    app.use(webpackHotMiddleware(compiler));
    console.log('Running in development mode...');
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    app.set('db',db);
  });


for (var x in route ){
	app.use('/api',require(path.join(__dirname+'/routes/',route[x])));
}

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(3333,()=>{
  console.log('Running Local Server at Port: ' + 3333);
});
