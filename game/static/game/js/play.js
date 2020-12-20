let mainloopSpeed = 100;
//!Since javascript cannot keep up with this, I need to make it 10 milliseconds
let mainLoopAdjust = 1000 / mainloopSpeed;
let fiveSecCountdown = 5 * mainLoopAdjust;
let fortyFiveSecCountdown = 5 * mainLoopAdjust;
let lblTimer = document.getElementById('lblTimer');
let lblColour = document.getElementById('lblColour')
let run = true;
let score = 0;
let colourList = ['Yellow', 'GreenYellow', 'Green', 'SkyBlue', 'White', 'Gray', 'Orange', 'Pink', 'Magenta', 'Red', 'Purple', 'Blue', 'Black'];

function mainloop(){
    if (run){
        
    }
}