const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const pkg = require('./package.json');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const name = pkg.name;
let plugins = [];
let optimization = {};


module.exports = (env = {}) => {
    if (env.production) {
        optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        }
                    }
                })
            ]
        };
        
        plugins = [
            new webpack.BannerPlugin(`${name} - ${pkg.version}`),
        ]
    } else {
        const index = 'index.html';
        const indexDev = '_' + index;
        plugins.push(new HtmlWebpackPlugin({
            template: fs.existsSync(indexDev) ? indexDev : index
        }));
    }

    return {
        devtool: env.production ? false : 'inline-source-map',
        watch: env.production ? false : true,
        mode: env.production ? 'production' : 'development',
        entry: './src',
        output: {
            filename: `./${name}.min.js`,
            library: name,
            libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /src/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
            ],
        },
        externals: {'grapesjs': 'grapesjs'},
        optimization: optimization,
        plugins: plugins,
        watchOptions: {
            ignored: /node_modules/
        },
        devServer: {
            port: 8000
        },
        resolve: {
            alias: {
                '@': path.resolve("src")
            },
        }
    };
};
