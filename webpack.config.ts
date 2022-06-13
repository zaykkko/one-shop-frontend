import {join} from "path";
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
