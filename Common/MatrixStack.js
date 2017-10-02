/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Create a new stack. Place identity at top.
 * @return {MatrixStack}
 */
function MatrixStack() {
    this.m = [mat4(1)];  // loads identity?
}

MatrixStack.prototype.clear = function () {
    this.m = [mat4(1)];
};

/**
 * pushes the top onto the stack so that the top two elements are identical
 * @param mat4 to place on top of stack
 * @return {undefined}
 */
MatrixStack.prototype.push = function () {
    var t = mat4Copy(this.m[this.m.length - 1]);
    this.m.push(t);
};
/**
 * Remove the top of stack and return 
 * @return the top of stack
 */
MatrixStack.prototype.pop = function () {
    if (this.m.length == 0) {
        throw "Nothing on stack to pop.";
    }
    return this.m.pop();
};

/**
 * Multiply the top of the stack on right by mp and replace the
 * top with the resulting product.
 * @param {type} mp  the matrix to be multiplied by top
 * @return 
 */
MatrixStack.prototype.multiply = function (mp) {
    var index = this.m.length - 1;
    this.m[index] = mult(this.m[index], mp);
};


/**
 * 
 * @return a copy of the top of the stack
 */
MatrixStack.prototype.top = function () {
    return mat4Copy(this.m[this.m.length - 1]);
};

/**
 *  print to console the elements of stack starting at top
 * @return {undefined}
 */
MatrixStack.prototype.print = function () {
    console.log("Stack contains " + this.m.length + " items");
    for (i = this.m.length - 1; i >= 0; i--) {
        console.log("Item " + i + ":\n");
        printm(this.m[i]);
    }
};





