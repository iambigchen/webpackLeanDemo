import(/* webpackChunkName: 'subPageA' */ './commonByImport/A').then(A => {
  console.log(A)
})

import(/* webpackChunkName: 'subPageB' */ './commonByImport/B').then(B => {
  console.log(B)
})

export default 'import'