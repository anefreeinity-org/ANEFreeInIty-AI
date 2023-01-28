var lineId = 0;
var lineList = {};

var circleId = 0;
var circleList = {};

var rectangleId = 0;
var rectangleList = {};

var x = 0;
var y = 0;

var x1 = 0;
var y1 = 0;

var isMouseDown = false;

var scale = 1;
var zoom = 0;
var currentzoom = 1;
var originx = 0;
var originy = 0;

var CAD = null;

var CAD_WIDTH = 0;
var CAD_HEIGHT = 0;

var totalDeltaX = 0;
var totalDeltaY = 0;

var canvas = null;

window.onload = function ()
{
        canvas = document.getElementById("CAD");

        canvas.onmousewheel = function (event) {            

			if (document.getElementById("dynamicZoom").checked) 
			{				
				if (event.wheelDelta < 0) {
					zoom = 0.9;					
				}
				else {
					zoom = 1.1;
				}
			
				zoomCanvas(zoom);
			}            
        }

        CAD = document.getElementById("CAD").getContext('2d');
        CAD_WIDTH = document.getElementById("CAD").clientWidth;
        CAD_HEIGHT = document.getElementById("CAD").clientHeight;

        CAD.transform(1, 0, 0, -1, CAD_WIDTH / 2, CAD_HEIGHT / 2);
        setupCanvas();
		
		canvas.style.cursor='crosshair';
		
		//test();
}

function setupCanvas() {

    CAD.clearRect(-100000, -100000, 200000, 200000);
    CAD.clearRect(-CAD_WIDTH / 2, -CAD_HEIGHT / 2, CAD_WIDTH, CAD_HEIGHT);
    CAD.fillStyle = "#000000";
	CAD.fillRect(-CAD_WIDTH / 2 - totalDeltaX, -CAD_HEIGHT / 2 - totalDeltaY, CAD_WIDTH, CAD_HEIGHT);
    CAD.strokeStyle = "#FF0000";    
	
	if (document.getElementById("showAxes").checked) 
    {
		SetUpAxes();
	} 

    if (document.getElementById("showGrid").checked) 
    {
		SetUpGrid();
	}    
}

function SetUpAxes() {
    CAD.strokeStyle = "#FF0000";
    DrawLine(0, 0, 100, 0);

    CAD.strokeStyle = "#00FF00";
    DrawLine(0, 0, 0, 100);

    CAD.strokeStyle = "#0000FF";
    DrawCircle(0, 0, 10);
}

function SetUpGrid() {
    CAD.strokeStyle = "#BEBEBE";
    DrawLine(0, 0, 100, 0);

    var x;
    var y;

    var gap = 50;

    for (x = 0; x < CAD_WIDTH / 2 - totalDeltaX; x = x + gap) {
        DrawLine(x, -CAD_HEIGHT / 2 - totalDeltaY, x, CAD_HEIGHT / 2 - totalDeltaY);
    }

    for (x = 0; x > -CAD_WIDTH / 2 - totalDeltaX; x = x - gap) {
        DrawLine(x, -CAD_HEIGHT / 2 - totalDeltaY, x, CAD_HEIGHT / 2 - totalDeltaY);
    }

    for (y = 0; y < CAD_HEIGHT / 2 - totalDeltaY; y = y + gap) {
        DrawLine(-CAD_WIDTH / 2 - totalDeltaX, y, CAD_WIDTH / 2 - totalDeltaX, y);
    }

    for (y = 0; y > -CAD_HEIGHT / 2 - totalDeltaY; y = y - gap) {
        DrawLine(-CAD_WIDTH / 2 - totalDeltaX, y, CAD_WIDTH / 2 - totalDeltaX, y);
    }
}

function isEven(n) {
    if (n % 2 == 0) {
        return true;
    }
    else {
        return false;
    }
}

function getDistance(x1, y1, x2, y2)
{
	var deltaX = x2-x1;
	var deltaY = y2-y1;
	
	return Math.sqrt(deltaX*deltaX+deltaY*deltaY);
}

function getAngle(x1, y1, x2, y2)
{
	var deltaX = x2-x1;
	var deltaY = y2-y1;
	
	var theta = Math.atan(deltaY/deltaX);
			
	if(x < x1)
	{
		theta = theta + Math.PI;
	}
	
	return theta;
}

function radToDeg(rad)
{
	return 180.0/Math.PI * rad;
}

function DegToRad(deg)
{
	return Math.PI/180.0 * deg;
}

