const host = "https://non-intelligence-api.herokuapp.com"
// const host = "http://127.0.0.1:8000"

var currentQuestionId = null
var score = 0
var lives = 3
var clickable = true

window.addEventListener('load', function () {

    document.getElementById("score").innerHTML = score
    document.getElementById("lives").innerHTML = lives
    getNewQuestion(aggressive)

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function (event) {
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

    document.getElementById('next-question-button').addEventListener('click', function (event) {
        document.getElementById("question-wrapper").style.display = "none"
        document.getElementById("loader-wrapper").style.display = "block"
        document.getElementById("answer-wrapper").style.display = "none"
        getNewQuestion(aggressive)
    })

})


function getNewQuestion(aggressive) {

    const url = new URL(host + "/get-random-comment")
    if (aggressive != null) {
        let params = {
            aggressive: aggressive,
        }
        url.search = new URLSearchParams(params).toString()
    }

    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("API error")
            }
        })
        .then((responseJson) => {
            // console.log(responseJson)
            currentQuestionId = responseJson.id
            document.getElementById("loader-wrapper").style.display = "none"
            document.getElementById("answer-wrapper").style.display = "none"
            document.getElementById("question").innerHTML = responseJson.comment
            document.getElementById("question-wrapper").style.display = "block"
            clickable = true
        })
        .catch((error) => {
            throw new Error("API error")
        })

}

function sendAnswer(questionId, answerId) {

    document.getElementById("question-wrapper").style.display = "none"
    document.getElementById("loader-wrapper").style.display = "block"

    const url = new URL(host + "/verify-answer")
    let params = {
        questionId: questionId,
        answerId: answerId
    }
    url.search = new URLSearchParams(params).toString()

    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("API error")
            }
        })
        .then((responseJson) => {
            // console.log(responseJson)
            document.getElementById("loader-wrapper").style.display = "none"
            score = score + responseJson.correct
            document.getElementById("score").innerHTML = score
            document.getElementById("answer-wrapper").style.display = "block"
            let answerDiv = document.getElementById("answer")
            if (responseJson.correct == 1) {
                answerDiv.style.color= "green"
                answerDiv.innerHTML = "Well done, you were right!"
            } else {
                answerDiv.style.color= "red"
                answerDiv.innerHTML = "Wrong answer!"
                lives = lives - 1
                document.getElementById("lives").innerHTML = lives
            }
            if (lives == 0) {
                answerDiv.style.color= "black"
                answerDiv.innerHTML = "Game over!<br/>Final score: " + score
                document.getElementById("next-question-button").style.display = "none"
                throw new Error("Game finished")
            }
        })
        .catch((error) => {
            throw new Error("API error, or game finished")
        })

}


