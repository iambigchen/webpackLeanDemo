const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name(file) {
              if (process.env.NODE_ENV === 'development') {
                return '[path][name].[ext]';
              }
              return 'images2/[contenthash].[ext]';
            },
            outputPath(url, resourcePath, context) {
              if (/3\.jpeg/.test(resourcePath)) {
                return `other_output_path/${url}`
              }
              if (/images/.test(context)) {
                return `image_output_path/${url}`;
              }
  
              return `output_path/${url}`;
            },
            publicPath(url, resourcePath, context) {
              if (/my-custom-image\.png/.test(resourcePath)) {
                return `other_public_path/${url}`;
              }
  
              if (/images/.test(context)) {
                return `image_output_path/${url}`;
              }
  
              return `public_path/${url}`;
            },
            emitFile: false,
            context: 'images'
          }
        }]
      }
    ]
  }
}