function getPolar(point, theta , r)
{	
	let newPoint = {
		x: point.x + r * Math.cos(theta),
		y: point.y + r * Math.sin(theta)
	}
	
	return newPoint;
}

function getMidPoint(point1, point2)
{
	let newPoint = {
		x: (point1.x + point2.x)/2.0,
		y: (point1.y + point2.y)/2.0
	}
	
	return newPoint;
}

function zoomCanvas(zoom) {
    CAD.scale(zoom, zoom);

    CAD_WIDTH *= 1 / zoom;
    CAD_HEIGHT *= 1 / zoom;

    currentzoom *= zoom;

    console.log('currentzoom : ' + currentzoom);

    updateDrawing();
}

function panCanvas(deltaX, deltaY) {    

    CAD.transform(1, 0, 0, 1, deltaX, deltaY);

    totalDeltaX += deltaX * 1.0;
    totalDeltaY += deltaY * 1.0;

    updateDrawing();
}

function isInsideCanvas(x, y) {

    if (x < 0)
        return false;
    if (x > CAD_WIDTH)
        return false;
    if (y < 0)
        return false;
    if (y > CAD_HEIGHT)
        return false;

    return true;
}

function TransformX(x) {
    return (x - CAD_WIDTH / 2 * currentzoom - totalDeltaX) / currentzoom;
}

function TransformY(y) {
    return -(y - CAD_HEIGHT / 2 * currentzoom + totalDeltaY) / currentzoom;
}

setInterval(drawGraph, 10);	

var startXX = 0;

var sin_oldxx = startXX;
var sin_oldyy = 0;

var cse_oldxx = startXX;
var cse_oldyy = 0;

var cos_oldxx = startXX;
var cos_oldyy = 0;

var sec_oldxx = startXX;
var sec_oldyy = 0;

var tan_oldxx = startXX;
var tan_oldyy = 0;

var cot_oldxx = startXX;
var cot_oldyy = 0;

var degree = 0;
var gap = 1;


function drawGraph()
{	
	if(document.getElementById("animation").checked == true)
	{
		//if (document.getElementById("cloud").checked == true)
		//{
			//DrawEntitiesFromCloud();
		//}

		//updateDrawing();
		
		var unitRadius = document.getElementById("unitRadius").value;

		var rad = DegToRad(degree);
		
		x = unitRadius * Math.cos(rad);
		y = unitRadius * Math.sin(rad);	
		
		var cse_newxx = sin_oldxx + gap;
		var cse_newyy = 1/Math.sin(rad)*unitRadius;
		if(document.getElementById("cosec").checked == true)
		{
			AddLine(cse_oldxx,cse_oldyy,cse_newxx,cse_newyy,"#FF00FF");	
		}
		cse_oldxx = cse_newxx;
		cse_oldyy = cse_newyy;
		
		var cos_newxx = cos_oldxx + gap;
		var cos_newyy = Math.cos(rad)*unitRadius;
		if(document.getElementById("cos").checked == true)
		{
			AddLine(cos_oldxx,cos_oldyy,cos_newxx,cos_newyy,"#FF0000");	
		}		
		cos_oldxx = cos_newxx;
		cos_oldyy = cos_newyy;
		
		var sec_newxx = cos_oldxx + gap;
		var sec_newyy = 1/Math.cos(rad)*unitRadius;
		if(document.getElementById("sec").checked == true)
		{
			AddLine(sec_oldxx,sec_oldyy,sec_newxx,sec_newyy,"#00FFFF");	
		}		
		sec_oldxx = sec_newxx;
		sec_oldyy = sec_newyy;

		var tan_newxx = tan_oldxx + gap;
		var tan_newyy = Math.tan(rad)*unitRadius;
		if(document.getElementById("tan").checked == true)
		{
			AddLine(tan_oldxx,tan_oldyy,tan_newxx,tan_newyy,"#0000FF");	
		}		
		tan_oldxx = tan_newxx;
		tan_oldyy = tan_newyy;
		
		var cot_newxx = cot_oldxx + gap;
		var cot_newyy = 1/Math.tan(rad)*unitRadius;
		if(document.getElementById("cot").checked == true)
		{
			AddLine(cot_oldxx,cot_oldyy,cot_newxx,cot_newyy,"#FFFF00");	
		}		
		cot_oldxx = cot_newxx;
		cot_oldyy = cot_newyy;	

		var sin_newxx = sin_oldxx + gap;
		var sin_newyy = Math.sin(rad)*unitRadius;	
		if(document.getElementById("sin").checked == true)
		{
			AddLine(sin_oldxx,sin_oldyy,sin_newxx,sin_newyy,"#00FF00");
			CAD.strokeStyle = "#00FF00";
			DrawLine(sin_newxx,0,sin_newxx,sin_newyy);
			
			CAD.strokeStyle = "#FF0000";
			DrawLine(sin_newxx,0,sin_newxx-Math.cos(rad)*unitRadius,0);
			
			CAD.strokeStyle = "#FFFFFF";
			DrawLine(sin_newxx,sin_newyy,sin_newxx-Math.cos(rad)*unitRadius,0);
			
			DrawCircle(sin_newxx-Math.cos(rad)*unitRadius,0,unitRadius);
		}		
		sin_oldxx = sin_newxx;
		sin_oldyy = sin_newyy;		

		degree++;
		
		//panCanvas(0,0);
	}		
}

