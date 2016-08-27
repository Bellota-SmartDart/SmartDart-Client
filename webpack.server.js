var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase: ".",
    hot: true,
    filename: '[name].js',
    publicPath: '/static/',
    stats: {
        colors: true,
    },
});
server.listen(8000, 'localhost', function() {});