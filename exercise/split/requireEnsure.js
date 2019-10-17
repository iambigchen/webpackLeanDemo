require.ensure([], function() {
  var _ = require('lodash')
}, 'lodash')

require.ensure(['./common/A'], function() {
  var A = require('./common/A')
}, 'A')

require.ensure(['./common/B'], function() {
  var subPageB = require('./common/B')
}, 'B')