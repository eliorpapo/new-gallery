'use strict';
var PACMAN = `<img class="pacman" src="imgs/pacman.png" </img>`;

var gPacman;
var gFoodEaten = 0;
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  emptyLocations.push(gPacman.location);
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // : use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  if (nextCellContent === CHERRY) updateScore(10);
  // : return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === POWERFOOD) {
    if (gPacman.isSuper) return;
    superPacman();
    gFoodEaten++;
    if (gFoodEaten === gFoodOnScreen) gamedone();
  }
  if (nextCellContent === FOOD) {
    updateScore(1);
    gFoodEaten++;
    emptyLocations.push(nextLocation);
    if (gFoodEaten === gFoodOnScreen) gamedone();
  }
  // : hitting a ghost?  call gameOver
  if (nextCellContent === GHOST) {
    if (!gPacman.isSuper) {
      var elLose = document.querySelector('.lose');
      elLose.style.display = 'inline-block';
      gameOver();
      return;
    } else deleteGhost(nextLocation);
  }
  // : moving from corrent position:
  // : update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // : update the DOM
  renderCell(gPacman.location, EMPTY);
  // : Move the pacman to new location
  gPacman.location = nextLocation;
  // : update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  // : update the DOM
  renderCell(nextLocation, PACMAN);
}

function getNextLocation(ev) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // : figure out nextLocation
  switch (ev.key) {
    case 'ArrowDown':
      PACMAN = `<img class="pacman pacmanDown" src="imgs/pacman.png" </img>`;
      nextLocation.i++;
      break;
    case 'ArrowUp':
      PACMAN = `<img class="pacman pacmanUp" src="imgs/pacman.png" </img>`;
      nextLocation.i--;
      break;
    case 'ArrowRight':
      PACMAN = `<img class=" pacman pacmanRight" src="imgs/pacman.png" </img>`;
      nextLocation.j++;
      break;
    case 'ArrowLeft':
      PACMAN = `<img class="pacman pacmanLeft" src="imgs/pacman.png" </img>`;
      nextLocation.j--;
      break;
  }
  return nextLocation;
}

function gamedone() {
  var elWin = document.querySelector('.win');
  elWin.style.display = 'inline-block';
  gameOver();
}

function superPacman() {
  gPacman.isSuper = true;
  weakGhosts();
  setTimeout(endSuperMode, 5000);
}

function endSuperMode() {
  gPacman.isSuper = false;
}

