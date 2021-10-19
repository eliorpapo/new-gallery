'use strict';
const WALL = '⬜';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🍔';
const CHERRY = `🍒`;

var emptyLocations = [];
var cherryInterval;

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};

var gFoodOnScreen = -1;

function init() {
  gFoodOnScreen = -1;
  emptyLocations = [];
  gGhostsColors = [];
  placeCherries();
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gGame.score = 0;
  gFoodEaten = 0;
  gPacman.isSuper = false;
  var elBtn = document.querySelector('.restart');
  elBtn.style.display = 'none';
  var elWin = document.querySelector('.win');
  elWin.style.display = 'none';
  var elLose = document.querySelector('.lose');
  elLose.style.display = 'none';
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodOnScreen++;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gFoodOnScreen--;
      }
      if (
        (i === 1 && j === 1) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2) ||
        (i === 1 && j === SIZE - 2)
      ) {
        board[i][j] = POWERFOOD;
      }
    }
  }
  return board;
}

// update model and dom
function updateScore(diff) {
  //model
  gGame.score += diff;

  //dom
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

function gameOver() {
  console.log('Game Over');
  clearInterval(cherryInterval);
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elBtn = document.querySelector('.restart');
  elBtn.style.display = 'inline-block';
}

function placeCherries() {
  cherryInterval = setInterval(() => {
    if (emptyLocations.length !== 0) {
      var ranIdx = getRandomIntInclusive(0, emptyLocations.length - 1);
      var CherryLoc = emptyLocations[ranIdx];
      if (
        CherryLoc.i === gPacman.location.i &&
        CherryLoc.j === gPacman.location.j
      )
        return;
      emptyLocations.splice(ranIdx, 1);
      gBoard[CherryLoc.i][CherryLoc.j] = CHERRY;
      // : update the DOM
      renderCell(CherryLoc, CHERRY);
    }
  }, 15000);
}

// function getWallHTML() {
//   return `<span style="color:blue;">${WALL}</span>`;
// }
