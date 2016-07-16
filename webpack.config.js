var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
//noinspection JSUnresolvedVariable
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    entry: {
        'vendor': [
            // Polyfills
            'core-js/es6',
            'core-js/es7/reflect',
            'zone.js/dist/zone',
            'zone.js/dist/long-stack-trace-zone',
            // Angular2
            '@angular/common',
            '@angular/forms',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/router',
            '@angular/http',
            // RxJS
            'rxjs',
            // JWT (auth)
            'angular2-jwt'
        ],
        'app': [
            './src/main/webapp/typescript/index.ts'
        ]
    },
    // Config for our build files
    output: {
        path: __dirname + '/src/main/webapp/app',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[name].chunk.[id].js'
    },
    resolve: {
        root: __dirname,
        extensions: [
            '',
            '.ts',
            '.js',
            '.json',
            '.css',
            '.html'
        ]
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader'
            }
        ],
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 Duplicate identifier
                        2304, // 2304 Cannot find name
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
            },
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },
            // Support for .html as raw text
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        noParse: [
            /zone\.js\/dist\/.+/,
            /reflect-metadata/,
            /es(6|7)-.+/,
            /.zone-microtask/,
            /.long-stack-trace-zone/
        ]
    },
    plugins: [
        new CommonsChunkPlugin(
            {
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: Infinity
            }
        ),
        new CommonsChunkPlugin(
            {
                name: 'common',
                filename: 'common.js',
                minChunks: 2,
                chunks: ['app', 'vendor']
            }
        )
    ],
    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    // Webpack Development Server config
    devServer: {
        historyApiFallback: true,
        publicPath: '/app/',

        // proxy: {
        //     '/proxy/*': {
        //         target: 'http://192.168.100.166:8280/cloud-catalog-gui/',
        //         secure: false
        //     }
        // }
    }
};
