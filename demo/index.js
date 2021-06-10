var currentQuestionId = null
var score = 0
var lives = 3
var clickable = true
var topScore = 26

window.addEventListener('load', function () {

    document.getElementById("score").innerHTML = score
    document.getElementById("lives").innerHTML = lives
    getNewQuestion()

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function () {
            if (clickable) {

                clickable = false

                document.getElementById("question-wrapper").style.display = "none"

                if (button.id == "right") {
                    var answerId = 1
                }
                else if (button.id == "left") {
                    var answerId = 0
                }

                sendAnswer(currentQuestionId, answerId)

            }
        })
    })

    // Listen for next button clicked
    document.getElementById('next-question-button').addEventListener('click', function (event) {
        document.getElementById("question-wrapper").style.display = "none"
        document.getElementById("answer-wrapper").style.display = "none"
        document.getElementById("score").innerHTML = score
        document.getElementById("lives").innerHTML = lives
        getNewQuestion()
    })

    // Listen for reset game button being clicked
    document.getElementById('reset-button').addEventListener('click', function (event) {
        score = 0
        lives = 3
        document.getElementById("answer-wrapper").style.display = "none"
        document.getElementById("next-question-button").style.display = ""
        document.getElementById("game-over-wrapper").style.display = "none"
        document.getElementById("score").innerHTML = score
        document.getElementById("lives").innerHTML = lives
        getNewQuestion()
    })

})


function getNewQuestion() {

    const comment = data[Math.floor(Math.random() * data.length)];
    currentQuestionId = comment.id
    document.getElementById("loader-wrapper").style.display = "none"
    document.getElementById("answer-wrapper").style.display = "none"
    document.getElementById("question").innerHTML = comment.content
    document.getElementById("question-wrapper").style.display = "block"
    clickable = true

}


function sendAnswer(questionId, answerId) {

    document.getElementById("question-wrapper").style.display = "none"
    document.getElementById("loader-wrapper").style.display = "block"

    const comment2 = data.find(element => element.id === questionId);
    let correct = 0
    if (answerId == comment2.real) {
        correct = 1
    }

    document.getElementById("loader-wrapper").style.display = "none"
    score = score + correct
    document.getElementById("score").innerHTML = score
    document.getElementById("answer-wrapper").style.display = "block"
    let answerDiv = document.getElementById("answer")
    if (correct == 1) {
        answerDiv.style.color = "green"
        answerDiv.innerHTML = "Well done, you were right."
    } else {
        answerDiv.style.color = "red"
        answerDiv.innerHTML = "Wrong guess!"
        lives = lives - 1
        document.getElementById("lives").innerHTML = lives
    }
    if (lives == 0) {
        document.getElementById("next-question-button").style.display = "none"
        endGame()
    }

}


function endGame() {

    document.getElementById("loader-wrapper").style.display = "block"
    document.getElementById("game-over-wrapper").style.display = "block"
    let gameoverDiv = document.getElementById("game-over")
    gameoverDiv.innerHTML = "Game over<br/>Your score: " + score + "<br/>"
    if (score > topScore) {
        topScore = score
    }
    gameoverDiv.appendChild(
        document.createTextNode(
            "Top score: " + topScore
        )
    );

    document.getElementById("loader-wrapper").style.display = "none"

}

