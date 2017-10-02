/**
 * Contains all of the parameters needed for controlling the camera.
 * @return {Camera}
 */

//Carlos Luevanos and Eric Keefe
//Lab 4: Camera
function Camera() {

    this.fov = 60;           // Field-of-view in Y direction angle (in degrees)
    this.zNear = 0.1;        // camera's far plane
    this.zFar = 500;         // camera's near plane

// Camera *initial* location and orientation parameters
    this.eye_start = vec4([0, 4, 25, 1]); // initial camera location (needed for reseting)   
    this.VPN = vec4([0, 0, 1, 0]);  // used to initialize uvn
    this.VUP = vec4([0, 1, 0, 0]);  // used to initialize uvn  

// Current camera location and orientation parameters
    this.eye = vec4(this.eye_start);     // camera location
    this.viewRotation;  // rotational part of matrix that transforms between World and Camera coord

    this.calcUVN();  // initializes viewRotation
}

/**
 * Reset the camera location and orientation
 * @return none
 */
Camera.prototype.reset = function () {
    this.eye = vec4(this.eye_start);
    this.calcUVN();
};

/**
 * Calculate the *initial* viewRotation matrix of camera
 * based on VPN and VUP
 * @return none
 */
Camera.prototype.calcUVN = function () {
    //this.viewRotation = mat4(1);  // identity - placeholder only


        //calcUVN worked on both by Carlos and Eric

// TO DO:  COMPLETE THIS CODE
    var n = vec4(normalize(this.VPN, true)); //normalize VPN
    var u = vec4(normalize(cross(n, this.VUP),true)); //take the cross product of n and p, then normalise it
    var v = vec4(cross(u, n)); //take the cross product of u and n
    var l = vec4(0, 0, 0, 1);

    this.viewRotation = [u, v, negate(n), l]; //rotation matrix
    this.viewRotation.matrix = true; //set it to true
};

/**
 * Calculate the camera's view matrix given the 
 * current eye and viewRotation
 * @return view matrix (mat4)
 */
Camera.prototype.calcViewMat = function () {
    var mv = mat4(1);  // identity - placeholder only
    //equals R-1*T-1
// TO DO:  COMPLETE THIS CODE

            //negative identity matrix we need
	var eyeTranslate = [vec4(1, 0, 0, -this.eye[0]), vec4(0, 1, 0, -this.eye[1]), vec4(0, 0, 1, -this.eye[2]), vec4(0, 0, 0, 1)];
     eyeTranslate = inverse4(eyeTranslate);
     mv = mult(this.viewRotation, eyeTranslate); // multiply R^-1 T^-1
    return mv; //return the view matrix
};

/** 
 * Calculate the camera's projection matrix. Here we 
 * use a perspective projection.
 * @return the projection matrix
 */
Camera.prototype.calcProjectionMat = function () {
    aspect = canvas.width / canvas.height;
    return perspective(this.fov, aspect, this.zNear, this.zFar);
};

/**
 * Update the camera's eye and viewRotation matrices 
 * based on the user's mouse actions
 * @return none
 */
Camera.prototype.motion = function () {

    switch (mouseState.action) {
        case mouseState.actionChoice.TUMBLE:  // left mouse button
            // amount of rotation around axes 
            var dy = -0.05 * mouseState.delx;  // angle around y due to mouse drag along x
            var dx = -0.05 * mouseState.dely;  // angle around x due to mouse drag along y

            var ry = rotateY(10 * dy);  // rotation matrix around y
            var rx = rotateX(10 * dx);  // rotation matrix around x

//          TO DO: NEED TO IMPLEMENT TUMBLE FUNCTION
            this.tumble(rx, ry);   //  <----  NEED TO IMPLEMENT THIS FUNCTION BELOW!!!
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.TRACK:  // PAN   - right mouse button
            var dx = -0.05 * mouseState.delx; // amount to pan along x
            var dy = 0.05 * mouseState.dely;  // amount to pan along y
            //  TO DO: NEED TO IMPLEMENT HERE
            //  Calculate this.eye
            this.eye = mult(rotateX(dy), this.eye);
            this.eye = mult(rotateY(dx), this.eye);



            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        case mouseState.actionChoice.DOLLY:   // middle mouse button
            var dx = 0.05 * mouseState.delx;  // amount to move backward/forward
            var dy = 0.05 * mouseState.dely;
            //   TO DO: NEED TO IMPLEMENT HERE
            //  Calculate this.eye
            this.viewRotation = mult(translate(0,0,dy, 1), this.viewRotation);
       //     this.eye = mult(translate(0,0, -dx*dy,1),this.eye);
            mouseState.startx = mouseState.x;
            mouseState.starty = mouseState.y;
            break;
        default:
            console.log("unknown action: " + mouseState.action);
    }
    render();
};

