//Eric Keefe and DJ Guiton Lab 3
//MAkes a robot
//press up arrow key to rotate everything
//press left and right arrow key to move 

var startX;
var startY;
var startZ;
var scal;

// var fullRot = 0;
//
// var wheelAngle = -15;
// var translateX = 0;

var bodyRad = 2; //we don't scale by 2 since the cube automatically has radius 2
var wheelScale = 0.5;

function Robot(x, y, z, s){
	
	this.name = "robot";
	startX = x;
	startY = y;
	startZ = z;
	scal = s;

}

Robot.prototype.draw = function(){
	//this.drawMat();
	stack.push();
	// this.move();
	
	stack.multiply(translate(startX, startY, startZ));
    stack.multiply(scalem(scal, scal, scal));
    
    
    // if (Math.floor(fullRot/90)%4 == 1 || Math.floor(fullRot/90)%4 == 3){
    //    	stack.multiply(translate(0, 0, translateX));
    // }else{
    // 	stack.multiply(translate(translateX, 0, 0));
    // }
    
   
    
    

    // stack.multiply(rotateY(fullRot));
    
    this.drawBody();
    this.drawWheels();
    this.drawNeck();
    this.drawHead();
    this.drawEyes();
    this.drawNose();
    stack.pop();
        
};

Robot.prototype.drawBody = function(){
	 // Draw The body  
    stack.push(); 
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set modelview transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cube);    // draw cube
    stack.pop(); //stack back to original viewmat
};

Robot.prototype.drawWheels = function(){
	
	this.drawWheel(wheelScale, bodyRad/2, bodyRad/2);
	this.drawWheel(wheelScale, -bodyRad/2, bodyRad/2);
	this.drawWheel(wheelScale, bodyRad/2, -bodyRad/2 -wheelScale);
	this.drawWheel(wheelScale, -bodyRad/2, -bodyRad/2 - wheelScale);


};

Robot.prototype.drawWheel = function(scal, xT, zT){
	stack.push();


	
	
		
	stack.multiply(translate(xT,-bodyRad/2,zT));

	
		
	
	// stack.multiply(rotateZ(wheelAngle));
	

	
    
    stack.multiply(scalem(scal,scal,scal));

    //stack.multiply
   

    //viewMat = mult(viewMat, translate(-2.5,0,0)); // update modelview transform
    //viewMat = mult(viewMat, scalem(1,2,1));   // update modelview transform
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
    Shapes.drawPrimitive(Shapes.cylinder);  // draw disc
    stack.pop();
	


};

Robot.prototype.drawEyes = function(){
	stack.push();
	stack.multiply(rotateY(90));
	
	this.drawEye(bodyRad/8, -0.52);
	this.drawEye(-bodyRad/8, -0.52);
	this.drawEye(bodyRad/8, 0.36);
	this.drawEye(-bodyRad/8, 0.36);
	stack.pop();

};

Robot.prototype.drawEye = function(xT, zT){
	stack.push();
	stack.multiply(translate(xT, 2.5, zT));
	stack.multiply(scalem(0.2, 0.2, 0.2));
	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.disc);
	stack.pop();


};

Robot.prototype.drawNose = function(){
	
	
	stack.push();
	
	stack.multiply(translate(0, 2.25, 0.0));
	stack.multiply(rotateY(90));
		
	stack.multiply(scalem(0.25, 0.25, 0.75));
	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.cone);
	stack.pop();

	stack.push();
	
	stack.multiply(translate(0, 2.25, -0.0));
	stack.multiply(rotateY(-90));
	
	
	stack.multiply(scalem(0.25, 0.25, 0.75));
	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.cone);
	stack.pop();



};



Robot.prototype.drawHead = function(){
	stack.push();

	
	stack.multiply(translate(bodyRad/4, bodyRad*(2.25/2), 0.0));
	stack.multiply(rotateY(90));
	stack.multiply(scalem(bodyRad*(0.75/2), bodyRad *(0.75/2), bodyRad*(0.75/2)));

	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.cylinder);
	stack.pop();
};

Robot.prototype.drawNeck = function(){
	stack.push();
	stack.multiply(translate(0, bodyRad/2, 0.0));
	stack.multiply(scalem(0.25, 0.5, 0.25));
	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.cube);
	stack.pop();
};

Robot.prototype.drawMat = function(){
	stack.push();
	stack.multiply(translate(0, -bodyRad, 0));
	stack.multiply(scalem(32, 0.1, 32));
	gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top())); // set view transform
    gl.uniform4fv(uColor, vec4(0.647059, 0.164706,  0.164706, 1.0));  // set color to red
	Shapes.drawPrimitive(Shapes.cube);
	stack.pop();
};


// Robot.prototype.move = function(){
//
// 	document.onkeydown = checkKey;
//
// 	function checkKey(e) {
//
//     	e = e || window.event;
//
//     if (e.keyCode == '37') { //left arrow
//         wheelAngle+=90;
//         translateX+=-0.1;
//     }
//     else if (e.keyCode == '39') { //right arrow
//        wheelAngle-=90;
//         translateX+=0.1;
//     }
//     else if(e.keyCode == '38'){
//     	fullRot += 90;
//
//     }
//
// 	}
// };

