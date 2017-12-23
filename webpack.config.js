var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');


var DEVELOPMENT = process.env.NODE_ENV == 'development';
var PRODUCTION = process.env.NODE_ENV == 'production';

var entry = PRODUCTION ? ['./src/index.js']: ['./src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
    ];


var plugins = PRODUCTION ? [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style-[contenthash:10].css'),
    new htmlWebpackPlugin({ template: 'index-template.html', })
]: [new webpack.HotModuleReplacementPlugin()];


plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
)


const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
	?	ExtractTextPlugin.extract({
            fallback: 'style-loader',
			use: 'css-loader?minimize&localIdentName=' + cssIdentifier
		})
	: 	['style-loader', 'css-loader?localIdentName=' + cssIdentifier];

const lessLoader = PRODUCTION 
    ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
			use: ['css-loader?minimize&localIdentName=' + cssIdentifier, 'less-loader']
		})
	: 	['style-loader', 'css-loader?localIdentName=' + cssIdentifier, 'less-loader'];

module.exports = {
    devtool: 'inline-source-map',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/': '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js': 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        },
        { 
          test: /\.jsx$/,
          loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
          exclude: '/node_modules/' 
        },
        {
            test: /\.(png|jpg|gif)$/,
            loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
            exclude: '/node_modules/'
        },
        {
            test: /\.(css)$/,
            use: cssLoader,
            exclude: '/node_modules/'
        },
                {
            test: /\.(less)$/,
            use: lessLoader,
            exclude: '/node_modules/'
        }

        ]
    },
    plugins: plugins
}