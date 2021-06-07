const host = "https://non-intelligence-api.herokuapp.com"
// const host = "http://127.0.0.1:8000"

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
            console.log(responseJson)
            score = score + responseJson.correct
            document.getElementById("score").innerHTML = score
            document.getElementById("question-wrapper").style.display = "none"
            if (responseJson.correct == 1) {
                document.getElementById("answer").innerHTML = "Well done, you were right!"
            } else {
                document.getElementById("answer").innerHTML = "Wrong answer!"
            }
            document.getElementById("answer-wrapper").style.display = "block"
        })
        .catch((error) => {
            throw new Error("API error")
        })

}


