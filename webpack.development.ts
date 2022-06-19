import {join, resolve} from "path";
import SassAlias from "sass-alias";
import dotenv from "dotenv";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import {EnvironmentPlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import type {Configuration} from "webpack";

const webpackConfig = ({mode}: {mode: "development"}): Configuration => {
    const config = {
        devtool: "eval",

        mode,

        target: "web",

        entry: {
            app: "./src/app.tsx",
        },

        output: {
            filename: "[name].[contenthash].js",
            path: join(__dirname, "build"),
            publicPath: "/",
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
                    // Exported as an asset **/*.svg
                    test: /\.svg$/i,
                    type: "asset/resource",
                    resourceQuery: /url/,
                    generator: {
                        filename: "static/[hash][ext]",
                    },
                },
                {
                    // Exported as an component <svg></svg>
                    test: /\.svg$/,
                    issuer: /\.tsx?$/,
                    resourceQuery: {not: [/(url|sprite)/]},
                    use: [
                        {
                            loader: "@svgr/webpack",
                            options: {
                                memo: true,
                                svgProps: {
                                    focusable: false,
                                    fill: "currentColor",
                                },
                                prettier: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: "[local]-[hash:base64:6]",
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    importer: new SassAlias({
                                        "@utils": join(
                                            __dirname,
                                            "src",
                                            "utils/sass"
                                        ),
                                    }).getImporter(),
                                },
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
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
            new EnvironmentPlugin(
                Object.keys(
                    dotenv.config({path: `./.${mode}.env`}).parsed || {}
                )
            ),
            new HtmlWebpackPlugin({
                template: `./src/template.html`,
                filename: `./index.html`,
                chunks: ["app"],
                meta: {},
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
        ],

        devServer: {
            hot: true,
            port: 3232,
            historyApiFallback: true,
            static: {
                directory: resolve(__dirname, "static"),
                publicPath: "/static",
            },
        },
    };

    return config;
};

export default webpackConfig;
