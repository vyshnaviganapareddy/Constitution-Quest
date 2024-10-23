document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    let optionSelected = false;
    let greetingsStep = 0;

    // Define the conversation steps
    const greetings = [
        "Person 1: Hi there! I'm having some trouble understanding constitutional matters. Can you help me out?",
        "Person 2: Of course! I'd be happy to help. What do you need to know?",
        "Person 1: Well, I'm not sure whom to approach for specific constitutional issues. Can you guide me?",
        "Person 2: Absolutely! Let’s start with your first concern."
    ];

    const questions = [
        "Who should I contact if I need to raise a concern about the functioning of State Governments?",
        "Great! Now, if I want to discuss issues regarding the Prime Minister's role, who should I reach out to?",
        "Perfect! Finally, who should be approached for matters related to the President's powers?"
    ];

    // Define the options and their corresponding advice
    const options = [
        {
            text: "Contact the State Legislative Assembly",
            isCorrect: true,
            followUp: "Can you tell me more about how to approach the State Legislative Assembly for such matters?"
        },
        {
            text: "Reach out to the Ministry of Home Affairs",
            isCorrect: false,
            followUp: "Actually, this is not the correct contact. The right contact is the State Legislative Assembly."
        },
        {
            text: "Contact the Prime Minister's Office",
            isCorrect: false,
            followUp: "This is not correct. For State Governments, you should contact the State Legislative Assembly."
        }
    ];

    const person1Message = document.getElementById('person1-message');
    const person2Message = document.getElementById('person2-message');
    const optionsDiv = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');

    function displayGreeting() {
        if (greetingsStep < greetings.length) {
            if (greetingsStep % 2 === 0) {
                person1Message.textContent = greetings[greetingsStep];
                person2Message.textContent = "";
            } else {
                person2Message.textContent = greetings[greetingsStep];
                person1Message.textContent = "";
            }
            greetingsStep++;
            nextButton.style.display = 'block'; // Show the Next button
        } else {
            // Start the main conversation
            currentStep = 0;
            person1Message.textContent = questions[currentStep];
            nextButton.style.display = 'none'; // Hide the Next button initially
            showOptions();
        }
    }

    function showOptions() {
        optionsDiv.style.display = 'block';
        document.getElementById('option1').textContent = options[0].text;
        document.getElementById('option2').textContent = options[1].text;
        document.getElementById('option3').textContent = options[2].text;

        document.getElementById('option1').onclick = () => handleOptionSelection(0);
        document.getElementById('option2').onclick = () => handleOptionSelection(1);
        document.getElementById('option3').onclick = () => handleOptionSelection(2);

        optionSelected = false;
    }

    function handleOptionSelection(optionIndex) {
        if (optionSelected) return;

        if (options[optionIndex].isCorrect) {
            person2Message.textContent = "That's correct!";
            nextButton.style.display = 'block'; // Show the Next button
        } else {
            person2Message.textContent = options[optionIndex].followUp;
            optionsDiv.style.display = 'none';
            nextButton.style.display = 'block'; // Show the Next button
        }

        optionSelected = true;
    }

    function proceedToNext() {
        if (greetingsStep < greetings.length) {
            displayGreeting();
        } else if (currentStep < questions.length) {
            person1Message.textContent = questions[currentStep];
            person2Message.textContent = "";
            showOptions();
            nextButton.style.display = 'none'; // Hide the Next button initially
        } else {
            person2Message.textContent = "You've answered all questions! If you need further help, just ask.";
            optionsDiv.style.display = 'none';
            nextButton.style.display = 'none'; // Hide the Next button
        }
    }

    nextButton.addEventListener('click', proceedToNext);

    // Start the conversation with greetings
    displayGreeting();
});
