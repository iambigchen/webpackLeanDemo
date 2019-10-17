require.ensure(['./childCommon/C'], function() {
  var subPageB = require('./childCommon/C')
}, 'C')
export default 'BBBBBBB'
