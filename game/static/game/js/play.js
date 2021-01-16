const mainloopSpeed = 100;
//!Since javascript cannot keep up with this, I need to make it 10 milliseconds
const mainLoopAdjust = 1000 / mainloopSpeed;
let fiveSecCountdown = 2 * mainLoopAdjust;
let fortyFiveSecCountdown = 5 * mainLoopAdjust;
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
        if (fiveSecCountdown > 0){
            getPrevious();
            fiveSecFunc();
        }
        else if (fiveSecCountdown > -1 * mainLoopAdjust){
            showStart();
        }

        else if (fortyFiveSecCountdown > 0){
            fortyFiveSecFunc();
        }

        else{
            $(document).ready(function(event){
                //event.preventDefault();
                
                $.ajax({
                    type: 'POST',
                    url: '/home/',
                    //!Since home doesn't already have a response getting method, I will receive it through game.home
                    data:{
                        score: score,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },

                    success: function(){
                        alert("success");
                    }
                })
            
            });

            //!I have to do the following
            //!I HAVE TO DO THE FIRST STEP BEFORE THE GAME ANYWAY TO SHOW THE 
            //*1. Get the high score from the model in this javascript file. 
            //*2. Compare it with the current score. 
            //*3. If the current number is larger, I can 
            //!Instead of an on-submit, I want it to work automatically when this else block is ran. 
            //window.location.replace("/", a="hello");
            //!To actually use jquery, I need to be import it as a script in my html file like:
            //<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js></script>
            //!I can choose the version (probably gonna use the latest version. )
            //?Somehow some ppl have this link as their script: https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js 
            //Maybe watch a youtube tutorial?? https://www.youtube.com/watch?v=zxvtUr3Cmto  
            //?I need to look into what the widgets thing in the model will do.
            //*This is also mentioned in the real python article at https://realpython.com/django-and-ajax-form-submissions/
            //*This must play a role in getting or submitting.
            run = false;
            /*
            $(document).on('sumbit', '#submit_data', function(event){
                event.preventDefault();

                $.ajax({
                    type: 'POST',
                    url: '/submit_data', 
                    data:{
                        name:${'#name'}.val(),

                    }
                }
            });
            */
            //*AJAX stands for asynchronus javascript and XML
            //https://stackoverflow.com/questions/61929987/redirect-django-url-with-javascript
            //https://stackoverflow.com/questions/49500189/django-how-to-save-javascript-variable-into-django-database
            //https://stackoverflow.com/questions/13465711/how-do-i-post-with-jquery-ajax-in-django 

            //https://www.youtube.com/watch?v=KgnPSmrQrXI

            /*Ajax basic formula
            Ajax allows us to submit information without refreshing page
            Do I need to create a form in HTML in order to submit information?

            $(document).on('submit', #new_user_form (this is the id for the form), function(event)){
                //*Prevent page from refreshing
                event.preventDefault();

                $.ajax({
                    type:'POST',
                    url:'/user/create',
                    data:{
                        name:${'name'}.val();
                        email: ${'#email'}.val();
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val();
                    }
                    success:function(){
                        alert("Created New User!")
                    }

                })


            };

                //!After adding that portion to the Javascript, I have to create a view for the corresponding url
                //!My url will be home but I don't necessarily want to do the data giving when I reach home. 
                //*I want to first give data, give javascript popup, after user clicks OK, I want to reload to the home page. 
                //!Need to add csrf token in HTML
                <form id="new_user_form">{% csrf_token %}

                Then in views.py I will create a method:
                def create_user(request):
                    if request.method == 'POST':
                        name = request.POST['name']

            */
        }
        
    }
}
//!To make things simpler, I think I should just create a new simple registration form for now using ajax
//!Or, I should try it out on the login window or the highscores window. 

//!I don't need to getPrevious because I can just load that info from the HTML document itself. 
function getPrevious(){
    //!Here I want to get the value of the previous high score. 
    //So the django {% url %} method will generate a new url based on the form information
    //https://stackoverflow.com/questions/4599423/using-url-in-django-templates

//!Somehow JsonResponse is involved. 
/*
<a href="{% url 'login' %}">logout</a>
    $(document).ready(function(event){
        event.preventDefault();
        //*In jquery, # means the ID. 

        $.ajax({
            dataType: 'json', 
            type: 'GET',
            url: '/submit_data', 
            data:{
                name:${'#name'}.val()

            }
        }
    });*/
}
//https://stackoverflow.com/questions/46322894/change-a-django-model-with-javascript 
//I need to dump some json stuff from my views. 

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