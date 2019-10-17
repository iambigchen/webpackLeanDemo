const a = 1
let b = 2
let c = () => {
  console.log(a, b);
}

const d = new Symbol()

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

const f = () => {
  return Promise.resolve(1)
}