var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GLUE = 'GLUE';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/glue.png" />';

var gBoard;
var gGamerPos;
var glueInterval;
var ballInterval;

var gBallsColected = 0;

function initGame() {
  gGamerPos = { i: 2, j: 9 };
  gBoard = buildBoard();
  renderBoard(gBoard);
  gBallsColected = 0;
  var elBallsColected = document.querySelector('h3');
  elBallsColected.innerText = ``;
  ballInterval = setInterval(createBallRan, 2000);
  glueInterval = setInterval(createGlue, 5000);
  elResBtn = document.querySelector('.reset');
  elResBtn.style.display = 'none';
}

function buildBoard() {
  // Create the Matrix
  var board = createMat(10, 12);

  // Put FLOOR everywhere and WALL at edges
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      // Put FLOOR in a regular cell
      var cell = { type: FLOOR, gameElement: null };

      // Place Walls at edges
      if (
        i === 0 ||
        i === board.length - 1 ||
        j === 0 ||
        j === board[0].length - 1
      ) {
        cell.type = WALL;
      }
      if (
        (i === 0) & (j === 5) ||
        (i === 5) & (j === 0) ||
        (i === 5) & (j === 11) ||
        (i === 9) & (j === 5)
      ) {
        cell.type = FLOOR;
      }

      // Add created cell to The game board
      board[i][j] = cell;
    }
  }

  // Place the gamer at selected position
  board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

  // Place the Balls (currently randomly chosen positions)
  board[3][8].gameElement = BALL;
  board[7][4].gameElement = BALL;

  return board;
}

// Render the board to an HTML table
function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];

      var cellClass = getClassName({ i: i, j: j });

      //  change to short if statement
      cellClass += currCell.type === FLOOR ? ' floor' : ' wall';

      // - Change To template string
      strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`;

      // TODO - change to switch case statement
      switch (currCell.gameElement) {
        case GAMER:
          strHTML += GAMER_IMG;
          break;
        case BALL:
          strHTML += BALL_IMG;
          break;
      }
      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
  var targetCell = gBoard[i][j];
  if (targetCell.type === WALL) return;
  if (targetCell.gameElement === BALL) {
    gBallsColected++;
    var audio = new Audio('sounds/eating.wav');
    audio.play();
    var elBallsColected = document.querySelector('h3');
    elBallsColected.innerText = `Balls : ${gBallsColected} `;
  }
  if (targetCell.gameElement === GLUE) {
    elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add('glued');
    document.querySelector('body').removeAttribute('onkeyup');
    setTimeout(() => {
      document
        .querySelector('body')
        .setAttribute('onkeyup', 'handleKey(event)');
		elCell.classList.remove('glued');
    }, 3000);
  }

  // MOVING from current position
  // Model:
  gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
  // Dom:
  renderCell(gGamerPos, '');

  // MOVING to selected position
  // Model:
  gGamerPos.i = i;
  gGamerPos.j = j;
  gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
  // DOM:
  renderCell(gGamerPos, GAMER_IMG);
  isGameOver();
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
  var cellSelector = '.' + getClassName(location);
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
  var i = gGamerPos.i;
  var j = gGamerPos.j;

  //   if ( || j===0 || i===9|| j===11) {

  //   }
  if (i === 0 && event.key === 'ArrowUp') {
    moveTo(9, 5);
  } else if (i === 9 && event.key === 'ArrowDown') {
    moveTo(0, 5);
  } else if (j === 0 && event.key === 'ArrowLeft') {
    moveTo(5, 11);
  } else if (j === 11 && event.key === 'ArrowRight') {
    moveTo(5, 0);
  } else {
    switch (event.key) {
      case 'ArrowLeft':
        moveTo(i, j - 1);
        break;
      case 'ArrowRight':
        moveTo(i, j + 1);
        break;
      case 'ArrowUp':
        moveTo(i - 1, j);
        break;
      case 'ArrowDown':
        moveTo(i + 1, j);
        break;
    }
  }
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

function createBallRan() {
  var i = getRandomInt(1, 9);
  var j = getRandomInt(1, 11);
  if (!gBoard[i][j].gameElement) {
    gBoard[i][j].gameElement = BALL;
    var ballPos = { i: i, j: j };
    renderCell(ballPos, BALL_IMG);
  }
}

function isGameOver() {
  for (var i = 1; i < gBoard.length - 1; i++) {
    for (var j = 1; j < gBoard[0].length - 1; j++) {
      if (gBoard[i][j].gameElement === BALL) {
        gBoard[i][j].gameElement;
        return false;
      }
    }
  }
  clearInterval(ballInterval);
  clearInterval(glueInterval);
  elResBtn = document.querySelector('.reset');
  elResBtn.style.display = 'block';
  elResBtn.innerText = `Restart`;
  return true;
}

function createGlue() {
  var i = getRandomInt(1, 9);
  var j = getRandomInt(1, 11);
  if (!gBoard[i][j].gameElement) {
    gBoard[i][j].gameElement = GLUE;
    var gluePos = { i: i, j: j };
    renderCell(gluePos, GLUE_IMG);
    setTimeout(function () {
      gBoard[gluePos.i][gluePos.j].gameElement = null;
      // Dom:
      renderCell(gluePos, '');
      renderCell(gGamerPos, GAMER_IMG);
    }, 3000);
  }
}
