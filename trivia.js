// Import the readline module to handle user input
const readline = require('readline');

// Array of trivia questions and answers
const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of Japan?", answer: "Tokyo" }
];

// Initialize score and current question index
let score = 0;
let currentQuestionIndex = 0;

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to start the game
function startGame() {
    console.log("Welcome to the Trivia Game! Let's see how much you know.");
    askQuestion(); // Start asking questions
}

// Function to ask questions one by one
function askQuestion() {
    // Check if there are more questions to ask
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        console.log(`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`);

        // Set a timer for answering the question
        const timer = setTimeout(() => {
            console.log("Time's up! Moving to the next question.");
            currentQuestionIndex++; // Move to the next question
            askQuestion(); // Ask the next question
        }, 10000); // 10 seconds to answer

        // Prompt the user for their answer
        rl.question('Your answer: ', (answer) => {
            clearTimeout(timer); // Clear the timer if answered
            validateAnswer(answer); // Validate the user's answer
        });
    } else {
        endGame(); // End the game if all questions have been asked
    }
}

// Function to validate the user's answer
function validateAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    // Check if the answer is correct
    if (answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        console.log("Correct! Well done.");
        score++; // Increment score for correct answer
    } else {
        console.log(`Incorrect! The correct answer was ${currentQuestion.answer}.`);
    }
    currentQuestionIndex++; // Move to the next question
    askQuestion(); // Ask the next question
}

// Function to end the game and display the score
function endGame() {
    console.log(`Game over! Your final score: ${score}/${questions.length}`);
    rl.close(); // Close the readline interface
}

// Start the game when the script is run
startGame();
