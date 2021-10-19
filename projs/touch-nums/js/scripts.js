var gSize = 0;
var gCount = 1;
const elTime = document.querySelector('.timer');

function getSize(size) {
  gSize = size;
  createNums(gSize);
  createTable(gSize);
}
var gameInterval;

function startTimer() {
  var buttons = document.querySelectorAll('input');
  var start = Date.now();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'none';
  }
  gameInterval = setInterval(function () {
    timer(start);
  }, 1);
}

function timer(start) {
  elTime.innerText = `${(new Date() - start) / 1000}`;
  if (gCount === gSize + 1) clearInterval(gameInterval);
}

function newgame() {
  gSize = 0;
  gCount = 1;
  gNums = [];
  clearInterval(gameInterval);
  var elButtons = document.querySelectorAll('input');
  for (var i = 0; i < elButtons.length; i++) {
    elButtons[i].style.display = 'inline-block';
  }
}

var gNums = [];
function cellClicked(clickedNum) {
  var clickedNumValue = +clickedNum.innerText;
  if (clickedNumValue === 1) startTimer();
  if (clickedNumValue === gCount) {
    gCount++;
    clickedNum.classList.add('pressed');
  }
}

function createTable(gSize) {
  var elTable = document.querySelector('.tablet');
  var strHTML = '<table>';
  var length = Math.sqrt(gSize);
  for (var i = 0; i < length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < length; j++) {
      var currNum = gNums.pop();
      strHTML += ' <td onclick="cellClicked(this)"> ' + currNum + '</td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</table>';
  elTable.innerHTML = strHTML;
}

function createNums(size) {
  gNums = [];
  for (var i = 1; i < size + 1; i++) {
    gNums.push(i);
  }
  shuffle(gNums);
  return gNums;
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
