const host = "https://ani-api.adriencarpentier.com" // new production API
// const host = "https://non-intelligence-api.herokuapp.com" // old production API, not being used anymore because Heroku PostgreSQL is not free
// const host = "http://127.0.0.1:8000" // local

var currentQuestionId = null
var clickable = true
var sessionUid
if (!aggressive) {
    var aggressive = null
}

window.addEventListener('load', function () {

    // Listen for next button clicked
    document.getElementById('next-question-button').addEventListener('click', function () {
        getNewQuestion(aggressive)
    })

    // Listen for reset game button being clicked
    document.getElementById('reset-button').addEventListener('click', function () {
        startNewGame(aggressive)
    })

    // Listen to answers button being clicked
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function () {
            if (clickable) {
                clickable = false
                if (button.id == "right") {
                    var answer = 1
                }
                else if (button.id == "left") {
                    var answer = 0
                }
                sendAnswer(sessionUid, currentQuestionId, answer)
            }
        })
    })

    startNewGame(aggressive)

})

function startNewGame(aggressive) {
    document.getElementById("score").innerHTML = 0
    document.getElementById("lives").innerHTML = 3
    document.getElementById("answer-wrapper").style.display = "none"
    document.getElementById("next-question-button").style.display = ""
    document.getElementById("game-over-wrapper").style.display = "none"
    document.getElementById("loader-wrapper").style.display = "block"

    const url = new URL(host + "/sessions")
    return fetch(url, {
        method: 'POST',
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Can't parse API response")
            }
        })
        .then((responseJson) => {
            sessionUid = responseJson.sessionUid
            getNewQuestion(aggressive)
        })
}


function getNewQuestion(aggressive) {

    document.getElementById("answer-wrapper").style.display = "none"
    document.getElementById("question-wrapper").style.display = "none"
    document.getElementById("loader-wrapper").style.display = "block"

    const url = new URL(host + "/questions")
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
                throw new Error("Can't parse API response")
            }
        })
        .then((responseJson) => {
            currentQuestionId = responseJson.id
            document.getElementById("loader-wrapper").style.display = "none"
            document.getElementById("answer-wrapper").style.display = "none"
            document.getElementById("question").innerHTML = responseJson.question
            document.getElementById("question-wrapper").style.display = "block"
            clickable = true
        })

}

function sendAnswer(sessionUid, questionId, answer) {

    document.getElementById("question-wrapper").style.display = "none"
    document.getElementById("loader-wrapper").style.display = "block"

    const url = new URL(host + "/answers")
    const data = {
        'sessionUid': sessionUid,
        'questionId': questionId,
        'answer': answer
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Can't parse API response")
            }
        })
        .then((responseJson) => {
            document.getElementById("loader-wrapper").style.display = "none"
            document.getElementById("score").innerHTML = responseJson.score
            document.getElementById("answer-wrapper").style.display = "block"
            let answerDiv = document.getElementById("answer")
            if (responseJson.correct == 1) {
                answerDiv.style.color = "green"
                answerDiv.innerHTML = "Well done, you were right."
            } else {
                answerDiv.style.color = "red"
                answerDiv.innerHTML = "Wrong guess!"
                document.getElementById("lives").innerHTML = responseJson.lives
            }
            if (responseJson.lives == 0) {
                // End Game
                document.getElementById("next-question-button").style.display = "none"
                document.getElementById("game-over-wrapper").style.display = "block"
                document.getElementById("game-over").innerHTML = "Game over<br/>Your score: " + responseJson.score + "<br/>Top score: " + responseJson.topScore + "<a href='https://ani-data.adriencarpentier.com/'>see the stats</div>"
            }
        })

}
