let questionsGenerated = 0
let streak = 0

const generateButton = document.querySelector('.generate-button')
generateButton.addEventListener("click", findQuestionNumber)

// let problem = randomizeProblem()

function findQuestionNumber() {
    questionsGenerated++
    
    let problem = randomizeProblem()
    let equationText = problem[0]

    console.log(findCorrectAnswer(problem));

    appendProblem(questionsGenerated, equationText)
    return problem;
}

function appendProblem(questionNum, equationText){
    const problemDiv = document.createElement('div');
    problemDiv.className = 'problem';

    const textLeftDiv = document.createElement('div');
    textLeftDiv.className = 'text-left'
    problemDiv.appendChild(textLeftDiv);
    
    const questionH3 = document.createElement('h3');
    questionH3.textContent = `QUESTION ${questionNum}`;
    textLeftDiv.appendChild(questionH3);

    const equationH1 = document.createElement('h1');
    equationH1.textContent = `${equationText}`;
    textLeftDiv.appendChild(equationH1);

    const imgDesc = document.createElement('p');
    imgDesc.className = 'img-desc'
    imgDesc.textContent = `Solve for the variable. Do not include any spaces.`
    textLeftDiv.appendChild(imgDesc);

    const attemptsLeft = document.createElement('p');
    attemptsLeft.className = 'img-desc'
    attemptsLeft.id = 'attempts-left'
    attemptsLeft.textContent = `3 attempts left.`
    textLeftDiv.appendChild(attemptsLeft);

    const answerForm = document.createElement('form');

    const answerInput = document.createElement('input');
    answerInput.setAttribute("placeholder", "Your Answer")

    const answerButton = document.createElement('button');
    answerButton.textContent = `Check Answer`

    const generateNewButton = document.createElement('button');
    generateNewButton.textContent = `Generate Another Problem`
    generateNewButton.className = 'generate-button'
    // ideally this shouldn't show until you get the problem right

    answerForm.appendChild(answerInput);
    answerForm.appendChild(answerButton);
    answerForm.appendChild(generateNewButton);

    textLeftDiv.appendChild(answerForm);

    document.body.appendChild(problemDiv);
}

function randomizeProblem() {
    let randomizedCoefficient = Math.floor(Math.random() * 51);
    
    let randomizedVariableKey = Math.floor(Math.random() * 3);
    let randomizedVariable;
    let randomizedSign;

    if (randomizedVariableKey == 0) {
        randomizedVariable = 'x'
    }

    if (randomizedVariableKey == 1) {
        randomizedVariable = 'y'
    }

    if (randomizedVariableKey == 2) {
        randomizedVariable = 'z'
    }

    let randomizedSignKey = Math.floor(Math.random() * 2);

    if (randomizedSignKey == 0) {
        randomizedSign = '+'
    }

    if (randomizedSignKey == 1) {
        randomizedSign = '-'
    }

    let randomizedConstant = Math.floor(Math.random() * 101);

    let randomizedOtherConstant = Math.floor(Math.random() * 101);

    let equationText = `${randomizedCoefficient}${randomizedVariable} ${randomizedSign} ${randomizedConstant} = ${randomizedOtherConstant}`;

    return [equationText, randomizedCoefficient, randomizedVariable, randomizedSign, randomizedConstant,randomizedOtherConstant];
    // Aston told me that I need to return things inside of an array if I want to return multiple variables from inside the function.
}

function findCorrectAnswer(problem) {
    let randomizedCoefficient = problem[1];
    let randomizedVariable = problem[2];
    let randomizedSign = problem[3];
    let randomizedConstant = problem[4];
    let randomizedOtherConstant = problem[5];
    
    let firstStepResult;
    let secondStepResult;

    let correctAnswer;
    if (randomizedSign == '-') {
        signOperation = '+'
        firstStepResult = randomizedConstant + randomizedOtherConstant
        secondStepResult = firstStepResult / randomizedCoefficient
    }
    if (randomizedSign == '+') {
        signOperation = '-'
        firstStepResult = randomizedOtherConstant - randomizedConstant
        secondStepResult = firstStepResult / randomizedCoefficient
    }

    correctAnswer = secondStepResult
    return correctAnswer;
}


function runProgram(){
    // let problem = randomizeProblem()
    // let equationText = problem[0]

    // appendProblem(1, equationText)

    console.log("hello world");
    
    // appendProblem(1, "5x+10=30");
}

document.addEventListener("DOMContentLoaded", runProgram);