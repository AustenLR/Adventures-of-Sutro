var bones = 49; //score
var scoreBoard = document.getElementById("bones");
var hippoTimer;
var drawPacTimer;
var pauseHippoMoveTimer;
//update scoreboard
function bonesRemaining(){
  scoreBoard.innerText = ("Bones Left: " + parseInt(bones));
}

function livesRemaining(){
  $('#lives').text("Lives Remaining: " + parseInt(lives));
}

var startTime;
function timer() {
    var time = Date.now()-startTime;
    document.getElementById("timer").innerText = (time/1000).toFixed(0);
}

var canvas = document.getElementById("myCan"); //variable to use later cache
var ctx = canvas.getContext("2d"); //variable to store the 2D rendering context - tool to paint on the canvas

//variable for starting position and current position
var x = canvas.width/2 +30; //where x is
var y = canvas.height-50; //where y is
var pacRadius = 6;


//parameters for Sutro
var sutroWidth = 36;
var sutroHeight = 42;

//drawing sutro
function sutro(){
  ctx.drawImage(document.getElementById('source'), 67,210,140,170, x,y, sutroWidth, sutroHeight);
}

//starting position and current position of tiger
var tigerX=140;
var tigerY=15;

//tiger parameters
var tigerWidth = 65;
var tigerHeight = 44;


function tiger(){
  ctx.drawImage(document.getElementById('tigerSource'), 0,0,110,72, tigerX,tigerY, tigerWidth, tigerHeight);
}

//starting position of the bear
var bearX = 50;
var bearY = 0;

//bear parameters
var bearWidth = 27;
var bearHeight = 60;


function bear(){
  ctx.drawImage(document.getElementById('bearSource'), 0,0,146,359, bearX, bearY, bearWidth, bearHeight);
}


//hippo parameters
var hippoWidth = 100;
var hippoHeight = 65;

//hippo position 
var hippoX;
var hippoY;

function hippo(){
  ctx.drawImage(document.getElementById('hippoSource'), 0,0, 363, 268, hippoX, hippoY, hippoWidth, hippoHeight);
}


// -- hippo move

// //how fast hippo moves
// var hDX = 3;
// var hippoStartingPoints =[];

// //looping through to create the starting points off of the walls positions; needs to be after drawWall function
// for (var i = 0; i < walls[3].length; i++){
//     var yHipStart = walls[3][i].y - wallPadding + 5;
//     var xHipStart = canvas.width - hippoWidth +20;
//     hippoStartingPoints[i] = {x: xHipStart, y: yHipStart}

// }

// setInterval(hippoGo, 6000)

// function hippoGo(){

//   //new starting place, then go 


// }

// setInterval(hippoMove, 10)

// function hippoMove(){
//   hippoX -= hDX
// }




// -- Original Crazy

//   var direction; 
// function chooseDirection(){
//   // var direction; 
//   var num = Math.random();//random number choosing the direction
//   if (num < .25){
//     direction = 'north';
//   } else if (num < .5){
//     direction = 'south';
//   } else if (num < .75){
//     direction = 'east';
//   } else {
//     direction = 'west';
//   }
//   var IntervalID = setInterval(go, 10) //updated the same time amount of time as pacman code
// }

// function go(){
//   if (direction === 'north'){
//     if (tigerCollisionWall() || tigerY < 0 +tigerHeight){ //if the tiger hit the wall or boundary, go a different way 
//       direction = 'west'; //new direction is west
//       tigerX -= 3; //go west
//     } else {
//       tigerY -= 1;
//     }
//   } else if (direction === 'south'){
//     if (tigerCollisionWall() || tigerY > canvas.height - tigerHeight){ //if the tiger hit the wall, go a different way 
//       direction= 'east'; //will go east moving forward
//       tigerX += 3; // go east
//     } else{
//       tigerY += 1;
//     }
//   } else if (direction === 'east'){
//     if (tigerCollisionWall() || tigerX > canvas.width -tigerWidth){ //if the tiger hit the wall, go a different way 
//       direction = 'north'; //will go up from now on
//       tigerY -= 3; // go north
//     } else{
//       tigerX += 1;
//     }
//   } else if (direction === 'west'){
//     if (tigerCollisionWall() || tigerX < 0){ //if the tiger hit the wall, go a different way 
//       direction = 'south'; //now will go down
//       tigerY += 3;
//     } else{
//       tigerX -= 1;
//     }
//   }
// }

  //need a timer ID probably only for the other setInterval
//setInterval(chooseDirection, 3000)//in thousands of a second

//set interval to go that way for that long
//outside the interval is the direction
//setTime out to rerun the direction

//setup collision detection at each intersection
  //run a function to determine which way to go 
//go a direction based on sutro's X,Y coordinates 



