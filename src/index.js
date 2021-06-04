import './css/a.css';
import './css/b.css';
// import '@babel/polyfill';

const add = (x, y) => x + y; // eslint-disable-next-line 表示eslint检查忽略此行代码后的检测 不建议使用

console.log(add(1, 3));
const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
console.log(promise);