function AddLine(x1,y1,x2,y2) {
    var line = {
        spx: x1,
        spy: y1,
        epx: x2,
        epy: y2,
    };

    lineList[lineId] = line;
    lineId++;

    updateDrawing();
	
	if (document.getElementById("recordMacro").checked) 
	{
		document.getElementById("macro").innerHTML += "AddLine(" + Math.round(x1) + "," + Math.round(y1) + "," + Math.round(x2) + "," + Math.round(y2) + ")\n";
	}
}

function AddLine(x1,y1,x2,y2,color) {
    var line = {
        spx: x1,
        spy: y1,
        epx: x2,
        epy: y2,
		color:color
    };

    lineList[lineId] = line;
    lineId++;

    updateDrawing();
	
	if (document.getElementById("recordMacro").checked) 
	{
		document.getElementById("macro").innerHTML += "AddLine(" + Math.round(x1) + "," + Math.round(y1) + "," + Math.round(x2) + "," + Math.round(y2) + ")\n";
	}
}

function AddCircle(x,y,r) {
	
    var circle = {
        x: x,
        y: y,
        r: r,
    };

    circleList[circleId] = circle;
    circleId++;

    updateDrawing();
	
	if (document.getElementById("recordMacro").checked) 
	{
		document.getElementById("macro").innerHTML += "AddCircle(" + Math.round(x) + "," + Math.round(y) + "," + Math.round(r) + ")\n";	
	}
}

function AddPoint(x,y) {
    var circle = {
        x: x,
        y: y,
        r: 1,
    };

    circleList[circleId] = circle;
    circleId++;

    updateDrawing();
}

function AddRectangle(x1,y1,w,h) {
    var rectangle = {
            x: x1,
            y: y1,
            w: w,
            h: h,
        };

        rectangleList[rectangleId] = rectangle;
        rectangleId++;
		
		updateDrawing();
		
	if (document.getElementById("recordMacro").checked) 
	{
		document.getElementById("macro").innerHTML += "AddRectangle(" + Math.round(x1) + "," + Math.round(y1) + "," + Math.round(w) + "," + Math.round(h) + ")\n";	
	}
}

function DrawLine(x1, y1, x2, y2) {
    CAD.beginPath();
    CAD.moveTo(x1, y1);
    CAD.lineTo(x2, y2);
    CAD.stroke();
}

function DrawLineObject(lineObj) {
    CAD.beginPath();
    CAD.moveTo(lineObj.spx, lineObj.spy);
    CAD.lineTo(lineObj.epx, lineObj.epy);
    CAD.stroke();
}

function DrawArc(x, y, r, sa, ea) {
    CAD.beginPath();
    CAD.arc(x, y, r, sa, ea);
    CAD.stroke();
}

function DrawCircle(x, y, r) {
    CAD.beginPath();
    CAD.arc(x, y, r, 0, 2 * Math.PI);
    CAD.stroke();
}

function DrawCircleObject(circleObj) {
    CAD.beginPath();
	CAD.arc(circleObj.x, circleObj.y, circleObj.r, 0, 2 * Math.PI);
    CAD.stroke();
}

function DrawRectangleObject(rectangleObj) {
    CAD.beginPath();
    CAD.rect(rectangleObj.x, rectangleObj.y, rectangleObj.w, rectangleObj.h);
    CAD.stroke();
}

function updateStatus()
{
	document.getElementById("zoomInfo").innerHTML = " ( " + currentzoom + " ) ";
	document.getElementById("panInfo").innerHTML = " ( " + Math.round(totalDeltaX) + "," + Math.round(totalDeltaY) + " ) ";
}

