// const host = "https://artificial-non-intelligence.herokuapp.com"
const host = "http://127.0.0.1:8000"


window.addEventListener('load', function () {

    var question = getNewQuestion()

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function (event) {
            console.log(button.id)
            var verification = sendAnswer(question.id, button.id)
        })
    })

})

function getNewQuestion() {

    const url = new URL(host + "/get-new-comment")

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
            return responseJson
        })
        .catch((error) => {
            throw new Error("API error")
        })
    
}

function sendAnswer(questionId, answer) {

    const url = new URL(host + "/verify-answer")
    let params = {
        answer: answer
    }
    url.search = new URLSearchParams(params).toString()

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("API error")
            }
        })
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            throw new Error("API error")
        })
    
}
