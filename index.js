// const host = "https://non-intelligence-api.herokuapp.com"
const host = "http://127.0.0.1:8000"

var currentQuestionId = null
var score = 0
var clickable = true

window.addEventListener('load', function () {

    document.getElementById("score").innerHTML = score
    getNewQuestion(aggressive)

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function (event) {
            if (clickable) {

                clickable = false

                document.getElementById("question-wrapper").style.display = "none"
                document.getElementById("loader-wrapper").style.display = "block"

                if (button.id == "right") {
                    var answer = 1
                }
                else if (button.id == "left") {
                    var answer = 0
                }

                sendAnswer(currentQuestionId, answer)

                getNewQuestion()

            }
        })
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
            console.log(responseJson)
            currentQuestionId = responseJson.id
            document.getElementById("question").innerHTML = responseJson.comment
            document.getElementById("question-wrapper").style.display = "block"
            document.getElementById("loader-wrapper").style.display = "none"
        })
        .catch((error) => {
            throw new Error("API error")
        })

}

function sendAnswer(questionId, answer) {

    const url = new URL(host + "/verify-answer")
    let params = {
        questionId: questionId,
        answer: answer
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
            console.log(responseJson)
            score = score + responseJson.correct
            document.getElementById("score").innerHTML = score
            clickable = true
        })
        .catch((error) => {
            throw new Error("API error")
        })

}
