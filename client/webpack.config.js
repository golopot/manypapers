const common = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [
            ['transform-class-properties'],
            ['transform-react-jsx'],
            ['transform-object-rest-spread'],
          ],
        },
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
}

module.exports = [
  {
    ...common,
    ...{
      target: 'node',
      entry: {
        App: './src/components/App.js',
      },
      output: {
        filename: '[name].js',
        path: `${__dirname}/../dist/js`,
        libraryTarget: 'commonjs2',
      },
    },
  },
  {
    ...common,
    ...{
      target: 'web',
      entry: {
        main: './src/index.js',
      },
      output: {
        filename: '[name].js',
        path: `${__dirname}/../dist/js`,
      },
    },
  },
]
