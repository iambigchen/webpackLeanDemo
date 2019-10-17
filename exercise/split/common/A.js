require.ensure([], function() {
  var _ = require('lodash')
}, 'lodash')
require.ensure(['./B'], function() {
  var subPageB = require('./B')
}, 'B')
require.ensure(['./childCommon/C'], function() {
  var subPageB = require('./childCommon/C')
}, 'C')
export default 'AAAAAAAAA'