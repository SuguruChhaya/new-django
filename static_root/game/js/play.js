const mainloopSpeed = 100;
//!Since javascript cannot keep up with this, I need to make it 10 milliseconds
const mainLoopAdjust = 1000 / mainloopSpeed;
let fiveSecCountdown = 5 * mainLoopAdjust;
let fortyFiveSecCountdown = 45 * mainLoopAdjust;
let lblTimer = document.getElementById('lblTimer');
let lblColor = document.getElementById('lblColor');
let textbox = document.getElementById('textbox')
let yellowAudio = document.getElementById('yellowAudio');
let greenyellowAudio = document.getElementById('greenyellowAudio');
let greenAudio = document.getElementById('greenAudio');
let skyblueAudio = document.getElementById('skyblueAudio');
let grayAudio = document.getElementById('grayAudio');
let orangeAudio = document.getElementById('orangeAudio');
let pinkAudio = document.getElementById('pinkAudio');
let magentaAudio = document.getElementById('magentaAudio');
let redAudio = document.getElementById('redAudio');
let purpleAudio = document.getElementById('purpleAudio');
let blueAudio = document.getElementById('blueAudio');
let blackAudio = document.getElementById('blackAudio');


let run = true;
let score = 0;
let scoreLabel = document.getElementById('currentScore');
//!Not parsing this correctly
let highscore = parseInt(document.getElementById('highscore').innerHTML);
//TODO Blue is missing from the list. I need to correct all the color issues. 
const fontColorArray = ['yellow', 'greenyellow', 'green', 'skyblue', 'gray', 'orange', 'pink', 'magenta', 'red', 'purple', 'blue', 'black'];
const displayColorArray = ['yellow', 'light green', 'green', 'light blue', 'gray', 'orange', 'pink', 'magenta', 'red', 'purple', 'blue', 'black'];
const audioColorArray = [yellowAudio, greenyellowAudio, greenAudio, skyblueAudio, grayAudio, orangeAudio, pinkAudio, magentaAudio, redAudio, purpleAudio, blueAudio, blackAudio]
let audioPlayed = false;
let audioCounterSeconds = 3
let audioCounter = audioCounterSeconds * mainLoopAdjust;
let answered = true;
let chosenItem;

//TODO I must be able to redirect to a web page that allows me to modify the value in the model. 
//TODO Or, I should be able to edit models right from javascript. 

function mainloop(){
    if (run){
        scoreLabel.innerHTML = score;
        if (fiveSecCountdown > 0){
            fiveSecFunc();
        }
        else if (fiveSecCountdown > -1 * mainLoopAdjust){
            showStart();
        }

        else if (fortyFiveSecCountdown > 0){
            fortyFiveSecFunc();
        }

        else{
            lblTimer.innerHTML = '0';
            $(document).ready(function(event){
                //event.preventDefault();
                
                $.ajax({
                    type: 'POST',
                    url: '/',
                    //!Since home doesn't already have a response getting method, I will receive it through game.home
                    data:{
                        score: score,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },

                    success: function(){
                        run = false;
                        let message = `Your score was ${score}.`;
                        if (score > highscore){
                            message += " Congratulations! You have a new highscore!"
                        }
                        else{
                            console.log(score);
                            console.log(highscore);
                        }
                        //?Why is there a popup 2 times? Only happens when I control f5. So thats fine. 
                        var confirmVar = confirm(message);
                        if (confirmVar){
                            window.location.replace("/")
                        }
                    }
                })
            
            });
        }
        
    }
}
//!To make things simpler, I think I should just create a new simple registration form for now using ajax
//!Or, I should try it out on the login window or the highscores window. 


function fiveSecFunc(){
    fiveSecCountdown -= 1;
    lblTimer.innerHTML = (Math.floor(fiveSecCountdown / mainLoopAdjust) + 1).toString();
}

function showStart(){
    fiveSecCountdown -= 1;
    lblTimer.innerHTML = "START";
}

function fortyFiveSecFunc(){
    fortyFiveSecCountdown -= 1;
    lblTimer.innerHTML = (Math.floor(fortyFiveSecCountdown / mainLoopAdjust) + 1).toString();

    if (answered){
        //*All global variables. 
        chosenRandom = Math.floor(Math.random() * fontColorArray.length)
        chosenFont = fontColorArray[chosenRandom];
        correctFont = displayColorArray[chosenRandom]
        fakeRandom = Math.floor(Math.random() * displayColorArray.length);
        chosenDisplay = displayColorArray[fakeRandom];
        chosenAudio = audioColorArray[fakeRandom];
        lblColor.innerHTML = chosenDisplay;
        lblColor.style.color = chosenFont;
        //TODO Need to change the font too using CSS. 
        
        //!I will probably make a separate method for playing audio repetitively. 
        //*Audio should just be played when it is not answered. Essentially it is going to be played in 
        //*the next loop in the else block. 
        audioCounter = 0;

        //*Had something to do with the cache. Ctrl+f5 saved the day. 


        //*Since they are quite confusing, I need to log out all the colors out in console. 

        answered = false;

        //favicon not found is a minor error. 
    }

    else{
        repeatAudio();

        if (textbox.value == correctFont){
            answered = true;
            textbox.value = "";
            score+=1;
        }
    }
}

function repeatAudio(){
    if (audioCounter <= 0){
        chosenAudio.play();
        audioCounter = audioCounterSeconds * mainLoopAdjust;
    }

    else{
        audioCounter -= 1;
    }
}

let loop = setInterval(mainloop, mainloopSpeed);