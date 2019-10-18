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
          {
            loader: 'style-loader',
            options: { 
              injectType: 'linkTag',
              attributes: {
                id: 'id'
              },
              insert: function(element) {
                var parent = document.querySelector('#box')
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;
                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }
                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          'file-loader'
        ]
      }
    ]
  }
}