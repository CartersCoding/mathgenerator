let questionsGenerated = 0
let totalPoints = 0
let streak = 0
let attemptsLeft = 3
let scoreOutOf = 0;
let scorePercentRounded;
let streaksHistory = [];
let highestStreak = 0;
let grade;

const generateButton = document.querySelector('.generate-button')
generateButton.addEventListener("click", findQuestionNumber)

const viewResultsButton = document.querySelector('.results-button')
viewResultsButton.addEventListener("click", appendResults)

let problem;

function findQuestionNumber() {
    questionsGenerated++;
    
    problem = randomizeProblem()
    let equationText = problem[0]

    // console.log(findCorrectAnswer(problem));

    appendProblem(questionsGenerated, equationText)
    return problem;
}

function appendProblem(questionNum, equationText){
    const problemDiv = document.createElement('div');
    problemDiv.className = 'problem';
    problemDiv.id = `problem${questionNum}`;

    const textLeftDiv = document.createElement('div');
    textLeftDiv.className = 'text-left'
    problemDiv.appendChild(textLeftDiv);
    
    const questionH3 = document.createElement('h3');
    questionH3.id = `questionH3${questionNum}`
    questionH3.textContent = `QUESTION ${questionNum}`;
    textLeftDiv.appendChild(questionH3);

    const equationH1 = document.createElement('h1');
    equationH1.textContent = `${equationText}`;
    textLeftDiv.appendChild(equationH1);

    const imgDesc = document.createElement('p');
    imgDesc.className = `img-desc${questionNum}`
    imgDesc.textContent = `Solve for the variable. Round your answer to the nearest hundredth place.`
    textLeftDiv.appendChild(imgDesc);

    const attemptsLeft = document.createElement('h4');
    attemptsLeft.id = `attempts-left${questionNum}`
    attemptsLeft.className = `attempts-left-class`
    attemptsLeft.textContent = `3 attempts left.`
    textLeftDiv.appendChild(attemptsLeft);

    const answerForm = document.createElement('div');
    answerForm.className = 'problem-form'

    const answerInput = document.createElement('input');
    answerInput.setAttribute("placeholder", "Your Answer")
    answerInput.className = `user-input${questionNum}`

    const answerButton = document.createElement('button');
    answerButton.textContent = `Check Answer`
    //add event listener --> pass in problem as current parameter
    answerButton.addEventListener("click", function(){
        let correctAns = findCorrectAnswer(problem)
        // console.log(correctAns);
        checkAnswer(correctAns, questionNum)
        }
    )

    // const generateNewButton = document.createElement('button');
    // generateNewButton.textContent = `Generate Another Problem`
    // generateNewButton.className = 'generate-button'
    // ideally this shouldn't show until you get the problem right

    answerForm.appendChild(answerInput);
    answerForm.appendChild(answerButton);
    // answerForm.appendChild(generateNewButton);

    textLeftDiv.appendChild(answerForm);

    const problemSection = document.querySelector("#problem-section")

    problemSection.appendChild(problemDiv);
}

function appendResults(questionNum){
        if (questionNum > 1) {
        checkForHighestStreak();
    
        const problemDiv = document.createElement('div');
        problemDiv.className = 'results';
        problemDiv.id = `results`;

        const textLeftDiv = document.createElement('div');
        textLeftDiv.className = 'text-left'
        problemDiv.appendChild(textLeftDiv);
    
        const questionH3 = document.createElement('h3');
        questionH3.textContent = `YOUR RESULTS`;
        textLeftDiv.appendChild(questionH3);

        const scoreH1 = document.createElement('h1');
        scoreH1.textContent = `Score: ${totalPoints}/${scoreOutOf} (${Number(scorePercentRounded)}%)`;
        textLeftDiv.appendChild(scoreH1);

        const streakH1 = document.createElement('h1')
        streakH1.textContent = `🔥 Highest Streak: ${highestStreak}`
        textLeftDiv.appendChild(streakH1)

        if (Number(scorePercentRounded) > 89,  Number(scorePercentRounded) < 100) {
        grade = '✅ A - Mastery Achieved'
        }

        if (Number(scorePercentRounded) > 79, Number(scorePercentRounded) < 90) {
        grade = '📈 B - Getting There'
        }

        if (Number(scorePercentRounded) > 69, Number(scorePercentRounded) < 80) {
        grade = '🫤 C - Not Mastered'
        }

        if (Number(scorePercentRounded) > 59, Number(scorePercentRounded) < 70) {
        grade = '🙁 D - Not Mastered'
        }

        if (Number(scorePercentRounded) < 60) {
        grade = '😞 F - Not Mastered'
        }

        const gradeH1 = document.createElement('h1')
        gradeH1.textContent = `${grade}`
        textLeftDiv.appendChild(gradeH1);

        const imgDesc = document.createElement('p');
        imgDesc.className = `img-desc${questionNum}`
        imgDesc.textContent = `Nice work! Do it again for even more practice!`
        textLeftDiv.appendChild(imgDesc);

        document.body.appendChild(problemDiv);
    }
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

    correctAnswer = secondStepResult.toFixed(2)
    return correctAnswer;
}

