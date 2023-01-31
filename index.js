//Questions Variable
const questions = [
    {
        question: "How many days makes a week ?",
        optionA: "10 days",
        optionB: "14 days",
        optionC: "5 days",
        optionD: "7 days",
        correctOption: "optionD"
    },

    {
        question: "What is Japan's highest peak?",
        optionA: "Mount Hodaka",
        optionB: "Mount Fuji",
        optionC: "Mount Akaishi",
        optionD: "Mount Ontake",
        correctOption: "optionB"
    },

    {
        question: "Who was the first President of USA ?",
        optionA: "Pulsar",
        optionB: "Meteor",
        optionC: "Comet",
        optionD: "Aurora",
        correctOption: "optionB"
    },

    {
        question: "30 days has ______ ?",
        optionA: "January",
        optionB: "December",
        optionC: "June",
        optionD: "August",
        correctOption: "optionA"
    },

    {
        question: "How many hours in a day?",
        optionA: "30 hours",
        optionB: "38 hours",
        optionC: "48 hours",
        optionD: "24 hours",
        correctOption: "optionD"
    },

    {
        question: "Which of these organisms is at the bottom of the food chain?",
        optionA: "Grasshopper",
        optionB: "Snake",
        optionC: "Rat",
        optionD: "Grass",
        correctOption: "optionD"
    },

    {
        question: "_____ is the hottest Continent on Earth?",
        optionA: "Oceania",
        optionB: "Antarctica",
        optionC: "Africa",
        optionD: "North America",
        correctOption: "optionC"
    },

    {
        question: "Which country is the largest in the world?",
        optionA: "Russia",
        optionB: "Canada",
        optionC: "Africa",
        optionD: "Egypt",
        correctOption: "optionA"
    },

    {
        question: "Which of these numbers is an odd number?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionA"
    },
    
    {
        question: "How many sides has a heptadecagon?",
        optionA: "15",
        optionB: "17",
        optionC: "12",
        optionD: "11",
        correctOption: "optionB"
    },

    {
        question: "What was Meta Platforms Inc formerly known as?",
        optionA: "Facebook",
        optionB: "Twitter",
        optionC: "Myspace",
        optionD: "Vk",
        correctOption: "optionA"
    },
]


let shuffledQuestions = [] 

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    //app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0 
let wrongAttempt = 0 
let indexNumber = 0 

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            questionNumber++
}

        else if (option.checked && option.value !== currentQuestionAnswer) {
    const wrongLabelId = option.labels[0].id
    document.getElementById(wrongLabelId).style.backgroundColor = "red"
    document.getElementById(correctOption).style.backgroundColor = "green"
    wrongAttempt++ //adds 1 to wrong attempts 
    indexNumber++
        questionNumber++
}
    })
}



//Next Button Function
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    if (indexNumber <= 9) {
        NextQuestion(indexNumber)
    }
    else {
        handleEndGame()
    }
    resetOptionBackground()
}

//reset colours of buttons
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecks all buttons for next question
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function when hitting 10 questions
function handleEndGame() {
    let Message = null
    let MessageColor = null

    // player scores
    if (playerScore <= 6) {
        Message = "Try again and see if you can do better!"
        MessageColor = "red"
    }
    else if (playerScore >= 7 && playerScore < 10) {
        Message = "You can do better."
        MessageColor = "red"
    }
    else {
        Message = "10/10 wow! Nice one "
        MessageColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('Messages').innerHTML = Message
    document.getElementById('Messages').style.color = MessageColor
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-model').style.display = "flex"

}

function onWebLoad() {

    document.getElementById('box-model').style.display = "flex"

}

//resets quiz and shuffles questions to make it harder
function closeScoreModel() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-model').style.display = "none"
}

function closeBoxModel() {
    document.getElementById('box-model').style.display = "none"
}