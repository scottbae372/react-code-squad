function init() {
  console.log("hello counter.js");
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
  onEvents();
}

function chageVal(v) {
  const cntValNode = document.querySelector(".count-value");
  let cntValNodeVal = +cntValNode.innerText;
  cntValNodeVal += v;
  cntValNode.innerText = cntValNodeVal;
}

function leftBtnHandler() {
  chageVal(-1);
}

function rightBtnHandler() {
  chageVal(1);
}

function onEvents() {
  const leftBtn = document.querySelector(".left");
  leftBtn.addEventListener("click", leftBtnHandler);
  const rightBtn = document.querySelector(".right");
  rightBtn.addEventListener("click", rightBtnHandler);
}

document.addEventListener("DOMContentLoaded", init);
// "DOMContentLoaded" 이벤트 이후 init호출 되도록
