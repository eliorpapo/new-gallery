"use strict"

var gCurrQuestIdx = 0;
var gQuests = [
    { id: 1, opts: ['Radiohead', 'Muse'], correctOptIndex: 0 },
    { id: 2, opts: ['Air', 'Massive Attack'], correctOptIndex: 0 },
    { id: 3, opts: ['Nirvana', 'Foo Fighters'], correctOptIndex: 1 },
    { id: 4, opts: ['Pearl Jam', 'Temple Of The Dog'], correctOptIndex: 0 },
    { id: 5, opts: ['Guns N\' Roses', 'Metallica'], correctOptIndex: 1 },
    { id: 6, opts: ['Franz Ferdinand', 'Arctic Monkeys'], correctOptIndex: 1 },
    { id: 7, opts: ['Queens Of The Stone Age', 'Alice In Chains'], correctOptIndex: 0 },
    { id: 8, opts: ['Motley Crue', 'ACD/DC'], correctOptIndex: 0 },
    { id: 9, opts: ['Stone Temple Pilots', 'Faith No More'], correctOptIndex: 1 }
];


function initGame() {
    renderQuest();
}

function renderQuest() {

    if (gCurrQuestIdx !== gQuests.length) {
        var strHtml = '';
        strHtml += `<img src="images/image${gQuests[gCurrQuestIdx].id}.jpg" alt=""><br> \n`
        for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
            strHtml += `<button onclick="checkAnswer(${i})" >${gQuests[gCurrQuestIdx].opts[i]}</button> `
        }
        var elContainer = document.querySelector('.container');
        elContainer.innerHTML = strHtml;
    }
}

function checkAnswer(optIdx) {
    var correctAnswer = gQuests[gCurrQuestIdx].correctOptIndex;
    if (optIdx === correctAnswer) {
        gCurrQuestIdx++;
        renderQuest();
    }
    if (gCurrQuestIdx === gQuests.length) {
        gameOver();
    }
    initGame();
}

function gameOver() {
    var elBtn = document.querySelector('.btn');
    elBtn.style.visibility = 'visible';
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'WELL DONE, YOU ROCKED IT 😎🤘🏻'
    elH1.style.color = 'firebrick';
    var elH2 = document.querySelector('h2');
    elH2.style.visibility = 'hidden';

}

function restartGame(elBtn) {
    gCurrQuestIdx = 0;
    initGame();
    elBtn.style.visibility = 'hidden'
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Guess The Band'
    elH1.style.color = 'white';
    var elH2 = document.querySelector('h2');
    elH2.style.visibility = 'visible';
}