function drawTrackers()
{
	if (isMouseDown == true) 
	{
		if (document.getElementById("circleCommand").checked) 
		{
			CAD.strokeStyle = "#00FFFF";
			CAD.setLineDash([1, 2]);
			DrawLine(x1,y1,x,y);
			
			CAD.setLineDash([]);
		}		
		
		if (document.getElementById("lineCommand").checked) 
		{
			var d = getDistance(x1,y1,x,y);
			
			//drawUnitCircle(x1,y1,25);
			
			CAD.strokeStyle = "#FF0000";
			CAD.setLineDash([1, 2]);
			DrawLine(x1,y1,x1+d,y1);
			
			var theta = getAngle(x1,y1,x,y);

			if(y1 <= y)
			{
				let point0 = 
				{
					x: x1,
					y: y1  
				}			
				newPoint0 = getPolar(point0, theta/2, d);			

				CAD.strokeStyle = "#FFFF00";
				drawText(Math.abs(Math.round(radToDeg(theta))), newPoint0);
			
				CAD.strokeStyle = "#00FF00";
			    CAD.setLineDash([1, 2]);
				DrawArc(x1,y1,d,0,theta);	
				
				let point1 = 
				{
					x: x,
					y: y  
				}			
				newPoint1 = getPolar(point1, theta + Math.PI/2, 50);

				CAD.setLineDash([1, 2]);
				DrawLine(point1.x, point1.y, newPoint1.x,newPoint1.y);
				
				let point2 = 
				{
					x: x1,
					y: y1  
				}			
				newPoint2 = getPolar(point2, theta + Math.PI/2, 50);	
				
				CAD.setLineDash([1, 2]);
				DrawLine(point2.x, point2.y, newPoint2.x,newPoint2.y);
				
				CAD.setLineDash([1, 2]);
				DrawLine(newPoint1.x, newPoint1.y, newPoint2.x,newPoint2.y);	
			}
			else
			{
				let point0 = 
				{
					x: x1,
					y: y1  
				}		

				var theta2 = theta/2;
				
				if(x1 > x)
				{
					theta2 = theta/2 + Math.PI;
				}				
				
				newPoint0 = getPolar(point0, theta2 , d);			

				CAD.strokeStyle = "#FFFF00";
				
				if(x1 > x)
				{
					drawText(360-Math.abs(Math.round(radToDeg(theta))), newPoint0);
				}
				else
				{
					drawText(Math.abs(Math.round(radToDeg(theta))), newPoint0);
				}
				
				CAD.strokeStyle = "#00FF00";
				CAD.setLineDash([1, 2]);
				DrawArc(x1,y1,d,theta,0);	
				
				let point1 = 
				{
					x: x,
					y: y  
				}			
				newPoint1 = getPolar(point1, theta - Math.PI/2, 50);

				CAD.setLineDash([1, 2]);				
				DrawLine(point1.x, point1.y, newPoint1.x,newPoint1.y);
				
				let point2 = 
				{
					x: x1,
					y: y1  
				}			
				newPoint2 = getPolar(point2, theta - Math.PI/2, 50);

				CAD.setLineDash([1, 2]);
				DrawLine(point2.x, point2.y, newPoint2.x,newPoint2.y);
				
				CAD.setLineDash([1, 2]);
				DrawLine(newPoint1.x, newPoint1.y, newPoint2.x,newPoint2.y);				
			}
			
			var midPoint = getMidPoint(newPoint1,newPoint2);
			CAD.strokeStyle = "#FFFF00";
			drawText(Math.round(d), midPoint);	
			
			CAD.setLineDash([]);
		}
	}	
}



function drawText(text, point)
{
	CAD.font = "15px Arial";
	CAD.setLineDash([]);
	
	CAD.save();
	CAD.scale(1, -1);
	CAD.strokeText(text, point.x, -point.y);
	CAD.restore();
}


function drawEntities()
{
    for (var id in lineList) {
		if(lineList[id].color != null)
		{
			CAD.strokeStyle = lineList[id].color;
		}
		else
		{
		}
        DrawLineObject(lineList[id]);
    }
	
	CAD.strokeStyle = "#00FFFF";
    for (var id in circleList) {
        DrawCircleObject(circleList[id]);
    }

    CAD.strokeStyle = "#FF00FF";
    for (var id in rectangleList) {
        DrawRectangleObject(rectangleList[id]);
    }
}

