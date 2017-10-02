//Eric Keefe lab 2 
//this function creates a cone with base radius 1, which is orientated such that it's height is in the z plane

function Cone() {

    this.name = "cone";

    this.numTriangles = 32; 
    this.numVertices = this.numTriangles * 3;
    
    var discTriangles = this.numTriangles/2;

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var unique_vertices = [
        vec4(0, 0, 0, 1.0),  // v0 //center vertex
        vec4(Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 1.0),   // v1
        vec4(Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0, 1.0)   // v2
    ];

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
        
        this.vertices[i*6] = vec4(0, 0, 0, 1.0);
        this.colors[i*6] = vert_colors[i%2];
        var angle1 = (2 * Math.PI * i)/discTriangles;

        this.vertices[i*6+1] = vec4(Math.cos(angle1), Math.sin(angle1),0, 1.0); 
        this.colors[i*6 + 1] = vert_colors[i%2];
        var angle2 = angle1 + 2 * Math.PI/discTriangles;
        this.vertices[i*6+2] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 
        this.colors[i*6 + 2] = vert_colors[i%2];

        this.vertices[i*6 + 3] = vec4(0, 0, 1.0, 1.0);
        this.colors[i*6 + 3] = vert_colors[i%2];
        this.vertices[i*6+4] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 
        this.colors[i*6 + 4] = vert_colors[i%2];
        this.vertices[i*6+5] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        this.colors[i*6 + 5] = vert_colors[i%2];
    }
   

    

   
    
}