/**
 * Rotate about the world coordinate system about y (left/right mouse drag) and/or 
 * about a line parallel to the camera's x-axis and going through the WCS origin 
 * (up/down mouse drag).
 * @param {mat4} rx  rotation matrix around x
 * @param {mat4} ry  rotation matrix around y
 * @return none
 */
Camera.prototype.tumble = function (rx, ry) {
    // TO DO:  IMPLEMENT THIS FUNCTION
    // We want to rotate about the world coordinate system along a direction parallel to the
    // camera's x axis. We first determine the coordinates of the WCS origin expressed in the eye coordinates.
    // We then translate this point to the camera (origin in camera coordinates) and do a rotation about x.
    // We then translate back. The result is then composed with the view matrix to give a new view matrix.
    //  When done, should have new value for eye and viewRotation

    // DO THIS CONTROL LAST - IT IS THE MOST DIFFICULT PART
    tumblePoint = vec4(0, 0, 0, 1);
    var view = this.calcViewMat();  // current view matrix

    var pPrime = mult(view, tumblePoint); //pPrime matrix

        //matrix A, T(P) R_y T(-P)
 var matA = mult(translate(tumblePoint[0], tumblePoint[1], tumblePoint[2],1), mult(ry, translate(-tumblePoint[0], -tumblePoint[1], -tumblePoint[2] ,1)), view);
        //matrix B, T(P') R_x T(-P')
 var matB = mult(translate(pPrime[0], pPrime[1], pPrime[2],1), mult(rx, translate(-pPrime[0], -pPrime[1], -pPrime[2] ,1)), view);

var viewNew = mult(mult(matB,view), matA); //viewNew = B*view*A

    var rotation = mat4Copy(viewNew); //copy the matrix
            //set the last column scalars to 0
    rotation[0][3] = 0;
    rotation[1][3] = 0;
    rotation[2][3] = 0;
        //set the view rotation to the copy
    this.viewRotation = rotation;

        //do the inverse of the rotation matrix
   var rotInverse = inverse4(rotation);
        // eyemat  = rotInv * viewNew matrix
   var eyeMat = mult(rotInverse, viewNew);
        //get the x y z elements and set them to the eye
   this.eye[0] = eyeMat[0][3];
   this.eye[1] = eyeMat[1][3];
   this.eye[2] = eyeMat[2][3];




    // need to get eye position back
    //  Here, rotInverse is the inverse of the rotational part of the view matrix.
    //  eye = -rotInverse*view*origin  -> this gives the location of the WCS origin in the eye coordinates


};

Camera.prototype.keyAction = function (key) {
    var alpha = 1.0;  // used to control the amount of a turn during the flythrough
    //var dog = scale(1.0,[1,1,1,1]);
    switch (key) {     // different keys should be used because these do thing sin browser
        case 'W':  // turn right - this is implemented
            console.log("turn left");
            this.viewRotation = mult(rotateY(alpha), this.viewRotation);
            break;
        case 'E':   // turn left
            console.log("turn right");
            // IMPLEMENT
            this.viewRotation = mult(rotateY(-alpha), this.viewRotation); //doing the opposite of the left, hence why alpha is negative
            break;
        case 'S':  // turn up   
            console.log(" turn up");
            // IMPLEMENT
            this.viewRotation = mult(rotateX(alpha), this.viewRotation); //rotate about X axis
            break;
        case 'D':  // turn down
            console.log("turn down");
            // IMPLEMENT
            this.viewRotation = mult(rotateX(-alpha), this.viewRotation); //rotate about X, alpha is the opposite
            break;
        case 'X':  // bank right
            console.log("bank right");
            // IMPLEMENT
            this.viewRotation = mult(rotateZ(-alpha), this.viewRotation); //rotate about Z axis
            break;
        case 'C':  // bank left
            console.log("bank left");
            // IMPLEMENT
            this.viewRotation = mult(rotateZ(alpha), this.viewRotation); //rotate about Z, alpha is the opposite

            break;
        case 'Q':  // move forward
            console.log("move forward");
            this.eye = add(this.eye, scale(alpha, this.viewRotation[2]));
            break;

        case 'A':  //  move backward
            console.log("move backward");
            // IMPLEMENT
            this.eye = add(this.eye, scale(-alpha, this.viewRotation[2]));
            break;
        case 'R':  //  reset
            console.log("reset");
            this.reset();
            break;
    }
};