const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './serc/index.html',
        filename: 'index.html',
        chunks: ['main']
    }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install']
      }),
      new WebpackPwaManifest({
        name: 'My PWA',
        short_name: 'My PWA',
        description: 'This is my Progressive Web App!',
        start_url: '.',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [ 96, 128, 192, 256, 384, 512]
          }
        ]
      }),

      new InjectManifest({
       swSrc: './src-sw.js',
       swDest: 'sw.js' 
      })
      
    ],

    module: {
      rules: [
        {
          test: /\.css#/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.mjs$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env']
            }
          }
        }
        
      ],
    },
  };
};
