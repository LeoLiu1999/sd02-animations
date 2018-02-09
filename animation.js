var c = document.getElementById("slate");
var ctx = c.getContext("2d");

//all the buttons
var toggleButton = document.getElementById("toggle");
var clearButton  = document.getElementById("clear");
var startButton  = document.getElementById("start");
var stopButton  = document.getElementById("stop");

//and status display
var toggleStatus = document.getElementById("toggleStatus");

//control vars
var started = false; //prevents multiple presses of start past the first from taking effect (stops increasing speed on further presses)
var toggle = 0;
var frameId;
var xcor;
var ycor;
var dX = 3;
var dY = 3;
var size;

var newCircle = function(e){
    xcor = e.offsetX;
    ycor = e.offsetY;
    drawCircle(xcor, ycor, 10);
}

var drawCircle = function(x, y, r){
    ctx.beginPath();

    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

var clear = function(){
    ctx.beginPath();               //reset path
    ctx.clearRect(0, 0, 600, 600); //clear canvas
}

var draw = function(e){
    ctx.fillStyle = "#000000";

    if (toggle == 0){
	size = frameId % 120;
	if (size > 60)
	    size = 120 - size
	size += 10
    }
    
    if (toggle == 1){
	if (xcor <= 0)
	    dX = Math.abs(dX);
	if (xcor >= 600)
	    dX = -1 * Math.abs(dX);
	if (ycor <= 0)
	    dY = Math.abs(dY);
	if (ycor >= 600)
	    dY = -1 * Math.abs(dY);
	xcor += dX;
	ycor += dY;
    }
    
    clear();
    drawCircle(xcor, ycor, size);
    frameId = window.requestAnimationFrame(draw);
}

var toggleFunc = function(){
    if (toggle < 1){
	toggle += 1;
	toggleStatus.innerHTML = "Bouncing";
    } else {
	toggle = 0;
	toggleStatus.innerHTML = "Growing & Shrinking";
    }
}

var start = function(){
    if(! started){
	started = true;
	frameId = window.requestAnimationFrame(draw);
    }
}

var stop = function(){
    started = false;
    window.cancelAnimationFrame(frameId);
}

c.addEventListener("click", newCircle);
startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
toggleButton.addEventListener("click", toggleFunc); //Bounce around or grow & shrink
clearButton.addEventListener("click", clear);
