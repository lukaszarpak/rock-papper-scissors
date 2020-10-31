const game = {
    playerChoice: 0,
    aiChoice: 0,
}

const gameSummary = {
    counts: 1,
    wins: 0,
    losses: 0,
    draws: 0,
}

const aiCommentsArray = ['Need some water?', "Let's play again!", "Can you beat me?", "I'm just AI!"];
const choiceBtn = [...document.querySelectorAll('.player-choice button')];
const rulesBtn = document.querySelector('button.rulls');
const rulesBcg = document.querySelector('.rulesBcg');
const rulesMenu = document.querySelector('.rulesMenu');
const exitRulesBtn = document.querySelector('.fa-times');

function choiceSelection() {
    game.playerChoice = this.dataset.option;
    const clearingImg = [...document.querySelectorAll('img')];
    clearingImg.forEach(item => item.classList.remove('active'))
    const clearingI = [...document.querySelectorAll('.top section i')];
    clearingI.forEach(item => item.className = 'far');
}

function aiChoice() {
    return choiceBtn[Math.floor(Math.random() * 3)].dataset.option;
}

function resultCheck(playerChoice, aiChoice) {
    if (game.playerChoice === game.aiChoice) {
        return 'draw';
    } else if ((game.playerChoice === 'paper' && game.aiChoice === 'rock') || (game.playerChoice === 'rock' && game.aiChoice === 'scissors') || (game.playerChoice === 'scissors' && game.aiChoice === 'paper')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function resultPublish(gameResult) {
    document.querySelector('.round span').textContent = ++gameSummary.counts;

    if (gameResult === 'draw') {
        document.querySelector('.ties span').textContent = ++gameSummary.draws;
    } else if (gameResult === 'win') {
        document.querySelector('.wins span').textContent = ++gameSummary.wins;
    } else {
        document.querySelector('.losses span').textContent = ++gameSummary.losses;
    }
}

function releaseImg(player, ai) {
    if (player === 'paper') {
        document.querySelector('.left img').src = "img/paper.jpg";
        document.querySelector('.left img').classList.toggle('active');
        document.querySelector('.top section i:first-child').classList.toggle('fa-hand-paper');
    } else if (player === 'scissors') {
        document.querySelector('.left img').src = "img/scissors.jpg";
        document.querySelector('.left img').classList.toggle('active');
        document.querySelector('.top section i:first-child').classList.toggle('fa-hand-scissors');
        document.querySelector('.top section i:first-child').classList.toggle('fa-rotate-180');
    } else {
        document.querySelector('.left img').src = "img/rock.jpg";
        document.querySelector('.left img').classList.toggle('active');
        document.querySelector('.top section i:first-child').classList.toggle('fa-hand-rock');
    }

    if (ai === 'paper') {
        document.querySelector('.right img').src = "img/paper.jpg";
        document.querySelector('.right img').classList.toggle('active');
        document.querySelector('.top section i:last-child').classList.toggle('fa-hand-paper');
        document.querySelector('.top section i:last-child').classList.toggle('fa-flip-horizontal');
    } else if (ai === 'scissors') {
        document.querySelector('.right img').src = "img/scissors.jpg";
        document.querySelector('.right img').classList.toggle('active');
        document.querySelector('.top section i:last-child').classList.toggle('fa-hand-scissors');
    } else {
        document.querySelector('.right img').src = "img/rock.jpg";
        document.querySelector('.right img').classList.toggle('active');
        document.querySelector('.top section i:last-child').classList.toggle('fa-hand-rock');
        document.querySelector('.top section i:last-child').classList.toggle('fa-flip-horizontal');
    }
    document.querySelector('.top section span').textContent = `#${gameSummary.counts}`;
    document.querySelector('.bottom section span').textContent = `#${gameSummary.counts}`;
}

function aiComments() {
    document.querySelector('.bottom section p').textContent = aiCommentsArray[Math.floor(Math.random() * aiCommentsArray.length)];
}


function gameStart() {
    if (!game.playerChoice) {
        return alert('Make a choice!');
    }
    console.log(`Player's choice:        ${game.playerChoice}`)
    game.aiChoice = aiChoice();
    console.log(`Computer's choice:      ${game.aiChoice}`);
    const gameResult = resultCheck(game.playerChoice, game.aiChoice);
    console.log(`Player's score:         ${gameResult}`);
    releaseImg(game.playerChoice, game.aiChoice);
    console.log(gameSummary.counts);
    aiComments();
    resultPublish(gameResult);
}

choiceBtn.forEach(choice => choice.addEventListener('mousedown', choiceSelection));
choiceBtn.forEach(choice => choice.addEventListener('mouseup', gameStart));



function rulesFunction() {
    rulesBcg.classList.add('active');
    rulesMenu.classList.add('active');
}

function rulesExit() {
    rulesBcg.classList.remove('active');
    rulesMenu.classList.remove('active');
}

rulesBtn.addEventListener('click', rulesFunction);
exitRulesBtn.addEventListener('click', rulesExit);
rulesBcg.addEventListener('click', rulesExit)