function updateCursor()
{
	if (isMouseDown == true) 
	{
		if (document.getElementById("dynamicPan").checked) 
		{			
				canvas.style.cursor='grabbing';		
		}
	}
	else
	{
		if (document.getElementById("dynamicZoom").checked) 
		{			
			if (zoom > 1) 
			{
				canvas.style.cursor='zoom-in';
			}
			else
			{
				canvas.style.cursor='zoom-out';
			}			
		}
		else
		{
			if (document.getElementById("dynamicPan").checked) 
			{			
					canvas.style.cursor='grab';		
			}
			else
			{
				canvas.style.cursor='crosshair';
			}			
		}		
	}
}

function updateDrawing() {
    setupCanvas();
	
	updateStatus();

	drawEntities();		
	
	if (document.getElementById("showUnitCircle").checked) 
    {
		var unitRadius = document.getElementById("unitRadius").value;
		drawUnitCircle(0,0,unitRadius);
	}	
	
	drawTrackers();
	
	updateCursor();
}

function DrawEntitiesFromCloud()
{
	DrawLinesFromCloud();	
	DrawCirclesFromCloud();	
}

function DrawLinesFromCloud() {
	const options = { method: 'GET', headers: { Authorization: '' } };

	fetch('https://localhost:7120/Lines', options)
		.then(response => response.json())
		.then(response => {
			lines = response;

			lines.forEach(line => {
				var x1 = line.x1;
				var y1 = line.y1;
				var x2 = line.x2;
				var y2 = line.y2;

				DrawLine(x1, y1, x2, y2);
			});
		})
		.catch(err => console.error(err));
}

function DrawCirclesFromCloud()
{
	const options = { method: 'GET', headers: { Authorization: '' } };

	fetch('https://localhost:7120/Circles', options)
		.then(response => response.json())
		.then(response =>
		{
			circles = response;

			circles.forEach(circle =>
			{
				var x = circle.x;
				var y = circle.y;
				var radius = circle.radius;

				DrawCircle(x, y, radius);
			});			
		}) 
		.catch(err => console.error(err));
}

function drawUnitCircle(bpx,bpy,r)
{	
	var deltaX = bpx - x;
	var deltaY = bpy - y;	

	var theta = getAngle(bpx,bpy,x,y);
	
	let p = 
			{
				x: bpx,
				y: bpy  
			}			
	q = getPolar(p, theta, r);
	
	xf = q.x; 
	yf = q.y; 
	
	CAD.strokeStyle = "#FFFFFF";
	DrawCircle(bpx,bpy,r);
	DrawLine(bpx,bpy,xf,yf);	
	
	CAD.strokeStyle = "#FF0000";
	DrawLine(bpx,bpy,xf,bpy);
	
	CAD.strokeStyle = "#00FF00";
	DrawLine(xf,bpy,xf,yf);
	
	p = 
		{
			x: xf,
			y: yf  
		}	
	l = y/x;
	console.log(l);
	
	// q = getPolar(p, DegToRad(90+radToDeg(theta)), l*r);	
	// CAD.strokeStyle = "#FF00FF";
	// DrawLine(xf,yf, q.x, q.y);
	
	q = getPolar(p, DegToRad(90+radToDeg(theta))+Math.PI, l*r);	
	CAD.strokeStyle = "#0000FF";
	DrawLine(xf,yf, q.x, q.y);
}


function AddLineFromUI() {
    var x1 = document.getElementById("line.x1").value;
    var y1 = document.getElementById("line.y1").value;
    var x2 = document.getElementById("line.x2").value;
    var y2 = document.getElementById("line.y2").value;

    AddLine(x1, y1, x2, y2);	
}

function AddCircleFromUI() {
    var x = document.getElementById("circle.x").value;
    var y = document.getElementById("circle.y").value;
    var r = document.getElementById("circle.radius").value;

    AddCircle(x, y, r);	
}

function AddRectangleFromUI() {
    var x = document.getElementById("rectangle.x").value;
    var y = document.getElementById("rectangle.y").value;
    var w = document.getElementById("rectangle.w").value;
    var h = document.getElementById("rectangle.h").value;

    AddRectangle(x, y, w, h);
}

document.onmousedown = function (indur) {
    var x2 = indur.clientX - document.getElementById("CAD").getBoundingClientRect().left;
    var y2 = indur.clientY - document.getElementById("CAD").getBoundingClientRect().top;

    if (isInsideCanvas(x2, y2) == false)
        return;

    /*document.getElementById("info").innerHTML = Math.floor(x2) + "," + Math.floor(y2);*/

    x2 = TransformX(x2);
    y2 = TransformY(y2);

    document.getElementById("info2").innerHTML = Math.floor(x2) + "," + Math.floor(y2);

    isMouseDown = true;

    x1 = x2;
    y1 = y2;
}

