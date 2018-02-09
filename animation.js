var c = document.getElementById("slate");
var toggleButton = document.getElementById("toggle");
var clearButton  = document.getElementById("clear");
var toggleStatus = document.getElementById("toggleStatus");
var toggle = 0;

var ctx = c.getContext("2d");

var checkerboard = function(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    
    ctx.fillStyle = "#000000";
    
    var xcor = 0;
    var ycor = 0;

    for(x = 0; x < 600; x += 20){
	for(y = 0; y < 600; y += 20){
	    //console.log(x);
	    //console.log(y);
	    if((x + y) % 40 == 0){
		ctx.fillRect(xcor + x,ycor + y,20,20);
	    }
	}
    }
}

var drawCircle = function(x, y){
    console.log(x);
    console.log(y);

    ctx.beginPath();

    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

var drawSquare = function(x, y){
    console.log(x);
    console.log(y);

    ctx.fillRect(x-10, y-10, 20, 20);    
}


var pathStarted = false;

var drawDot = function(x, y){
    var radius = 10;
    ctx.moveTo(x + radius,y); //jump straight to the starting point of the arc
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.moveTo(x, y);
}

var drawLine = function(x, y){
    if (pathStarted){
	pathStarted = true;
	ctx.beginPath();
	ctx.moveTo(x, y);
    } else {
	ctx.lineTo(x, y);
	ctx.stroke();
    }
}

var clear = function(){
    pathStarted = false;
    ctx.beginPath();
    ctx.clearRect(0, 0, 600, 600);
}

var draw = function(e){
    ctx.fillStyle = "#000000";
    if (toggle == 0)
	drawCircle(e.offsetX, e.offsetY);
    if (toggle == 1)
	drawSquare(e.offsetX, e.offsetY);
    if (toggle == 2){
	ctx.fillStyle = "#0000ff";
	drawLine(e.offsetX, e.offsetY);
	drawDot(e.offsetX, e.offsetY);
	ctx.moveTo(e.offsetX, e.offsetY);
    }
}

var toggleFunc = function(){
    if(toggle == 2){
	toggle = 0;
	toggleStatus.innerHTML = "Circles";
    } else if(toggle == 0){
	toggle = 1;
	toggleStatus.innerHTML = "Squares";
    } else if(toggle == 1){
	toggle = 2;
	toggleStatus.innerHTML = "Connect the dots";
	pathStarted = false;
	ctx.beginPath();
    }
    console.log(toggle);
}

c.addEventListener("click", draw);
toggleButton.addEventListener("click", toggleFunc);
clearButton.addEventListener("click", clear);
