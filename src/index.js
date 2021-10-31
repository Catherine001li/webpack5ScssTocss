// import 'style-loader!css-loader!./index.css'
import './index.css'
import './index2.css'
import './index3.scss'
// import imgSrc from './assets/img.png'

function comp() {
  const el = document.createElement('div');

  el.innerHTML = '<i>你好, X1AXX1A45436357</i>'
  // console.log('---打印内容---', imgSrc)

  return el;
}

console.log([1, 2, 3].findIndex(x => x === 4))
console.log('abc'.padStart(10))

document.body.appendChild(comp());
