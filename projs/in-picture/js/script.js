var gQuests = [
  {
    id: 1,
    opts: ['Spain', 'United States', 'France', 'Germany'],
    correctOptIndex: 2,
  },
  { id: 2, opts: ['	China', 'Mexico', '	Russia', 'Italy'], correctOptIndex: 3 },
  { id: 3, opts: ['Austria', 'Egypt', 'France', 'Turkey'], correctOptIndex: 1 },
  {
    id: 4,
    opts: ['India', 'Malaysia', 'Greece', 'United States'],
    correctOptIndex: 0,
  },
];

var gCurrQuestIdx = 0;

// function createQuests(numOfques) {
//   for(var i = 1 ; i <= numOfques ; i++){
//     var opts=[]
//     var correctOptIndex = 0
//     createQuest(i,opts,correctOptIndex)
//   }
// }

// function createQuest(i,opts,correctOptIndex){
//   var quest = {
//     id:i, opts:opts,correctOptIndex:correctOptIndex
//   }
// }

function init() {
  nextQuestion();
}

function reset() {
  gCurrQuestIdx = 0;
  nextQuestion();
}

function Victorious() {
  var elImg = document.querySelector('.img');
  elImg.innerHTML = `<h2>Victorious!!</h2>`;
  var elOpts = document.querySelector('.options');
  elOpts.innerHTML = `<button class="reset" onclick="reset()">Restart?</button>`;
}

function isAnswer(elBtn) {
  var chosenOpt = +elBtn.dataset.optidx;
  var rightOpt = gQuests[gCurrQuestIdx].correctOptIndex;
  if (chosenOpt === rightOpt) {
    gCurrQuestIdx++;
    gCurrQuestIdx === gQuests.length ? Victorious() : nextQuestion();
  } else alert('Are you stupid??');
}
function nextQuestion() {
  nextImg();
  nextOpts();
}

function nextImg() {
  var elImg = document.querySelector('.img');
  elImg.innerHTML = `<img src="imgs/img${gCurrQuestIdx}.jpeg"></img>`;
}

function nextOpts() {
  var loops = gQuests[gCurrQuestIdx].opts.length;
  var elOpts = document.querySelector('.options');
  var strHtml = '';
  for (var i = 0; i < loops; i++) {
    var currOpt = gQuests[gCurrQuestIdx].opts[i];
    strHtml += `<button onclick="isAnswer(this)" data-OptIDX="${i}">${currOpt}</button>`;
    if ((i + 1) % 2 === 0) strHtml += `<br></br>`;
  }
  elOpts.innerHTML = strHtml;
}
