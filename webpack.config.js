// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;


const config = {
    entry: {
        script: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js",
    },
    devServer: {
        open: true,
        host: 'localhost',
        liveReload: true,
        port: 3000,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
          }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            // {
            //     test: /\.css$/i,
            //     use: [stylesHandler, 'css-loader'],
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    "css-loader",
                    "sass-loader",
                  ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset',
                generator: {
                    filename: "./assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.(webp|png|svg|jpg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: "./assets/images/[name][ext]",
                },
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

    } else {
        config.mode = 'development';
    }
    return config;
};
