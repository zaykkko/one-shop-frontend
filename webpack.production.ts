import {join, basename} from "path";
import {readFileSync} from "fs";
import dotenv from "dotenv";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import {EnvironmentPlugin, BannerPlugin} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SassAlias from "sass-alias";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {SubresourceIntegrityPlugin} from "webpack-subresource-integrity";

import type {Configuration} from "webpack";

const webpackConfig = ({mode}: {mode: "production"}): Configuration => {
    const config = {
        devtool: false as false,

        mode,

        target: "web",

        entry: "./src/app.tsx",

        output: {
            path: join(__dirname, "build"),
            clean: true,
            filename: "[contenthash].js",
            chunkFilename: "[name].[contenthash].js",
            crossOriginLoading: "anonymous" as "anonymous",
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
                    // Exported as an <svg> at the beginning of the <body>
                    test: /\.svg$/,
                    issuer: /\.tsx?$/,
                    resourceQuery: /sprite/,
                    use: [
                        {
                            loader: "svg-sprite-loader",
                            options: {
                                symbolId: (filePath: string) =>
                                    `icon-${basename(filePath).replace(
                                        /\.[^/.]+$/,
                                        ""
                                    )}`,
                            },
                        },
                    ],
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
                    test: /.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                modules: {
                                    localIdentName: "[hash:base64:6]",
                                },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        "postcss-will-change",
                                        "autoprefixer",
                                        "postcss-color-rgba-fallback",
                                        "pixrem",
                                        "cssnano",
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
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
            new EnvironmentPlugin(
                Object.keys(
                    dotenv.config({path: `./.${mode}.env`}).parsed || {}
                )
            ),
            new HtmlWebpackPlugin({
                template: `./src/template.html`,
                filename: `./index.html`,
                chunks: ["app"],
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new BannerPlugin({
                test: /^(?!.*\/node_modules\/).*$/,
                banner: readFileSync("./LICENSE", "utf-8"),
            }),
            new MiniCssExtractPlugin({
                filename: "[contenthash].css",
            }),
            new SubresourceIntegrityPlugin(),
        ], //https://github.com/microsoft/TypeScript/issues/36769#issuecomment-585633004

        optimization: {
            chunkIds: "deterministic" as "deterministic",
            runtimeChunk: {
                name: "runtime",
            },
            splitChunks: {
                chunks: "all" as "all",
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        priority: -10,
                    },
                    default: {
                        name: "app",
                        enforce: true,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };

    return config;
};

export default webpackConfig;
