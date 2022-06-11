import {join, resolve} from "path";
import dotenv from "dotenv";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {readFileSync} from "fs";
import {EnvironmentPlugin, BannerPlugin} from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import type {WebpackPluginInstance, Configuration} from "webpack";

const IS_DEV = process.env.production || !process.env.development;

const webpackConfig = (): Configuration => {
    const config = {
        target: "web",

        devtool: IS_DEV ? "eval" : "eval-source-map",

        entry: {
            app: "./src/app.tsx",
        },

        output: {
            clean: true,
            path: join(__dirname, "build"),
            filename: IS_DEV ? "[name].[contenthash].js" : "[contenthash].js",
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            plugins: [new TsconfigPathsWebpackPlugin()],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                modules: {
                                    localIdentName: IS_DEV
                                        ? "[local]-[hash:base64:6]"
                                        : "[hash:base64:6]",
                                },
                            },
                        },
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },
                {
                    test: /\.(svg|png|jpg|json)$/,
                    exclude: /node_modules/,
                    loader: "file-loader",
                    options: {
                        name: "static/media/[name].[hash:8].[ext]",
                    },
                },
            ],
        },

        plugins: (
            [
                new BannerPlugin({
                    test: /^(?!.*\/node_modules\/).*$/,
                    banner: readFileSync("./LICENSE", "utf-8"),
                }),
                new EnvironmentPlugin(
                    Object.keys(dotenv.config().parsed || {})
                ),
                new ForkTsCheckerWebpackPlugin({
                    //https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#typescript-options
                    typescript: {
                        diagnosticOptions: {
                            semantic: true,
                            syntactic: true,
                        },
                        mode: "write-references", //Required 'cause babel is used.
                    }, //,eslint: {enabled: true,files: "./src/**/*.{ts,tsx,js}"} //Module version <= 6 is required to make this option work. More info: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#installation
                }),
                new HtmlWebpackPlugin({
                    template: `./src/index.html`,
                    filename: `./index.html`,
                    chunks: ["app"],
                    meta: {},
                    minify: {
                        collapseWhitespace: true,
                        removeComments: true,
                    },
                }),
            ] as WebpackPluginInstance[]
        ).concat(
            IS_DEV
                ? []
                : [
                      new MiniCssExtractPlugin({
                          filename: "[contenthash].css",
                      }),
                  ]
        ), //https://github.com/microsoft/TypeScript/issues/36769#issuecomment-585633004

        optimization: {
            runtimeChunk: {
                name: "runtime",
            },
            splitChunks: {
                chunks: "all" as "all", //Fixes wrong typescript definition...
                cacheGroups: {
                    modules: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        name: "app",
                        enforce: true,
                        reuseExistingChunk: true,
                    },
                },
            },
        },

        devServer: {
            port: 3232,
            historyApiFallback: true,
            static: {
                directory: resolve(__dirname, "static"),
                publicPath: "/assets",
            },
        },
    };

    return config;
};

export default webpackConfig;
