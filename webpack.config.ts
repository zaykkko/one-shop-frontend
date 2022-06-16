import {join, basename} from "path";
import dotenv from "dotenv";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import {EnvironmentPlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {merge} from "webpack-merge";

import type {Configuration} from "webpack";

const webpackConfig = async (
    {mode} = {mode: "production"}
): Promise<Configuration> => {
    const config = {
        mode,

        target: "web",

        entry: {
            app: "./src/app.tsx",
        },

        output: {
            clean: true,
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
                    // Exported as an <svg> at the beginning of the <body>
                    test: /\.svg$/,
                    issuer: /\.tsx?$/,
                    resourceQuery: /sprite/,
                    use: [
                        {
                            loader: "svg-sprite-loader",
                            options: {
                                symbolId: (filePath: string) =>
                                    `icon-${basename(filePath)}`,
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
            ],
        },

        plugins: [
            new EnvironmentPlugin(Object.keys(dotenv.config().parsed || {})),
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
        ], //https://github.com/microsoft/TypeScript/issues/36769#issuecomment-585633004
    };

    const envConfig = await import(`./webpack.${mode}`);

    return merge(config, envConfig.default);
};

export default webpackConfig;
