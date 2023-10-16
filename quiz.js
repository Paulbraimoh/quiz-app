const questions = [{
    question : "Who is the first player to win balon d'or?",
    answers :[
        {text: " Bobby charlton", correct: "false"},
        {text: " Alfred Di Stefano", correct: "false"},
        {text: " Stanley Matthews", correct: "true"},
        {text: " Eusebio", correct: "false"},
    ]
},
{
    question : "Where was football originated from?",
    answers :[
        {text: " England", correct: "false"},
        {text: " China", correct: "true"},
        {text: " Spain", correct: "false"},
        {text: " France", correct: "false"},
    ]
},
{
    question : "Who has scored the most goals in a calendar year?",
    answers :[
        {text: " Lionel Messi", correct: "true"},
        {text: " Cristiano Ronaldo", correct: "false"},
        {text: " Luis suarez", correct: "false"},
        {text: " Godffrey Chitalu", correct: "false"},
    ]
},
{
    question : "What is the most goals scored in a professional match?",
    answers :[
        {text: " 149", correct: "true"},
        {text: " 175", correct: "false"},
        {text: " 200", correct: "false"},
        {text: " 185", correct: "false"},
    ]
},
{
    question : "The longest football match lasted for how may days?",
    answers :[
        {text: " 4 days", correct: "false"},
        {text: " 2 days", correct: "false"},
        {text: " 6 days", correct: "false"},
        {text: " 3 days", correct: "true"},
    ]
},
{
    question : "Which is the oldest football club?",
    answers :[
        {text: " Real madrid", correct: "false"},
        {text: " AC milan", correct: "false"},
        {text: " Sheffield Wednesday", correct: "true"},
        {text: " Manchester United", correct: "false"},
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let  currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
          selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML ="Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton ();
    }
    else{
        startQuiz();
    }
})

startQuiz();