//------

//variables for the bones and their parameters
var ballColumnCount = 7;
var ballRowCount = 7;
var ballWidth = 70;
var ballHeight = 43;
var ballPaddingX = 65;
var ballPaddingY = 35;
var ballOffsetTop = 15; 
var ballOffsetleft = 10;

//creating the array of bones and setting them as objects to store their x y coordinates and status
var balls=[];
for (var c=0; c< ballColumnCount; c++){
  balls[c] =[];
  for (var r =0; r < ballRowCount; r++){
    balls[c][r]= { x:0, y:0, status:1};
  }
}

//actually looping through to create the bones
function drawBall(){
  for(var c=0; c<ballColumnCount; c++) {
    for(var r=0; r<ballRowCount; r++) {
      if (balls[c][r].status ==1){
        var ballX = (c*(ballWidth+ballPaddingX)+ballOffsetleft);
        var ballY = (r*(ballHeight+ballPaddingY)+ballOffsetTop);
        balls[c][r].x = ballX;
        balls[c][r].y = ballY;
        ctx.drawImage(document.getElementById('boneSource'),35,25,500,350,ballX, ballY, ballWidth, ballHeight);
      }
    }
  }
}

 function collisionBall(){
   for(var c=0; c<ballColumnCount; c++) {
     for(var r=0; r<ballRowCount; r++) {
         var b = balls[c][r];
         if (x+sutroWidth > b.x && x < b.x+ballWidth && y+sutroHeight > b.y && y < b.y+ballHeight && b.status) { //if the ball is inside the wall; added b.status so it will only update the score if the status was 1
            b.status=0;
            bones --; //updating the bones variable
            bonesRemaining(); //updating the board
            win();
         }
     }
   }
}

var lives =2;


function sutroEaten(){
  if ((x+sutroWidth > tigerX && x < tigerX+tigerWidth && y+sutroHeight > tigerY && y < tigerY+tigerHeight)||(x+sutroWidth > bearX && x < bearX+bearWidth && y+sutroHeight > bearY && y < bearY+bearHeight) || (x+sutroWidth > hippoX && x < hippoX+hippoWidth && y+sutroHeight > hippoY && y < hippoY+hippoHeight)){
    lives--;
    livesRemaining();
      if(lives <0){
        $('canvas').css('display', 'none');
        $('#timer').css('display', 'none');
        $('#lost').css('display', 'inline-block');
        $('#pause').css('display', 'none');
        clearInterval(drawPacTimer);
        clearInterval(pauseHippoMoveTimer);
        clearInterval(hippoTimer);
        lives = ':(';
        $('#lives').text(':(');
        //add a loosing screen
      } else {
        x = canvas.width/2 +30
        y = canvas.height-50
        tigerX = 140;
        tigerY =  15;
        tDX= 1;
        tDY= 0;
        bearX= 50;
        bearY= 0;
        bDX= 2;
        bDY= 0;
      }
  }
}

//parameters for the walls
var wallColumnCount = 4;
var wallRowCount = 7;
var wallWidth = 200;
var wallHeight = 3;
var wallPadding = 75;
var wallOffsetTop= 75;


//looping through rows and columns to create new walls
var walls=[];
for (var c=0; c<wallColumnCount; c++){
  walls[c] =[];
  for (var r =0; r <wallRowCount; r++){
    walls[c][r]= { x:0, y:0};
  }
}


