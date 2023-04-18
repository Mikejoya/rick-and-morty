const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { Template } = require('webpack');

module.exports = (env, argv)=>{
    const { mode } = argv;
    const isProduction = mode === 'production';


    return {
        
        entry: {
            main: './src/index.js',
            second: './src/displayCard.js'
        },
        output: {
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            path: path.join(__dirname, 'dist')
        },
        plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'}),
            new CleanWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options:{
                        presets: [
                            '@babel/preset-env',
                        ]
                    }
                }
            ]
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        devServer: {
            open: true,
            port: 3000,
            compress: true,
        }
    }
}