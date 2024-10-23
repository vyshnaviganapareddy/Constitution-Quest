const baseCards = [
    'pic2', 'pic3', 'pic4', 'pic5',
    'pic6', 'pic7', 'pic8', 'union-executive'
];

const maxLevels = 15; // Maximum number of levels
let cards = [...baseCards];
let flippedCards = [];
let matchedPairs = 0;
let level = 1;
let streak = 0;
const maxStreakForPopup = 1; // Number of streaks before showing a pop-up
let levelTimeLimit = 120; // Initial time limit in seconds for each level
let timerId;

document.addEventListener('DOMContentLoaded', () => {
    setupGame();

    // Add event listener to the close button 
    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('info-popup').style.display = 'none';
        });
    }
});

function setupGame() {
    if (level > maxLevels) {
        alert('Congratulations! You completed all levels!');
        return; // End the game if the max level is reached
    }

    const gameBoard = document.getElementById('game-board');
    const levelDisplay = document.getElementById('level');
    const streakDisplay = document.getElementById('streak');

    // Adjust card number and time limit based on the level
    const cardCount = Math.min(level * 8, baseCards.length * 2); // Limit the card count to avoid excessive cards
    cards = baseCards.slice(0, Math.min(cardCount / 2, baseCards.length))
                     .concat(baseCards.slice(0, Math.min(cardCount / 2, baseCards.length)))
                     .sort(() => 0.5 - Math.random());

    gameBoard.innerHTML = ''; // Clear existing cards

    // Create card elements
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const front = document.createElement('div');
        front.classList.add('card-front');
        cardInner.appendChild(front);

        const back = document.createElement('div');
        back.classList.add('card-back');
        const img = document.createElement('img');
        img.src = `images/${card}.jpg`; // Update the src to point to the images folder
        back.appendChild(img);
        cardInner.appendChild(back);

        cardElement.appendChild(cardInner);
        cardElement.dataset.cardType = card;
        cardElement.addEventListener('click', () => flipCard(cardElement));

        gameBoard.appendChild(cardElement);
    });

    levelDisplay.textContent = level;
    streakDisplay.textContent = streak;
    
    // Start or reset the timer for the current level
    startLevelTimer();
}

function flipCard(cardElement) {
    const flipSound = document.getElementById('flip-sound');
    flipSound.play();

    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        gsap.to(cardElement.querySelector('.card-inner'), {
            duration: 0.6,
            rotationY: 180,
            ease: 'power2.inOut'
        });

        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const matchSound = document.getElementById('match-sound');
    const wrongSound = document.getElementById('wrong-sound');
    
    const isMatch = card1.dataset.cardType === card2.dataset.cardType;

    if (isMatch) {
        matchSound.play();
        streak++;
        updateStreakDisplay();
        if (streak >= maxStreakForPopup) {
            showInfoPopup();
            streak = 0; // Reset streak after showing popup
        }
        matchedPairs++;
        flippedCards = [];
    } else {
        wrongSound.play();
        gsap.to(card1.querySelector('.card-inner'), {
            duration: 0.6,
            rotationY: 0,
            ease: 'power2.inOut'
        });
        gsap.to(card2.querySelector('.card-inner'), {
            duration: 0.6,
            rotationY: 0,
            ease: 'power2.inOut'
        });

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 600);
        streak = 0; // Reset streak on mismatch
        updateStreakDisplay();
    }

    if (matchedPairs === cards.length / 2) {
        clearInterval(timerId); // Stop the timer
        setTimeout(() => {
            level++;
            levelTimeLimit = Math.max(10, levelTimeLimit - 5); // Decrease time limit for the next level
            setupGame(); // Setup the new level
        }, 500); // Delay to show level completion
    }
}

function showInfoPopup() {
    const info = getConstitutionArticles();
    const infoText = info[Math.floor(Math.random() * info.length)];
    const popupText = document.getElementById('popup-text');
    popupText.textContent = infoText;
    document.getElementById('info-popup').style.display = 'block';
}

function updateStreakDisplay() {
    const streakDisplay = document.getElementById('streak');
    streakDisplay.textContent = streak;
}

function startLevelTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = levelTimeLimit;

    timerId = setInterval(() => {
        levelTimeLimit--;
        timerDisplay.textContent = levelTimeLimit;

        if (levelTimeLimit <= 0) {
            clearInterval(timerId);
            // Handle timer end, e.g., move to the next level or end the game
            setTimeout(() => {
                level++;
                levelTimeLimit = 120; // Reset time limit for the next level
                setupGame(); // Setup the new level
            }, 500);
        }
    }, 1000);
}

function getConstitutionArticles() {
    



return[
    '🏆 Congratulations! You\'ve won! Unlock your reward: Article 52!\nArticle 52: President of India\nYou’ve unlocked the captain of Team India! The President is the head of the country and symbolizes national unity.',
    '🎉 Victory! You’ve earned Article 53!\nArticle 53: Executive Power\nYou now hold the magic wand! The President has the executive power, but it’s shared with the Council of Ministers.',
    '🎯 Success! Here’s your prize: Article 54!\nArticle 54: Election of President\nSpecial voters’ party alert! The President is elected by MPs and MLAs from all over the country.',
    '🚀 Great Job! You\'ve unlocked Article 55!\nArticle 55: Manner of Election\nIt’s a fair game! The election method ensures everyone gets a fair say in choosing the President.',
    '🎖 Winner! You\'ve got Article 56!\nArticle 56: Term of Office\nThe captain has a 5-year contract! The President serves for five years before the next election.',
    '🏅 Well Played! Article 57 is yours!\nArticle 57: Eligibility for Re-election\nTime for another innings? The President can be re-elected for another term if they wish!',
    '✨ Champion! You’ve unlocked Article 58!\nArticle 58: Qualifications\nTo be the President, you need to be a citizen, 35 years old, and eligible to be a member of Parliament.',
    '💥 Smash Hit! You\'ve earned Article 59!\nArticle 59: Conditions of Office\nThe President stays above politics and focuses on the nation! No double jobs allowed!',
    '🎇 Awesome Win! Here’s Article 60!\nArticle 60: Oath of Office\nThe President promises to uphold the Constitution and keep the country united.',
    '🎁 Bonus Round! Article 61 is yours!\nArticle 61: Impeachment\nRed card! The President can be impeached if they violate the Constitution.',
    '🏆 Victory Bonus! You\'ve unlocked Article 62!\nArticle 62: Time of Election\nNo delays! The next President must be elected on time to ensure continuous leadership.',
    '🏆 Unbeatable! You’ve earned Article 63!\nArticle 63: Vice-President\nMeet the vice-captain! The Vice-President is ready to step in whenever the President needs a hand.',
    '🎉 Big Win! Article 64 is yours!\nArticle 64: VP as Chairman of Rajya Sabha\nThe Vice-President also leads the Upper House, keeping things in order in the Rajya Sabha!',
    '🎯 Skill Unlocked! Article 65!\nArticle 65: VP as Acting President\nThe vice-captain takes charge if the President is unable to perform duties. Ready to lead when needed!',
    '🚀 Next Level! Article 66 is unlocked!\nArticle 66: Election of VP\nThe Vice-President is elected by all the MPs in both Houses of Parliament! A trusted choice for a crucial role.',
    '🎖 Ultimate Win! Article 67!\nArticle 67: Term of VP\nThe vice-captain’s term lasts for 5 years, ready to support the President throughout!',
    '🏅 High Score! Here’s Article 68!\nArticle 68: Election to Fill Vacancy\nNo gaps allowed! If there’s a vacancy, the next VP is elected swiftly to ensure continuity.',
    '✨ Epic Victory! Article 69 is yours!\nArticle 69: Oath of VP\nThe Vice-President pledges to play by the rules, upholding the Constitution in every action.',
    '💥 Power-Up! You\'ve unlocked Article 70!\nArticle 70: Discharge of President’s Functions\nIf both captain and vice-captain are out, another player steps up to lead the team!',
    '🎇 Legendary Win! Article 71!\nArticle 71: Matters Relating to Elections\nIf there’s a dispute about the captain or vice-captain, the Supreme Court resolves it.',
    '🎁 Mega Bonus! Article 72 is yours!\nArticle 72: Pardoning Power\nSecond chance! The President can pardon or reduce sentences, offering a fresh start.',
    '🏆 Elite Player! Article 73 unlocked!\nArticle 73: Extent of Executive Power\nThe President’s powers stretch as far as the Union’s responsibilities go, covering all Union matters.',
    '🎉 Grand Master! Here’s Article 74!\nArticle 74: Council of Ministers\nThe President has a team of ministers to help run the country, making decisions with their advice.',
    '🎯 Master Tactician! Article 75 is yours!\nArticle 75: Appointment of Ministers\nThe President appoints ministers who are like key players in the government team.',
    '🚀 Pro Player! You\'ve earned Article 76!\nArticle 76: Attorney-General\nUnlock the top legal expert! The Attorney-General is the government’s main lawyer and advisor.',
    '🎖 High Achiever! Article 77 is yours!\nArticle 77: Conduct of Business\nAll government work is done in the name of the President, ensuring accountability.',
    '🏅 Ultimate Strategist! Article 78 unlocked!\nArticle 78: Duties of PM\nThe Prime Minister keeps the President informed about everything important, maintaining smooth governance.',
    '🏆 Grand Champion! Article 79 is yours!\nArticle 79: Parliament\nWelcome to the big arena! Parliament is where the rules (laws) of the country are made.',
    '🎉 Legend Status! Article 80 is unlocked!\nArticle 80: Rajya Sabha\nMeet the senior players! The Rajya Sabha is the Upper House, with representatives from the States.',
    '🎯 Supreme Win! Article 81 is yours!\nArticle 81: Lok Sabha\nLok Sabha is the House of the People, where elected representatives debate and pass laws.',
    '🚀 Rising Star! Article 82 is unlocked!\nArticle 82: Readjustment after Census\nScore update! The number of seats in Lok Sabha is adjusted based on population changes.',
    '🎖 Champion of Champions! Article 83 unlocked!\nArticle 83: Duration of Houses\nThe Lok Sabha serves for 5 years, while the Rajya Sabha is a continuous body with staggered elections.',
    '🏅 Heroic Victory! Article 84 is yours!\nArticle 84: Qualification for MPs\nTo join the game as an MP, you must meet certain age and citizenship criteria.',
    '✨ Mastery Level! Article 85 unlocked!\nArticle 85: Sessions of Parliament\nParliament must meet regularly, ensuring continuous legislative work and oversight.',
    '💥 Victorious! You\'ve unlocked Article 86!\nArticle 86: President’s Address\nThe President can call Parliament to meet and address them on important national issues.',
    '🏆 All-Star Win! Article 89 is yours!\nArticle 89: Chairman of Rajya Sabha\nThe Vice-President leads the Rajya Sabha, guiding debates and ensuring fair proceedings.',
    '🎉 Legendary Performance! Article 90 unlocked!\nArticle 90: Deputy Chairman of Rajya Sabha\nIf the Chairman is busy, the Deputy Chairman steps in to keep things running smoothly.',
    '🎯 Power Play! Article 91 is yours!\nArticle 91: Power of Deputy Chairman\nThe Deputy Chairman can take over all duties when the Chairman is not available.',
    '🚀 Ultimate Leader! Article 92 unlocked!\nArticle 92: Vacation of Seats\nMPs can lose their seat if they break the rules or no longer meet the qualifications.',
    '🎖 Hall of Fame! Article 93 is yours!\nArticle 93: Speaker and Deputy Speaker of Lok Sabha\nThe Speaker is the referee of the Lok Sabha, ensuring fair play during debates.',
    '🏅 Unstoppable Force! Article 94 unlocked!\nArticle 94: Removal of Speaker/Deputy Speaker\nIf the Lok Sabha loses confidence in the Speaker or Deputy Speaker, they can be replaced.',
    '✨ Invincible! Article 95 is yours!\nArticle 95: Power of Deputy Speaker\nThe Deputy Speaker steps in whenever the Speaker is unavailable, ensuring continuity.',
    '💥 Grand Win! You\'ve unlocked Article 96!\nArticle 96: Resignation\nMPs can step down from their position if they choose to leave the game.',
    '🎇 Victory Streak! Article 97 is yours!\nArticle 97: Salaries\nMPs receive a salary for their service, ensuring they can focus on their duties.',
    '🎁 Ultimate Streak! Article 98 unlocked!\nArticle 98: Secretariat\nParliament has a support team (Secretariat) to help manage its day-to-day operations.',
    '🏆 Legendary Win! Article 99 is yours!\nArticle 99: Oath by MPs\nBefore starting their duties, MPs take an oath to follow the Constitution and serve the nation.',
    '🎉 Super Victory! Article 100 unlocked!\nArticle 100: Voting in Parliament\nDecisions are made through voting in Parliament, with each MP having a say.',
    '🎯 Top Performance! Article 101 is yours!\nArticle 101: Disqualification\nMPs can be disqualified for not meeting the eligibility criteria or for certain offenses.',
    '🚀 Grand Champion! Article 102 unlocked!\nArticle 102: Disqualifications\nMPs can be disqualified for violating certain rules, ensuring only eligible individuals serve.',
    '🎖 Prime Performer! Article 103 is yours!\nArticle 103: Decision on Disqualifications\nThe President makes the final decision on the disqualification of MPs based on recommendations.',
    '🏅 Unstoppable Achievement! Article 104 unlocked!\nArticle 104: Membership of Parliament\nEnsures MPs fulfill the qualifications and criteria needed to be part of Parliament.',
    '✨ Victory Lap! Article 105 is yours!\nArticle 105: Privileges of Members\nMPs have certain privileges to perform their duties without undue influence or obstruction.',
    '💥 Top Performer! Article 106 unlocked!\nArticle 106: Salaries and Allowances\nThe salary and allowances of MPs are fixed by the government, ensuring fair compensation.',
    '🎇 Epic Win! You\'ve unlocked Article 107!\nArticle 107: Procedure in Parliament\nParliament follows specific procedures for discussions, bills, and passing laws.',
    '🎁 Ultimate Mastery! Article 108 is yours!\nArticle 108: Joint Sessions\nIn case of disagreements, both Houses of Parliament can meet together to resolve issues.',
    '🏆 Supreme Victory! Article 109 unlocked!\nArticle 109: Money Bills\nMoney Bills are introduced in the Lok Sabha and involve government finances and expenditures.',
    '🎉 Final Boss! Article 110 is yours!\nArticle 110: Definition of Money Bills\nDefines what constitutes a Money Bill, focusing on financial matters and taxation.',
    '🎯 Ultimate Reward! Article 111 unlocked!\nArticle 111: President’s Consideration\nThe President reviews Bills and can send them back for reconsideration, ensuring thorough review.',
    '🚀 High Achiever! Article 112 is yours!\nArticle 112: Annual Financial Statement\nThe government presents its financial plans and budget in Parliament through this statement.',
    '🎖 Master Class! Article 113 unlocked!\nArticle 113: Supplementary Grants\nIf additional funds are needed, the government requests supplementary grants from Parliament.',
    '🏅 Epic Achievement! Article 114 is yours!\nArticle 114: Appropriation Bills\nAppropriation Bills ensure that funds are allocated for government spending as approved by Parliament.',
    '✨ Legendary Win! Article 115 unlocked!\nArticle 115: Supplementary Grants\nRequests for additional funding are made through supplementary grants, ensuring sufficient resources.',
    '💥 Ultimate Victory! Article 116 is yours!\nArticle 116: Excess Grants\nHandles cases where funds are overspent and requires approval for additional expenditure.',
    '🎇 Pro Status! Article 117 unlocked!\nArticle 117: Appropriation Bills\nAppropriation Bills provide a detailed plan for government expenditure and are approved by Parliament.',
    '🎁 Champion Achievement! Article 118 is yours!\nArticle 118: Rules of Procedure\nParliament sets its own rules and procedures for conducting business, ensuring orderly proceedings.',
    '🏆 Supreme Player! Article 119 unlocked!\nArticle 119: Powers of Parliament to Enact Laws\nParliament can make laws on various subjects as per the Constitution, shaping the nation’s legal framework.',
    '🎉 Legendary Mastery! Article 120 is yours!\nArticle 120: Language of Parliament\nParliament proceedings can be conducted in any language, with provisions for translation if needed.',
    '🎯 Top Champion! Article 121 is unlocked!\nArticle 121: Immunity of Members\nMPs have immunity for their speech and actions in Parliament, ensuring they can speak freely.',
    '🚀 Final Boss Win! Article 122 is yours!\nArticle 122: Court Immunity\nParliament’s proceedings cannot be challenged in court, ensuring its independence and authority.',
    '🎖 Epic Achievement! Article 123 is unlocked!\nArticle 123: Ordinance Making Power\nThe President can issue ordinances on urgent matters when Parliament is not in session.',
    '🏅 Ultimate Victory! Article 124 is yours!\nArticle 124: Establishment of Supreme Court\nThe Supreme Court is established to ensure justice and uphold the Constitution.',
    '✨ Grand Master! Article 125 is yours!\nArticle 125: Salaries of Supreme Court Judges\nThe salaries of Supreme Court judges are fixed by Parliament to ensure independence and fairness.',
    '💥 High Achiever! Article 126 is unlocked!\nArticle 126: Acting Chief Justice\nIn the absence of the Chief Justice, the senior-most judge acts as the Chief Justice to maintain the Court’s function.',
    '🎇 Victory Lap! Article 127 is yours!\nArticle 127: Additional Judges\nProvision for additional judges in the Supreme Court if required to handle the caseload effectively.',
    '🎁 Top Performer! Article 128 is unlocked!\nArticle 128: Ad-hoc Judges\nThe Supreme Court can appoint ad-hoc judges to assist with specific cases when needed.',
    '🏆 Legendary Champion! Article 129 is yours!\nArticle 129: Supreme Court’s Authority\nThe Supreme Court is the highest authority in the country’s judicial system, ensuring justice and constitutionality.',
    '🎉 Supreme Win! Article 130 is unlocked!\nArticle 130: Seat of Supreme Court\nThe Supreme Court’s seat is located in the national capital, ensuring accessibility and central authority.',
    '🎯 Grand Mastery! Article 131 is yours!\nArticle 131: Original Jurisdiction\nThe Supreme Court can hear cases between States or between the Union and States directly, ensuring justice.',
    '🚀 Final Boss! Article 132 is unlocked!\nArticle 132: Appellate Jurisdiction\nThe Supreme Court hears appeals from lower courts, ensuring fairness and consistency in legal proceedings.',
    '🎖 Pro Victory! Article 133 is yours!\nArticle 133: Appeal to Supreme Court\nProvides the right to appeal to the Supreme Court from any High Court on substantial questions of law.',
    '🏅 Ultimate Master! Article 134 is unlocked!\nArticle 134: Appellate Jurisdiction of High Courts\nHigh Courts can hear appeals from lower courts, ensuring local justice and legal consistency.',
    '✨ Supreme Achiever! Article 135 is yours!\nArticle 135: Jurisdiction and Powers of High Courts\nHigh Courts have jurisdiction and powers over various matters within their respective States.',
    '💥 Grand Win! Article 136 is unlocked!\nArticle 136: Special Leave to Appeal\nThe Supreme Court can grant special leave to appeal in cases of exceptional importance, ensuring justice.',
    '🎇 High Champion! Article 137 is yours!\nArticle 137: Review Jurisdiction\nThe Supreme Court has the power to review its own judgments to correct errors and ensure justice.',
    '🎁 Top Achiever! Article 138 is unlocked!\nArticle 138: Enlargement of Jurisdiction\nThe jurisdiction of the Supreme Court can be expanded by law to address various issues.',
    '🏆 Legendary Master! Article 139 is yours!\nArticle 139: Power to Transfer Cases\nThe Supreme Court can transfer cases from one court to another to ensure fair and impartial trials.',
    '🎉 Final Boss Victory! Article 140 is unlocked!\nArticle 140: Power to Issue Writs\nThe Supreme Court can issue writs to enforce fundamental rights and ensure justice.',
    '🎯 Supreme Champion! Article 141 is yours!\nArticle 141: Law Declared by Supreme Court\nThe law declared by the Supreme Court is binding on all courts, ensuring uniformity in legal interpretation.',
    '🚀 Top Mastery! Article 142 is unlocked!\nArticle 142: Enforcement of Orders\nThe Supreme Court can enforce its orders and decisions, ensuring compliance and justice.',
    '🎖 Ultimate Win! Article 143 is yours!\nArticle 143: Advisory Jurisdiction\nThe Supreme Court can provide advisory opinions to the President on legal matters of national importance.',
    '🏅 Grand Master! Article 144 is unlocked!\nArticle 144: Enforcement of Rights\nAll authorities and courts must enforce the rights guaranteed by the Constitution, ensuring justice.',
    '✨ Final Achievement! Article 145 is yours!\nArticle 145: Rules of Supreme Court\nThe Supreme Court sets its own rules for proceedings, ensuring efficient and fair administration of justice.',
    '💥 Top Victory! Article 146 is unlocked!\nArticle 146: Appointment of Judges\nThe President appoints judges to the Supreme Court and High Courts, ensuring qualified individuals are in place.',
    '🎇 Legendary Achievement! Article 147 is yours!\nArticle 147: Powers of High Court Judges\nHigh Court judges have the power to decide cases based on their jurisdiction and the law.',
    '🎁 Ultimate Mastery! Article 148 is unlocked!\nArticle 148: Comptroller and Auditor General\nThe Comptroller and Auditor General audits government accounts and ensures financial propriety.',
    '🏆 Supreme Master! Article 149 is yours!\nArticle 149: Duties of Comptroller and Auditor General\nThe Comptroller and Auditor General reports on government finances and ensures transparency.',
    '🎉 Final Boss Mastery! Article 150 is yours!\nArticle 150: Uniformity of Accounts\nGovernment accounts must follow uniform standards to ensure consistency and comparability.',
    '🎯 Grand Win! Article 151 is unlocked!\nArticle 151: Report of Comptroller and Auditor General\nThe Comptroller and Auditor General’s reports are presented to Parliament, ensuring accountability.',
    '🚀 Ultimate Achievement! Article 152 is yours!\nArticle 152: Definition of State\nDefines what constitutes a State, ensuring clarity in legal and administrative matters.',
    '🎖 Top Performer! Article 153 is unlocked!\nArticle 153: Governors of States\nEach State has a Governor appointed by the President to oversee its administration and governance.',
    '🏅 Final Boss Win! Article 154 is yours!\nArticle 154: Powers of Governor\nThe Governor has various powers, including legislative and executive functions, to ensure effective State governance.',
    '✨ Legendary Victory! Article 155 is unlocked!\nArticle 155: Appointment of Governor\nThe President appoints the Governor based on recommendations to ensure competent leadership in States.',
    '💥 Ultimate Mastery! Article 156 is yours!\nArticle 156: Tenure of Governor\nThe Governor’s tenure is determined by the President, ensuring stability and continuity in State administration.',
    '🎇 Top Achievement! Article 157 is unlocked!\nArticle 157: Conditions of Governor’s Office\nEnsures the Governor meets the necessary conditions for holding office and performing duties.',
    '🎁 Supreme Champion! Article 158 is yours!\nArticle 158: Oath of Office\nThe Governor takes an oath to uphold the Constitution and perform their duties faithfully.',
    '🏆 Final Mastery! Article 159 is unlocked!\nArticle 159: Duties of Governor\nOutlines the duties of the Governor in ensuring effective State governance and administration.',
    '🎉 Legendary Master! Article 160 is yours!\nArticle 160: Provisions Relating to the Governor\nDetails additional provisions related to the Governor’s role and responsibilities.',
    '🎯 Grand Champion! Article 161 is unlocked!\nArticle 161: Pardoning Powers\nThe Governor has the power to pardon or commute sentences, providing mercy and justice.',
    '🚀 Ultimate Achievement! Article 162 is yours!\nArticle 162: Powers of the Governor to Legislate\nThe Governor can legislate on certain matters in consultation with the President, ensuring effective governance.',
    '🎖 Top Victory! Article 163 is unlocked!\nArticle 163: Council of Ministers\nThe Governor appoints a Council of Ministers to assist in the administration of the State.',
    '🏅 Final Boss Win! Article 164 is yours!\nArticle 164: Chief Minister and Council of Ministers\nThe Chief Minister heads the Council of Ministers, ensuring effective State government operations.',
    '✨ Legendary Mastery! Article 165 is unlocked!\nArticle 165: Powers of Chief Minister\nThe Chief Minister has various powers and responsibilities to ensure smooth functioning of the State government.',
    '💥 Ultimate Achievement! Article 166 is yours!\nArticle 166: State Government Proceedings\nDetails the proceedings and operations of the State Government to ensure transparency and efficiency.',
    '🎇 Top Champion! Article 167 is unlocked!\nArticle 167: Duties of Chief Minister\nOutlines the Chief Minister’s duties in leading the State government and managing its affairs.',
    '🎁 Supreme Mastery! Article 168 is yours!\nArticle 168: State Legislatures\nDetails the structure and functions of State Legislatures, including the Legislative Assembly and Council.',
    '🏆 Final Boss Win! Article 169 is unlocked!\nArticle 169: Creation of State Legislative Councils\nProvides for the creation of Legislative Councils in States, enhancing legislative processes.',
    '🎉 Legendary Achievement! Article 170 is yours!\nArticle 170: Composition of Legislative Assembly\nDetails the composition and structure of the State Legislative Assembly to ensure representation.',
    '🎯 Grand Champion! Article 171 is unlocked!\nArticle 171: Composition of Legislative Council\nOutlines the composition of the State Legislative Council, ensuring effective legislative representation.',
    '🚀 Ultimate Mastery! Article 172 is yours!\nArticle 172: Duration of State Legislatures\nSpecifies the term length of State Legislatures to ensure continuity and stability.',
    '🎖 Top Victory! Article 173 is unlocked!\nArticle 173: Qualifications for Membership\nSets the qualifications required for membership in State Legislatures to ensure capable representation.',
    '🏅 Final Boss Mastery! Article 174 is yours!\nArticle 174: Dissolution of State Legislature\nDetails the procedures for dissolving the State Legislature and calling for fresh elections.',
    '✨ Legendary Achievement! Article 175 is unlocked!\nArticle 175: Powers of State Legislatures\nOutlines the powers and functions of State Legislatures in the governance of the State.',
    '💥 Ultimate Champion! Article 176 is yours!\nArticle 176: Special Address by Governor\nThe Governor can address the State Legislature on special occasions, ensuring communication and transparency.',
    '🎇 Top Performer! Article 177 is unlocked!\nArticle 177: Privileges of Members\nMembers of State Legislatures have certain privileges to ensure effective performance of their duties.',
    '🎁 Supreme Achievement! Article 178 is yours!\nArticle 178: Speaker of Legislative Assembly\nThe Speaker is responsible for maintaining order and conducting proceedings in the Legislative Assembly.',
    '🏆 Final Mastery! Article 179 is unlocked!\nArticle 179: Speaker’s Powers\nDetails the powers and responsibilities of the Speaker to ensure effective functioning of the Legislative Assembly.',
    '🎉 Legendary Win! Article 180 is yours!\nArticle 180: Vacancy of the Office of Speaker\nOutlines the procedures for filling a vacancy in the office of the Speaker to ensure continuity.',
    '🎯 Grand Mastery! Article 181 is unlocked!\nArticle 181: Power of Speaker to Issue Writs\nThe Speaker has the authority to issue writs for maintaining order and ensuring proper functioning of the Assembly.',
    '🚀 Ultimate Achievement! Article 182 is yours!\nArticle 182: Provisions Relating to the Speaker\nDetails additional provisions related to the office and functions of the Speaker.',
    '🎖 Top Champion! Article 183 is unlocked!\nArticle 183: Constitution of Legislative Councils\nProvides for the establishment and functioning of Legislative Councils in States with specific provisions.',
    '🏅 Final Boss Victory! Article 184 is yours!\nArticle 184: Officers of Legislative Councils\nOutlines the roles and responsibilities of officers in the Legislative Councils to ensure smooth operations.',
    '✨ Legendary Mastery! Article 185 is unlocked!\nArticle 185: Powers of Legislative Councils\nDetails the powers and functions of Legislative Councils in the legislative process of States.',
    '💥 Supreme Achievement! Article 186 is yours!\nArticle 186: Special Address by Governor\nThe Governor can address the Legislative Council on special occasions, ensuring effective communication.',
    '🎇 Ultimate Champion! Article 187 is unlocked!\nArticle 187: Prorogation of Legislative Councils\nDetails the procedures for proroguing Legislative Councils to manage legislative sessions.',
    '🎁 Final Mastery! Article 188 is yours!\nArticle 188: Dissolution of Legislative Councils\nOutlines the procedures for dissolving Legislative Councils and conducting fresh elections.',
    '🏆 Legendary Achievement! Article 189 is unlocked!\nArticle 189: Proceedings of Legislative Councils\nDetails the conduct of proceedings in Legislative Councils, ensuring order and efficiency.',
    '🎉 Grand Champion! Article 190 is yours!\nArticle 190: Power to Regulate Procedure\nThe Legislative Assembly has the power to regulate its own procedures, ensuring smooth functioning.',
    '🎯 Ultimate Victory! Article 191 is unlocked!\nArticle 191: Disqualifications of Members\nMembers of the Legislative Assembly can be disqualified for not meeting the eligibility criteria or for certain offenses.',
    '🚀 Top Achievement! Article 192 is yours!\nArticle 192: Decision on Disqualifications\nThe Governor makes the final decision on the disqualification of members based on recommendations.',
    '🎖 Final Mastery! Article 193 is unlocked!\nArticle 193: Vacation of Seats\nSeats in the Legislative Assembly can be vacated in certain circumstances, ensuring effective representation.',
    '🏅 Legendary Mastery! Article 194 is yours!\nArticle 194: Powers of Legislative Assembly\nDetails the powers and functions of the Legislative Assembly, ensuring effective governance.',
    '✨ Grand Champion! Article 195 is unlocked!\nArticle 195: Privileges of Members\nMembers of the Legislative Assembly have certain privileges to ensure the effective performance of their duties.',
    '💥 Ultimate Achievement! Article 196 is yours!\nArticle 196: Procedure for Resolutions\nOutlines the procedures for passing resolutions in the Legislative Assembly to ensure proper governance.',
    '🎇 Top Performer! Article 197 is unlocked!\nArticle 197: Conduct of Business\nDetails the conduct of business in the Legislative Assembly, ensuring order and efficiency.',
    '🎁 Final Boss Mastery! Article 198 is yours!\nArticle 198: Special Address by Governor\nThe Governor can address the Legislative Assembly on special occasions, ensuring effective communication.',
    '🏆 Legendary Mastery! Article 199 is unlocked!\nArticle 199: Committees of the Legislative Assembly\nDetails the committees within the Legislative Assembly and their functions in legislative processes.',
    '🎉 Ultimate Victory! Article 200 is yours!\nArticle 200: Duties of Committees\nOutlines the duties of committees in the Legislative Assembly to ensure effective and efficient legislative processes.',
    '🎯 Final Boss Win! Article 201 is unlocked!\nArticle 201: Appointment of Committees\nDetails the appointment and composition of committees within the Legislative Assembly to ensure effective functioning.',
    '🚀 Legendary Mastery! Article 202 is yours!\nArticle 202: Procedure for Committees\nDetails the procedures for committee operations in the Legislative Assembly to ensure orderly and efficient functioning.',
    '🎖 Grand Mastery! Article 203 is unlocked!\nArticle 203: Powers of Committees\nOutlines the powers and responsibilities of committees within the Legislative'];

}