document.onmousemove = function (indur) {
	
	x = indur.clientX - document.getElementById("CAD").getBoundingClientRect().left;
    y = indur.clientY - document.getElementById("CAD").getBoundingClientRect().top;
	
	x = TransformX(x);
    y = TransformY(y);
	
    var x2 = indur.clientX - document.getElementById("CAD").getBoundingClientRect().left;
    var y2 = indur.clientY - document.getElementById("CAD").getBoundingClientRect().top;

    if (isInsideCanvas(x2, y2) == false)
        return;

    /*document.getElementById("info").innerHTML = Math.floor(x2) + "," + Math.floor(y2);*/

    x2 = TransformX(x2);
    y2 = TransformY(y2);

    document.getElementById("info2").innerHTML = " x = " + Math.floor(x2) + "," + " y = " + Math.floor(y2);

    if (isMouseDown == true) {

        if (document.getElementById("lineCommand").checked) {
            var line = {
                spx: x1,
                spy: y1,
                epx: x2,
                epy: y2,
            };

            lineList[lineId] = line;
        }

        if (document.getElementById("circleCommand").checked) {
            var deltaX = x2 - x1;
            var deltaY = y2 - y1;
            var r = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            var circle = {
                x: x1,
                y: y1,
                r: r
            };

            circleList[circleId] = circle;
        }

        if (document.getElementById("rectangleCommand").checked) {
            var rectangle = {
                x: x1,
                y: y1,
                w: x2 - x1,
                h: y2 - y1,
            };

            rectangleList[rectangleId] = rectangle;
        }

        if (document.getElementById("dynamicPan").checked) {

            var f = 1;

            var deltaX = (x2 - x1) * f;
            var deltaY = (y2 - y1) * f;

            panCanvas(deltaX, deltaY);	
        }
    }

    updateDrawing();
}

document.onmouseup = function (indur) {
    var x2 = indur.clientX - document.getElementById("CAD").getBoundingClientRect().left;
    var y2 = indur.clientY - document.getElementById("CAD").getBoundingClientRect().top;

    if (isInsideCanvas(x2, y2) == false)
        return;

    /*document.getElementById("info").innerHTML = Math.floor(x2) + "," + Math.floor(y2);*/

    x2 = TransformX(x2);
    y2 = TransformY(y2);

    document.getElementById("info2").innerHTML = Math.floor(x2) + "," + Math.floor(y2);

    isMouseDown = false;

    if (document.getElementById("lineCommand").checked) {		
		AddLine(x1,y1,x2,y2);
    }

    if (document.getElementById("circleCommand").checked) {
        var deltaX = x2 - x1;
        var deltaY = y2 - y1;
        var r = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
		
		AddCircle(x1,y1,r);
    }

    if (document.getElementById("rectangleCommand").checked) {		
		var w = x2 - x1;
		var h = y2 - y1;
		AddRectangle(x1,y1,w,h);
    }

    updateDrawing();

    x1 = x2;
    y1 = y2;
}

function disableActiveCommand()
{
	document.getElementById("noneCommand").checked = true;
}

function disableDynamicZoomPan()
{
	document.getElementById("dynamicPan").checked = false;
	document.getElementById("dynamicZoom").checked = false;
}

function ableDynamicZoomPan()
{
	document.getElementById("dynamicPan").checked = true;
	document.getElementById("dynamicZoom").checked = true;
}

function loadMacro()
{
	let scriptTag = document.createElement('script');
	scriptTag.type = 'text/javascript';
	var code = "function executeMacro(){"
	code += document.getElementById("macro").value;
	code += "}";
	scriptTag.innerHTML = code;
	document.head.appendChild(scriptTag);
}	
	
function PlayMacro()
{   
	var state = document.getElementById("recordMacro").checked;
	document.getElementById("recordMacro").checked = false;
	
	loadMacro();
	executeMacro();
	
	document.getElementById("recordMacro").checked = state
}
	
function CustomCommand()
{
	DrawingAutomation();
}

function DrawingAutomation()
{
	AddLine(0,0,100,100)
	AddRectangle(0,0,100,100)
	AddCircle(50,50,50)
}

function f(x)
{
	return x * Math.sin(x)
}

function Plot()
{
	for(x=-25;x<=25;x=x+0.1)
	{
		y = f(x)
		AddPoint(x, y)
	}	
}

