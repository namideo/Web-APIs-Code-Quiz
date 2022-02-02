var StartEl = document.querySelector(".Start");
var QuestionsEl = document.querySelector(".Questions");
var clockEl = document.querySelector(".timer");
var resultEl = document.querySelector(".resultBox");
var secondsLeft = 60;
var timeInterval;



 var isClockRunning = true;


const feedbackID = 'rightOrWrong'
const rightCountID = 'rightCount'
const wrongCountID = 'wrongCount'
        

const questions = [
{ 
    "text" : "The first actor to play James Bond was...",
    "choices" : ["Roger Moore", "Sean Connery", "David Niven", "George Lazenby"],
    "answer" : 1,
},
{
    "text" : "James Bond was created by...",
    "choices" : ["Sir Arthur Conan Doyle", "Raymond Chandler", "Ian Fleming", "Kingsley Amis"],
    "answer" : 2,
},
{
    "text" : "How many Bond films are there in the official canon?",
    "choices" : ["19", "21", "30", "25"],
    "answer" : 3,
},
{
    "text" : "Who performed the main title song for Skyfall?",
    "choices" : ["Adele", "Billie Eilish", "Shirley Bassey", "Alicia Keys"],
    "answer" : 0,
},
{
    "text" : "The name of the last James Bond movie was...",
    "choices" : ["Skyfall", "Casino Royale", "No Time to Die", "Spectre"],
    "answer" : 2,
}

]


let currentQuestion = 0;        
let rightAnswers = 0;
let wrongAnswers = 0;

let renderGame = function() {
    document.getElementById(rightCountID).innerHTML = rightAnswers;
    document.getElementById(wrongCountID).innerHTML = wrongAnswers;
}

let endGame = function(shouldClear) {
    QuestionsEl.setAttribute("style", "display: none");
    resultEl.setAttribute("style", "display: block");
    clockEl.setAttribute("style", "display: none");
    resultEl.innerHTML = "Your Score: " + rightAnswers + "/5";
    isClockRunning = false;
    if (shouldClear ) {
        clearInterval(timeInterval);
    }
}


let renderQuestion = function(number) {
    let title = document.getElementById('current')
    title.innerHTML = questions[number].text;
    QuestionsEl.setAttribute("style", "display: block");
    StartEl.setAttribute("style", "display: none");

    document.getElementById('buttonBox').innerHTML = ""
    questions[number].choices.forEach(
        function(item,index) {

            let newButton = document.createElement("button");
            newButton.innerHTML = item;
            
            newButton.addEventListener("click", function () {
                
                if (index === questions[currentQuestion].answer) {
                    document.getElementById(feedbackID).innerHTML = "Correct!"
                    rightAnswers++;

                } else {
                    secondsLeft -= 10;
                    document.getElementById(feedbackID).innerHTML = "Incorrect!"
                    wrongAnswers++;
                }

                renderGame();

                if (currentQuestion < questions.length -1) {
                    currentQuestion++;
                    renderQuestion(currentQuestion);
                } else {
                    endGame(true);
                    console.log("clock stopped because no more questions!")
                }
            });

            


            document.getElementById('buttonBox').appendChild(newButton);
        }
    )

    function setTime() {

        console.log("SET TIME")
        timeInterval = setInterval(function() {

            if (isClockRunning) {
                console.log(secondsLeft);
                secondsLeft--;
                clockEl.setAttribute("style", "font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;");
                clockEl.textContent = secondsLeft + " seconds left.";
                if (secondsLeft <= 0) {
                    clearInterval(timeInterval);
                    if (currentQuestion < questions.length -1){
                        endGame();
                    }
                }
        
                if (secondsLeft === 1) {
                    clockEl.textContent = secondsLeft + " second left.";
                }
                if (secondsLeft === 0) {
                    endGame(false);
                    console.log("clock stopped because no more time!")
                    clearInterval(timeInterval);
                    clockEl.textContent = "Your time is up!"; 
                }
            }

        }, 1000);
    }

    StartEl.addEventListener("click", setTime);
}

document.getElementById('startGame').addEventListener('click', function() {
    document.getElementById('startGame')
    renderQuestion(0);
    renderGame();
})