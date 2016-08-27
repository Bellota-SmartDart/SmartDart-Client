var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot',
                    'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
                ]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.styl$/,
                loaders: ['style', 'css', 'stylus?paths[]=frontend&paths[]=node_modules&paths[]=node_modules/jeet/stylus']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BundleTracker(),
        new webpack.DefinePlugin({
            __CONFIG__: JSON.stringify('debug')
        })
    ],
};
module.exports = config;