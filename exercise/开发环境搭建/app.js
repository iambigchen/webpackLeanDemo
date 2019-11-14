import axios from 'axios'
import './index.css'
import B from './B.js'
const a = 1;
const b = 2;
const c = 1;

console.log(a,b,c, B)

axios.get('/api/seller').then(res => {
  console.log(res)
})

axios.get('/api/ratings').then(res => {
  console.log(res)
})

if (module.hot) {
   module.hot.accept('./B.js', function() {
     console.log('Accepting the updated printMe module!');
   })
 }

axios.get('/comments/show', {
  id: '4193586758833502',
  page: 1
}).then(res => {
  console.log(res)
})