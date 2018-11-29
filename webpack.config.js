const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const version = Math.random().toString().substr(2, 6);
let resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}
const env = (process.env.NODE_ENV || 'development');
console.log(env);
const dirUrl = path.resolve('./src/views');
let titles = require('./src/titles');
let files = fs.readdirSync(dirUrl); // 填写需要编译的js文件名
let entry = {
    ventor: ['vue', 'babel-polyfill']
};
let HtmlWebpack = [];
let clearPlugins = [];
files.map(file => {
    let entryJS = file.replace('.js', '');
    entry[entryJS] = `./src/views/${file}`;
    let filename = path.resolve(__dirname, `${entryJS}/index.html`);
    if (entryJS == 'index') {
        filename = path.resolve(__dirname, `index.html`);
        clearPlugins.push(`./index.html`);
    } else {
        clearPlugins.push(`./${entryJS}/index.html`);
    }
    let htmlConfig = {
        title: titles[entryJS] || '二三子博客',
        env,
        version,
        // favicon: './images/logo.png',
        chunks: ['ventor', entryJS],
        inject: 'body',
        filename,
        template: './index.ejs',
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
        }
    };
    HtmlWebpack.push(new HtmlWebpackPlugin(htmlConfig));

    clearPlugins.push(`./dist/${entryJS}*.js`);
});
clearPlugins.push('./dist/ventor.js');
const config = {
    entry,
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: './dist/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: [/node_modules/],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 4048,
                name: '[name].[hash:8].[ext]'
            }
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'


        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '[name].[hash:8].[ext]'
            }
        }]
    },
    plugins: [
        //new CleanWebpackPlugin(['./html','./dist']),
        new CleanWebpackPlugin(clearPlugins),
        new CommonsChunkPlugin({
            names: ['ventor'],
            minChunks: Infinity
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        ...HtmlWebpack,
        new FriendlyErrorsPlugin()
    ],
    devtool: '#eval-source-map'
}
if (env == 'production' || env == 'test' || env == 'test2') {
    console.log('------->', env)
    config.devtool = '';
    config.output.publicPath = '/dist/';
    if (env === 'production') {
        config.output.publicPath = '/dist/';
    }
    config.output.filename = `[name].[chunkhash:8].${version}.js`;
    config.output.chunkFilename = `[chunkhash:8].[id].${version}.chunk.js`;
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"',
                'kingold': JSON.stringify(env)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false,
                drop_console: env == 'production' ? true : false
            }
        }),
        new WebpackMd5Hash(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
} else {
    console.log('dev');
}
module.exports = config;