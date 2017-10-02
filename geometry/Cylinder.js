//Eric Keefe lab 2 
//this function creates a cylinder with base radius 1, which is orientated such that it's height is in the z plane

function Cylinder() {

    this.name = "cylinder";

    this.numTriangles = 128; 
    this.numVertices = this.numTriangles * 3;
    var discTriangles = this.numTriangles/4;
    

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    




    var vert_colors = [
        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
        vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
    ];

   
    for (var i = 0; i < discTriangles; i++){
        
        this.vertices[i*12] = vec4(0, 0, 0, 1.0);
        var angle1 = (2 * Math.PI * i)/discTriangles;

        this.vertices[i*12+1] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        var angle2 = angle1 + 2 * Math.PI/discTriangles;
        this.vertices[i*12+2] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 

          

        this.vertices[i*12 + 6] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0);
        this.vertices[i*12+7] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        this.vertices[i*12+8] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 

      

        this.vertices[i*12+9] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0);
        this.vertices[i*12+10] = vec4(Math.cos(angle1), Math.sin(angle1), 1.0, 1.0); 
        this.vertices[i*12+11] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0); 

        this.vertices[i*12 + 3] = vec4(0, 0, 1.0, 1.0);
        this.vertices[i*12+4] = vec4(Math.cos(angle1), Math.sin(angle1), 1.0, 1.0); 
        this.vertices[i*12+5] = vec4(Math.cos(angle2), Math.sin(angle2), 1.0, 1.0); 
    }
   

    for (var i = 0; i < this.numVertices; i++){
        //this.vertices[i] = unique_vertices[i];
        this.colors[i] = vert_colors[Math.floor((i/12))%4+2];
    }

   
}