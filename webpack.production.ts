import {BannerPlugin} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SassAlias from "sass-alias";
import {join} from "path";
import {readFileSync} from "fs";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import {SubresourceIntegrityPlugin} from "webpack-subresource-integrity";
import type {Configuration, WebpackPluginInstance} from "webpack";

const webpackConfig = (): Configuration => {
    const config = {
        devtool: "nosources-source-map",

        output: {
            filename: "[contenthash].js",
            crossOriginLoading: "anonymous" as "anonymous",
        },

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
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
                                ident: "postcss",
                                plugins: [
                                    "postcss-will-change",
                                    [
                                        "autoprefixer",
                                        {
                                            browsers: ["safari >= 9, ie >= 11"],
                                        },
                                    ],
                                    "postcss-color-rgba-fallback",
                                    "pixrem",
                                    "cssnano",
                                ],
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
            new BannerPlugin({
                test: /^(?!.*\/node_modules\/).*$/,
                banner: readFileSync("./LICENSE", "utf-8"),
            }),
            new MiniCssExtractPlugin({
                filename: "[contenthash].css",
            }),
            new SubresourceIntegrityPlugin(),
        ],

        optimization: {
            runtimeChunk: {
                name: "runtime",
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                }) as WebpackPluginInstance,
            ],
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
    };

    return config;
};

export default webpackConfig;
