//Eric Keefe lab 2 
//this function creates a disc of radius 1, which is drawn in the x y plane.

function Disc() {

    this.name = "disc";

    this.numTriangles = 32;
    this.numVertices = this.numTriangles * 3;
    

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    // var unique_vertices = [
    //     vec4(0, 0, 0, 1.0),  // v0 //center vertex
    //     vec4(Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 1.0),   // v1
    //     vec4(Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0, 1.0),   // v2
        
    //     // vec4(1.0, 1.0, 0, 1.0),    // v3
    //     // vec4(-1.0, -1.0, 0, 1.0), // v4
    //     // vec4(1.0, -1.0, 0, 1.0),  // v5
    //     // vec4(-1.0, 1.0, 0, 1.0),  // v6
    //     // vec4(1.0, 1.0, 0, 1.0)    // v7
    //     // vec4(1.0, 1.0, 0, 1.0)    // v8
    // ];

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

   
    for (var i = 0; i < this.numTriangles; i++){
        
        this.vertices[i*3] = vec4(0, 0, 0, 1.0);
        var angle1 = (2 * Math.PI * i)/this.numTriangles;

        this.vertices[i*3+1] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0); 
        var angle2 = angle1 + 2 * Math.PI/this.numTriangles;
        this.vertices[i*3+2] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0); 
    }
   

    for (var i = 0; i < this.numVertices; i++){
        //this.vertices[i] = unique_vertices[i];
        this.colors[i] = vert_colors[Math.floor(i/3)%2];
    }

    // var vert_colors = [
    //     vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
    //     vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
    //     vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
    //     vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
    //     vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
    //     vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
    //     vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
    //     vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
    // ];
    
    // // Local variable:  Indices into the above vertices and colors arrays
    // var indices = [
    //     0, 1, 2, 2, 1, 3, // front
    //     5, 4, 7, 7, 4, 6, // back
    //     4, 0, 6, 6, 0, 2, // left
    //     1, 5, 3, 3, 5, 7, // right
    //     2, 3, 6, 6, 3, 7, // top
    //     4, 5, 0, 0, 5, 1  // bottom
    // ];


    // // These are the actual vertices and colors to be placed in the vertex buffers.

    // for (var i = 0; i < 6; i++) {  // 6 faces
    //     norm = face_normals[i];
    //     for (var j = 0; j < 6; j++) {   // each face has 6 vertices (2 triangles)
    //         var k = i * 6 + j;
    //         var q = indices[k];
    //         this.vertices[k] = unique_vertices[q];
    //         this.colors[k] = vert_colors[q];
    //         this.normals[k] = norm;
    //         this.texCoords[k] = face_tex_coords[j];
    //     }
    // }
}