/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = (argv) => {
    return {
        entry: "./src/index.tsx",
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            extensions: [".tsx", ".ts", ".js", ".jsx"],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].bundle.js",
            chunkFilename: "[name].chunk.js",
        },
        devServer: {
            open: true,
            compress: true,
            hot: true,
            port: 9000,
            historyApiFallback: true,
        },
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ["ts-loader", "eslint-loader"],
                },
                {
                    test: /\.less$/i,
                    use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: "dist/index.html",
            }),
            new ForkTsCheckerWebpackPlugin({ async: false }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
            }),
            new Dotenv({
                path: process.env.NODE_ENV === "dev_server" ? "./config/.env.development" : process.env.NODE_ENV === "dev_prod" && "./config/.env.production",
            }),
        ],
    }
}