function drawWall(){
  for(var c=0; c<wallColumnCount; c++) {
    for(var r=0; r<wallRowCount; r++) {
        var wallX = (c*(wallWidth+wallPadding));
        var wallY = (r*(wallHeight+wallPadding)+wallOffsetTop);
        walls[c][r].x = wallX;
        walls[c][r].y = wallY;
        ctx.beginPath();
        ctx.rect(wallX, wallY, wallWidth, wallHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
  }
}


//how fast hippo moves
var hDX = 4.1;
var hippoStartingPoints =[];

//looping through to create the starting points for the hippo off of the walls positions; needs to be after drawWall function

function setHippoStartingPoints(){
  for (var i = 0; i < walls[3].length; i++){
    var yHipStart = walls[3][i].y - (wallPadding + 1);
    var xHipStart = canvas.width - hippoWidth +20;
    hippoStartingPoints[i] = {x: xHipStart, y: yHipStart};
  }
}


// setInterval(hippoGo, 6000)

var hipNum;
var hipStayTimer;

function hippoGo(){
  clearInterval(hippoTimer);
  setHippoStartingPoints(); //setting the starting points
  hipNum = Math.ceil((Math.random()*7));
  hippoX = hippoStartingPoints[hipNum].x; //placing hippo at the start
  hippoY = hippoStartingPoints[hipNum].y;
  hipStayTimer = setTimeout(hippoStay, 700) 

  //new starting place, then go 
}

function hippoStay(){
  hippoTimer = setInterval(hippoMove, 10); //moving the hippo 
}
//function to move the hippo
function hippoMove(){
  hippoX -= hDX;
}




//parameters for intersections
var interColumnCount = 3;
var interRowCount = 8;
var interRadius = 3;


//looping through to create intersections
var intersections =[];
for (var c=0; c<interColumnCount; c++){
  intersections[c] =[];
  for (var r =0; r <interRowCount; r++){
    intersections[c][r]= { x:0, y:0};
  }
}



function drawInter(){
  for(var c=0; c<interColumnCount; c++) {
    for(var r=0; r<interRowCount; r++) {
        var interX = ((c+1)* wallWidth + (wallPadding/2) + (wallPadding * c));
        var interY = (r*(wallHeight+wallPadding)+(wallOffsetTop/2));
        intersections[c][r].x = interX;
        intersections[c][r].y = interY;
        ctx.beginPath();
        ctx.arc(interX, interY, interRadius,0, Math.PI*2);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
    }
  }
}

//parameters for sides for Tiger
var sideColumnCount = 2;
var sideRowCount = 8;
var sideRadius = 3;

//looping through for sides for Tiger
var sideInts =[];
for (var c=0; c<sideColumnCount; c++){
  sideInts[c] =[];
  for (var r =0; r <sideRowCount; r++){
    sideInts[c][r]= { x:0, y:0};
  }
}

//intersections on the sides for the tiger
function drawSideInts (){
  for(var c=0; c<sideColumnCount; c++) {
    for(var r=0; r<sideRowCount; r++) {
        var sideX = (40 + (c* (canvas.width - 70)));
        var sideY = (r*(wallHeight+wallPadding)+(wallOffsetTop/2));
        sideInts[c][r].x = sideX;
        sideInts[c][r].y = sideY;
        ctx.beginPath();
        ctx.arc(sideX, sideY, sideRadius,0, Math.PI*2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
  }
}



//checking if sutro hit the wall
function collisionWall(){
  for(var c=0; c<wallColumnCount; c++) {
    for(var r=0; r<wallRowCount; r++) {
        var w = walls[c][r];
        if (x+sutroWidth > w.x && x < w.x+wallWidth && y+sutroHeight > w.y && y < w.y+wallHeight) { //added sutro's width and height accordingly so he cannot enter the wall
           return true; 
        }
    }
  }
}

//checking if tiger hit the wall ??? DONT THINK IM USING THIS FUNCTION 9:55AM
function tigerCollisionWall(){
  for(var c=0; c<wallColumnCount; c++) {
    for(var r=0; r<wallRowCount; r++) {
        var w = walls[c][r];
        if (tigerX+tigerWidth > w.x && tigerX < w.x+wallWidth && tigerY+tigerHeight > w.y && tigerY < w.y+wallHeight) { //added sutro's width and height accordingly so he cannot enter the wall
           return true; 
        }
    }
  }
}

//storing so he wont change direction on the same intersection over and over
var lastHitIntersection;

function bearCollisionInter(){
  for(var c=0; c<interColumnCount; c++) {
    for(var r=0; r< interRowCount; r++) {
        var iB = intersections[c][r];
        if (bearX+ (bearWidth * 2/3) > iB.x && bearX + (bearWidth/3) < iB.x+interRadius && bearY+(bearHeight * 2/3) > iB.y && bearY+(bearHeight/3) < iB.y+interRadius && lastHitIntersection !== iB) {
            lastHitIntersection = intersections[c][r]; //storing so he wont change direction on the same intersection over and over
            bearNextDirection();
        }
    }
  }
}


//--------

//var for direction of bear
var bDX = 2.5;
var bDY = 0;


function bearNextDirection(){
  var num = Math.random();//random number choosing the direction
  if (lastHitIntersection === intersections[0][0] || lastHitIntersection == intersections[1][0] || lastHitIntersection == intersections[2][0]){
    bDX = 0; //if he hits any of the top intersections, go down
    bDY = 2.5;
  } else if (lastHitIntersection === intersections[0][7] || lastHitIntersection == intersections[1][7] || lastHitIntersection == intersections[2][7]){
    bDX =0; //if he hits any of the bottom intersections, go up
    bDY = -2;
  }else {
    if (num < .25){
      bDX = 3;
      bDY = 0; 
    } else if (num < .5){
      bDX = -3;
      bDY = 0; 
    } else if (num < .75){
      bDX = 0;
      bDY = 2; 
    } else {
      bDX = 0;
      bDY = -3; 
    }
  }
}

function bearCollisionSide(){
  for(var c=0; c<sideColumnCount; c++) {
    for(var r=0; r< sideRowCount; r++) {
        var i = sideInts[c][r];
        if (bearX+bearWidth > i.x && bearX < i.x+interRadius && bearY+bearHeight > i.y && bearY < i.y+interRadius) {
            bearTurnAround();
        }
    }
  }
}

function bearTurnAround(){
  bDX = -bDX;
};

function bearMove(){
  bearX += bDX;
  bearY += bDY;
}

//--------------

function tigerCollisionInter(){
  for(var c=0; c<interColumnCount; c++) {
    for(var r=0; r< interRowCount; r++) {
        var i = intersections[c][r];
        if (tigerX+ (tigerWidth * 2/3) > i.x && tigerX + (tigerWidth/3) < i.x+interRadius && tigerY+ (tigerHeight *2/3) > i.y && tigerY +tigerHeight/3 < i.y+interRadius) {
            nextDirection();
        }
    }
  }
}
var tDX =1.5;
var tDY =0;

function tigerCollisionSide(){
  for(var c=0; c<sideColumnCount; c++) {
    for(var r=0; r< sideRowCount; r++) {
        var i = sideInts[c][r];
        if (tigerX+tigerWidth > i.x && tigerX < i.x+interRadius && tigerY+tigerHeight > i.y && tigerY < i.y+interRadius) {
            turnAround();
        }
    }
  }
}

function turnAround(){
  tDX = -tDX;
};

function nextDirection(){
  if (Math.abs(tigerX -x) > Math.abs(tigerY - y)){
    if (tigerX > x){
      tDX = -1;
      tDY = 0;
    } else if (tigerX < x){
     tDX = 1;
     tDY = 0;
    }
  }
  else {
    if (tigerY > y){
      tDY = -1;
      tDX = 0;
    } else if (tigerY < y){
      tDY = 1;
      tDX = 0;
    }
  }
}


function tigerMove(){
  tigerX += tDX;
  tigerY += tDY;
}

//------------- moving PacMan
//variables for moving pacman
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//Event listeners for keydown and keyup on the controler
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Allowing user to control pacman - function to know if key is presssed
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

//function for if the key is released to stop moving pacman
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}



//function inside setInterval for the game; where most functions are called
function drawPac(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clearing the whole canvas for each interval
  sutro();
  drawWall();
  setHippoStartingPoints();
  drawBall();
  drawInter();
  drawSideInts();
  collisionBall();
  sutro();
  tiger();
  bear();
  hippo();
  timer();
  tigerCollisionInter();
  tigerCollisionSide();
  tigerMove();
  bearCollisionInter();
  bearCollisionSide();
  sutroEaten();
  bearMove();
  if(rightPressed && (x < canvas.width- sutroWidth)){
    if (collisionWall()){ //running code to see if the ball is inside the wall 
      x-=3;
    } else {
      x += 2;
    }
  } else if(leftPressed && (x > 0)) {
    if (collisionWall()){
      x+=3;
    } else{
      x -= 2;      
    }
  } else if (upPressed && (y > 0)){
    if (collisionWall()){
      y+=3;
    } else{
      y -= 2;
    }
  } else if(downPressed && (y < canvas.height- sutroHeight)) {
    if (collisionWall()){
      y-=3;
    } else {
    y += 2;
  }
  }
}

var paused = false;

function pauseGame(){
  if (!paused){
    console.log('pause');
    clearInterval(drawPacTimer);
    clearInterval(pauseHippoMoveTimer);
    clearInterval(hippoTimer);
    $('#pause').text('Resume');
    hippoX = -100;
    hippoY = -100;
    paused = true;
  } else if (paused){
    console.log('resume');
    drawPacTimer = setInterval(drawPac, 10);
    pauseHippoMoveTimer = setInterval(hippoGo, 4000);
     $('#pause').text('Pause');
    // hippoTimer = setInterval(HippoMove ,10);
    paused = false;
  }
}

$('#pause').on('click', pauseGame);

//button to start the game
$("#start").on('click',function (){
   $("#slideUpBox").slideUp(2000,function(){
    $('canvas').css('display',"inline");
    $('p').css('display',"inline-block");
    $('#pause').css('display','inline-block');
    drawPacTimer = setInterval(drawPac, 10);
    pauseHippoMoveTimer = setInterval(hippoGo, 4000);
    startTime = Date.now();
   })
});

function win(){
  if (bones ===0){
    clearInterval(drawPacTimer);
    clearInterval(pauseHippoMoveTimer);
    clearInterval(hippoTimer);
    $('canvas').css('display', 'none');
    $('#timer').css('display', 'none');
    $('#pause').css('display', 'none');
    $('#win').css('display', 'inline-block');
  }
}








