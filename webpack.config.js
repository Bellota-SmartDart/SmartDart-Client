var path = require('path');
var webpack = require('webpack');


var config = {
    entry: {
        bundle: [
            "./frontend/entry.js",
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8000/',
        ]
    },
    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports = config;