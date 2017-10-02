function Axis() {
    this.name = "axis";
    this.len = 15.0;  // how long each axis is
    
    this.vertices = [
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(this.len, 0.0, 0.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(0.0, this.len, 0.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(0.0, 0.0, this.len, 1.0)
    ];
    

}

Axis.prototype.initBuffer = function() {
    this.vertexBuffer = gl.createBuffer();   
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

Axis.prototype.draw = function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));   // x-axis
    gl.drawArrays(gl.LINES, 0, 2);
    
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));  // y-axis
    gl.drawArrays(gl.LINES, 2, 2);
    
    gl.uniform4fv(uColor,vec4(0.0, 0.0, 1.0, 1.0));   // z-axis
    gl.drawArrays(gl.LINES, 4, 2);

    gl.disableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

};


