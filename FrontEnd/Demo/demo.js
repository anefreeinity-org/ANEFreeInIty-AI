// var bw = 400;
// // Box height
// var bh = 400;
// // Padding
// var p = 10;

// var canvas = document.getElementById("canvas-demo");
// var context = canvas.getContext("2d");
// function drawBoard(){
//     for (var x = 0; x <= bw; x += 40) {
//         context.moveTo(0.5 + x + p, p);
//         context.lineTo(0.5 + x + p, bh + p);
//     }

//     for (var x = 0; x <= bh; x += 40) {
//         context.moveTo(p, 0.5 + x + p);
//         context.lineTo(bw + p, 0.5 + x + p);
//     }
//     context.strokeStyle = "black";
//     context.stroke();
// }

// drawBoard();

function drw(){
    var canvas = document.getElementById("canvas-demo");
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var span = 20;
    
    var canvas_ctx = canvas.getContext("2d");
    // canvas_ctx.fillStyle = 'rgba(' + [255, 0, 13, 1] + ')';
    canvas_ctx.beginPath();
    canvas_ctx.strokeStyle = 'rgba(' + [60, 57, 59, 0.75] + ')';

    for(var x = span; x < h; x+=span){
        canvas_ctx.moveTo(0,x);
        canvas_ctx.lineTo(w,x);
        canvas_ctx.stroke();
    }

    for(var x = span; x < w; x+=span){
        canvas_ctx.moveTo(x,0);
        canvas_ctx.lineTo(x,w);
        canvas_ctx.stroke();
    }

    canvas_ctx.beginPath();
    canvas_ctx.strokeStyle = 'rgba(' + [255, 0, 13, 1] + ')';

    var horizontalLine = span*Math.floor(Math.floor(h/span)/2);
    var verticalLine = span*Math.floor(Math.floor(w/span)/2);


    //window.alert(horizontalLine+ ", " +verticalLine);

    canvas_ctx.moveTo(verticalLine,0);
    canvas_ctx.lineTo(verticalLine,h);
    canvas_ctx.stroke();

    canvas_ctx.moveTo(0,horizontalLine);
    canvas_ctx.lineTo(w,horizontalLine);
    canvas_ctx.stroke();

    //window.alert("1");

    // canvas_ctx.beginPath();
    // //window.alert("2");
    // canvas_ctx.strokeStyle = 'rgba(' + [16, 0, 255, 0] + ')';
    // //window.alert("3");

    // canvas_ctx.moveTo(0,0);
    // //window.alert("4");
    // canvas_ctx.lineTo(w,h);
    // //window.alert("5");
    // canvas_ctx.stroke();
    // //window.alert("6");

}

function func(){
    var canvas = document.getElementById("canvas-demo");
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var span = 20;
    
    var canvas_ctx = canvas.getContext("2d");

    canvas_ctx.beginPath();
    canvas_ctx.moveTo(20, 20);
    canvas_ctx.lineTo(20, 100);
    //canvas_ctx.lineTo(70, 100);
    canvas_ctx.strokeStyle = "red";
    canvas_ctx.stroke();
}

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let text = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("coor").innerHTML = text;
}

drw();
func();