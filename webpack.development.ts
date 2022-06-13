import SassAlias from "sass-alias";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {join, resolve} from "path";

export default {
    devtool: "eval",

    output: {
        filename: "[name].[contenthash].js",
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]-[hash:base64:6]",
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
    ],

    devServer: {
        hot: true,
        port: 3232,
        historyApiFallback: true,
        static: {
            directory: resolve(__dirname, "static"),
            publicPath: "/assets",
        },
    },
};
