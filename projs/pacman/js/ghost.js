'use strict';
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;
var gGhostsColors = [];

// 3 ghosts and an interval
function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
    isDead: false,
    color: getRandomColor(),
  };
  gGhostsColors.push(ghost.color);
  gGhosts.push(ghost);
  //   board[ghost.location.i][ghost.location.j] = GHOST;
  board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}

// : loop through ghosts
function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    moveGhost(gGhosts[i]);
  }
}
// : figure out moveDiff, nextLocation, nextCell
function moveGhost(ghost) {
  if (ghost.isDead) return;
  // { i: 0, j: 1 }
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

  // : return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === GHOST) return;
  // : hitting a pacman?  call gameOver
  if (nextCellContent === PACMAN) {
    if (!gPacman.isSuper) {
      var elLose = document.querySelector('.lose');
      elLose.style.display = 'inline-block';
      gameOver();
      return;
    } else {
      //   gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
      //   renderCell(ghost.location, ghost.currCellContent);
      ghost.location = nextLocation;
      deleteGhost(ghost.location);
      return;
    }
  }
  // : moving from corrent position:
  // : update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // : update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // : Move the ghost to new location
  ghost.currCellContent = nextCellContent;
  ghost.location = nextLocation;
  // : update the model
  gBoard[nextLocation.i][nextLocation.j] = GHOST;
  // : update the DOM
  renderCell(nextLocation, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(1, 100);
  if (randNum <= 25) {
    return { i: 0, j: 1 };
  } else if (randNum <= 50) {
    return { i: -1, j: 0 };
  } else if (randNum <= 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  return `<span style="color:${ghost.color};">${GHOST}</span>`;
}

function weakGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    weakGhost(ghost);
  }
  ghostsToNormal();
}

function weakGhost(ghost) {
  ghost.color = `blue`;
  renderCell(ghost.location, getGhostHTML(ghost));
}

function ghostsToNormal() {
  setTimeout(() => {
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = gGhostsColors[i];
      gGhosts[i].isDead = false;
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
  }, 5000);
}

function deleteGhost(location) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === location.i &&
      gGhosts[i].location.j === location.j
    ) {
      gGhosts[i].isDead = true;
      return;
    }
  }
}
