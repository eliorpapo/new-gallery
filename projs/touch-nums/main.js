'use strict'

var gNums;
var SIZE = 4;
var gLength = 16;
var gTimerInterval;
var gCounter;
var gBoard;

function init() {
    gBoard = buildBoard(SIZE);
    renderBoard(gBoard);
    gCounter = 1;
}


function buildBoard(size) {
    resetNums(gLength);
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            var randomNum = drawNum();
            board[i][j] = randomNum;
        }
    }
    return board;
}

function renderBoard(board) {

    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr> \n`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            strHtml += `<td onclick="cellClicked(this)">${cell}</td> \n`
            console.log(this);
        }
        strHtml += '</tr>'
    }
    var elContainer = document.querySelector('.container');
    elContainer.innerHTML = strHtml;
}

function getEasySize() {
    SIZE = 4;
    gLength = 16;

    gBoard = buildBoard(SIZE);
    resetNums(gLength);
    renderBoard(gBoard)
}

function getMediumSize() {
    SIZE = 5;
    gLength = 25;

    gBoard = buildBoard(SIZE);
    resetNums(gLength);
    renderBoard(gBoard)
}

function getHardSize() {
    SIZE = 6;
    gLength = 36;

    gBoard = buildBoard(SIZE);
    resetNums(gLength);
    renderBoard(gBoard)
}

function cellClicked(cellClicked) {
    if (+cellClicked.innerText === 1) {
        setTimer();
        cellClicked.classList.add('clicked');
    } else if (+cellClicked.innerText === gCounter + 1) {
        cellClicked.classList.add('clicked');
        gCounter++;
        console.log(gCounter);

    }
    checkGameOver();

}

function restartGame(elBtn) {
    init();
    elBtn.style.display = 'none';
    var elSpan = document.querySelector('.timer');
    elSpan.innerText = 'Choose Your Level';
}

function checkGameOver() {
    var elBtn = document.querySelector('.restart');
    if (gCounter === SIZE * SIZE) {
        console.log(gCounter);
        clearInterval(gTimerInterval)
        elBtn.style.display = 'block';

    }
}

function resetNums(gLength) {
    gNums = [];
    for (var i = 1; i <= gLength; i++) {
        gNums.push(i);
    }
    return gNums;
}

function drawNum() {
    var randomIdx = getRndInteger(0, gNums.length - 1);
    var num = gNums[randomIdx];
    gNums.splice(randomIdx, 1);

    return num;
}

function setTimer() {
    var gStartTime = Date.now();
    var elSpan = document.querySelector('.timer');
    gTimerInterval = setInterval(function() {
        var secsPassed = (Date.now() - gStartTime) / 1000;
        elSpan.innerText = secsPassed.toFixed(3);
    }, 1);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}