function checkAnswer(answer, questionNum) {
    const userAnswer = document.querySelector(`.user-input${questionNum}`);
    console.log(userAnswer)
    const userNumber = Number(userAnswer.value);
    console.log(answer);

    if (userNumber === Number(answer)) {
        console.log('Answer is correct!');

        const problem = document.querySelector(`#problem${questionNum}`);
        problem.style.backgroundColor = 'green';

        const questionH3 = document.querySelector(`#questionH3${questionNum}`);
        questionH3.textContent = `QUESTION ${questionNum} ✅`

        const imgDesc = document.querySelector(`.img-desc${questionNum}`)
        imgDesc.textContent = `Correct! Try the next problem.`
        
        if (questionNum < 10) {
            findQuestionNumber()
        }

        if (questionNum === 10) {
            appendResults(questionNum);
        }

        // totalPoints += attemptsLeft
        // scoreOutOf = questionNum * 3
        totalPoints += 1
        scoreOutOf += 1

        scorePercentRaw = (totalPoints / scoreOutOf) * 100
        scorePercentRounded = scorePercentRaw.toFixed(0)

        console.log(`Total Points: ${totalPoints}`);
        attemptsLeft = 3;
        const score = document.querySelector(`#score`)
        score.textContent = `Score: ${totalPoints}/${scoreOutOf} (${Number(scorePercentRounded)}%)`

        const streakText = document.querySelector("#streak")
        streak += 1
        streakText.textContent = `🔥Streak: ${streak}`

        streaksHistory.push(streak)
        console.log(streaksHistory)
    }

    if (userNumber !== Number(answer)) {
        console.log('Answer is incorrect!');

        const imgDesc = document.querySelector(`.img-desc${questionNum}`)
        imgDesc.textContent = `Incorrect! Try again!`

        attemptsLeft -= 1
        streak = 0
        scoreOutOf += 1

        scorePercentRaw = (totalPoints / scoreOutOf) * 100
        scorePercentRounded = scorePercentRaw.toFixed(0)

        const score = document.querySelector(`#score`)
        score.textContent = `Score: ${totalPoints}/${scoreOutOf} (${Number(scorePercentRounded)}%)`

        const attemptsLeftText = document.querySelector(`#attempts-left${questionNum}`);
        console.log(attemptsLeftText)
        attemptsLeftText.textContent = `${attemptsLeft} attempts left.`
        
        const problem = document.querySelector(`#problem${questionNum}`);
        problem.style.backgroundColor = 'red';

        if (attemptsLeft < 1) {
            attemptsLeftText.textContent = `The correct answer was ${answer}. Try the next problem.`

            if (questionNum < 10) {
                findQuestionNumber();
            }

            if (questionNum === 10) {
                appendResults(questionNum);
            }

            attemptsLeft = 3
        }
    }
}

function checkForHighestStreak() {
    for (let i = 0; i < streaksHistory.length; i++) {
        if (streaksHistory[i] > highestStreak) {
        highestStreak = streaksHistory[i]
        }
    }
}

function appendCalc() {
    const calcDiv = document.createElement('div');
    calcDiv.id = "calc-div"

    const minimizeButton = document.createElement('button');
    minimizeButton.id = "minimize-button"
    minimizeButton.textContent = "Minimize"
    
    const calc = document.createElement('iframe');
    calc.id = "calc"
    calc.setAttribute("width", 219);
    calc.setAttribute("height", 302);
    calc.setAttribute("src", "https://calculator-1.com/outdoor/?f=0433ff&r=000000");
    calc.setAttribute("scrolling", "no");
    calc.setAttribute("frameborder", 0);

    calcDiv.appendChild(minimizeButton);
    calcDiv.appendChild(calc);

    minimizeButton.addEventListener("click", removeCalc)

    document.body.appendChild(calcDiv);
}

function removeCalc() {
    const calcDiv = document.querySelector("#calc-div");
    const calc = document.querySelector("#calc")
    
    document.body.removeChild(calcDiv);
}

function runProgram(){
    // let problem = randomizeProblem()
    // let equationText = problem[0]

    // appendProblem(1, equationText)

    console.log("hello world");

    // const get textbox by id using quereyselct
    //add event listener to it keyup
    //what should be the callback? --> read the event; check if the event.key is the enter

    const calcIcon = document.createElement('img');
    calcIcon.id = "calc-icon"
    calcIcon.setAttribute("width", 75);
    calcIcon.setAttribute("height", 75);
    calcIcon.setAttribute("src", "calc.png");
    document.body.appendChild(calcIcon);

    calcIcon.addEventListener("click", appendCalc);
    
    // appendProblem(1, "5x+10=30");
}

document.addEventListener("DOMContentLoaded", runProgram);