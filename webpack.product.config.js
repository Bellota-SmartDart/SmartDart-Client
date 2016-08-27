var path = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var BundleTracker = require('webpack-bundle-tracker');

var config = {
    entry: {
        bundle: [
            "./frontend/entry.js"
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
        //new BundleTracker(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
module.exports = config;