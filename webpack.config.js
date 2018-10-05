const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new webpack.HotModuleReplacementPlugin()
    ]
}   