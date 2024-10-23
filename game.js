let p1sum = 0;
let p2sum = 0;
let tog = 1; // 1 for player 1 (Red), 2 for player 2 (Yellow)
const rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
const winSound = new Audio('winharpsichord-39642.mp3');

const ladders = {
    1: 38,
    4: 14,
    8: 30,
    21: 42,
    28: 76,
    50: 67,
    71: 92,
    80: 99
};

const snakes = {
    32: 10,
    36: 6,
    48: 26,
    62: 18,
    88: 24,
    95: 56,
    97: 78
};

const ladderPros = {
    1: '🏆 Congratulations! You\'ve won! Unlock your reward: Article 52!\nArticle 52: President of India',
    4: '🎖 Winner! You\'ve got Article 56!\nArticle 56: Term of Office',
    8: '✨ Champion! You’ve unlocked Article 58!\nArticle 58: Qualifications',
    21: '💥 Smash Hit! You\'ve earned Article 59!\nArticle 59: Conditions of Office',
    28: '🎇 Awesome Win! Here’s Article 60!\nArticle 60: Oath of Office',
    50: '🎁 Bonus Round! Article 61 is yours!\nArticle 61: Impeachment',
    71: '🏆 Victory Bonus! You\'ve unlocked Article 62!\nArticle 62: Time of Election',
    80: '🏆 Unbeatable! You’ve earned Article 63!\nArticle 63: Vice-President'
};

const snakeCons = {
    32: '✨ Victory Lap! Article 105 is yours!\nArticle 105: Privileges of Members',
    36: '💥 Top Performer! Article 106 unlocked!\nArticle 106: Salaries and Allowances',
    48: '🎇 Epic Win! You\'ve unlocked Article 107!\nArticle 107: Procedure in Parliament',
    62: '🎁 Ultimate Mastery! Article 108 is yours!\nArticle 108: Joint Sessions',
    88: '🏆 Supreme Victory! Article 109 unlocked!\nArticle 109: Money Bills',
    95: '🎉 Final Boss! Article 110 is yours!\nArticle 110: Definition of Money Bills',
    97: '🎯 Ultimate Reward! Article 111 unlocked!\nArticle 111: President’s Consideration'
};

document.getElementById('diceBtn').addEventListener('click', () => {
    rollingSound.play();
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice').textContent = diceRoll;
    movePlayer(diceRoll);
});

function movePlayer(num) {
    let player = tog === 1 ? 'p1' : 'p2';
    let psum = tog === 1 ? p1sum : p2sum;

    // Move the player
    psum += num;

    // Ensure the sum does not exceed 100
    if (psum > 100) {
        psum = 100;
    }

    // Check for ladder or snake
    if (ladders[psum]) {
        showPopup(ladderPros[psum]);
        psum = ladders[psum];
    } else if (snakes[psum]) {
        showPopup(snakeCons[psum]);
        psum = snakes[psum];
    }

    // Update player's sum
    if (tog === 1) {
        p1sum = psum;
    } else {
        p2sum = psum;
    }

    // Move the player piece
    movePiece(player, psum);

    // Check if the player has won
    if (psum === 100) {
        winSound.play();
        showPopup(`${player === 'p1' ? 'Red' : 'Yellow'} Won !!`);
    } else {
        // Toggle player turn
        tog = tog === 1 ? 2 : 1;

        // Update turn display
        updateTurnDisplay();
    }
}

function updateTurnDisplay() {
    const turnDisplay = document.getElementById('turnDisplay');
    if (tog === 1) {
        turnDisplay.textContent = 'Red Turn';
    } else {
        turnDisplay.textContent = 'Yellow Turn';
    }
}


function movePiece(player, position) {
    let pos = calculatePosition(position);
    console.log(`Moving ${player} to position ${position}, calculated as left: ${pos.left}, top: ${pos.top}`);
    document.getElementById(player).style.transition = 'all 0.5s linear';
    document.getElementById(player).style.left = `${pos.left}px`;
    document.getElementById(player).style.top = `${pos.top}px`;
}

function calculatePosition(num) {
    let x = 0;
    let y = 0;
    let row = Math.floor((num - 1) / 10); // 0-indexed row
    let col = (num - 1) % 10; // 0-indexed column

    // If the row is even, move left to right
    if (row % 2 === 0) {
        x = col * 60;
    } else {
        // If the row is odd, move right to left
        x = (9 - col) * 60;
    }
    y = (9 - row) * 60; // y is calculated from the top of the board

    return { left: x, top: y };
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}
