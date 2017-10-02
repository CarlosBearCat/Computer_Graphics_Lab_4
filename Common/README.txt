Common files:

webgl-utils.js: standard utilities from google to set up a webgl context. It 
    provides two functions to get things going:

    function setupWebGL(canvas, opt_attribs);
    function window.requestAnimFrame(callback, element);

    The setupWebGL() function takes care of initializing WebGL for us, as well 
    as pointing the user to a browser that supports WebGL or further troubleshooting 
    if there were errors initializing WebGL. More info on the optional parameters 
    can be found at the WebGL Specification page, section 5.2.1.

    The requestAnimFrame() function provides a cross-browser way of setting up a render callback. 
    The browser will call the function provided in the callback parameter at a regular 
    interval. The element parameter lets the browser know for which element the 
    callback is firing.


MV.js: our matrix/vector package. 

MatrixStack.js:  matrix stack class for storing the model-view matrix in Lab 3 and beyond

initShaders.js: functions to initialize shaders stored in the html file script tags
