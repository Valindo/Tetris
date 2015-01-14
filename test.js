//Specify the Number of rows and columns
var rows = 20;
var cols = 12;
var padding = 25;
var canvas_width = 300;
var canvas_height = 500;
//Every individual block in the grid
function Blocks (pos_x,pos_y) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.state = 0;
}
//This is the whole Grid
function Grid(rows,cols) {
	this.dimension = []; // Have an array here to hold all the values of the grid
	this.rows = rows;
	this.cols = cols;
}

function Shape_Square(){					
	this.dimension = [[1,1,0],
					  [1,1,0]
					  [0,0,0]];
	this.size_of = 2;
}

function Shape_T(){
	this.dimension = [[1,1,1],
					  [0,1,0],
					  [0,0,0]];
	this.size_of = 3;
}

function Shape_Z(){
	this.dimension = [[1,1,0],
					  [0,1,1],
					  [0,0,0]];
	this.size_of = 3;
}

function TempShape (size_of) {
	this.dimension = [[0,0,0],
					  [0,0,0],
					  [0,0,0]];
	this.size_of = size_of;
}

//Decalres every element in the grid
Grid.prototype.init_grid = function() {
	for ( var i = 0; i < this.rows; i++ ){
		this.dimension[i] = [];
		for ( var j = 0; j < this.cols; j++ ){
			this.dimension[i][j] = new Blocks(i*padding,j*padding); 
		}
	}
}

//Temp Grid ( SuperImpose )
function Superimpose (rows,cols) {
	this.temp_grid = [];
	this.rows = rows;
	this.cols = cols;
}

//Grid Init
Superimpose.prototype.init_super = function() {
	for ( var i = 0; i < this.rows; i++ ){
		this.temp_grid[i] = [];
		for ( var j = 0; j < this.cols; j++ ){
			this.temp_grid[i][j] = new Blocks(i*padding,j*padding);
		}
	}
};

Superimpose.prototype.newShape = function(shape_object) {
	var valid_state = 0;
	for ( var i = 0; i < 3; i++ ){
		for ( var j = 0; j < 3; j++ ){
			if ( this.temp_grid[i][j] != 0 ){
				valid_state = 1;
			}
		}
	}

	if (valid_state === 0){
		for ( var i = 0; i < 3; i++ ){
			for ( var j = 0; j < 3; j++ ){
				this.temp_grid[i][j] = shape_object[i][j];
			}
		}
	}
	else{
		console.log("Go cry to yer Momma");
	}
};


Superimpose.prototype.copyShape = function(shape_object){
	var state = 0;
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for ( var j = 0; j < shape_object.size_of; j++ ){
			// if ( this.collisionDetection(shape_object, i, j) ){
			if ( shape_object.dimension[i][j] === 1){
				this.temp_grid[i][j].state = 1;
			}
		}
	}
};

Superimpose.prototype.printSuper = function() {
	for( var i = 0; i < 300; i+=padding ){
		for ( var j = 0; j < 500; j+=padding ){
			var m = i/padding; //Had to do this because of the Indexing, Yes it is a bitch
			var n = j/padding;
			if ( this.temp_grid[n][m].state === 1 ){
				ctx.fillStyle = "#f39c12";
			}
			else{
				ctx.fillStyle = "#3498db";
			}
			ctx.fillRect(i,j,padding,padding);
		}
	}	
};

Grid.prototype.printGrid = function(superimpose_grid) {
	for ( var i = 0; i < canvas_height; i+=padding ){
		for ( var j = 0; j < canvas_width; j+=padding ){
			var m = i/padding;
			var n = j/padding;
			// Debugginf purposed
			if ( this.dimension[m][n].state === 1){
				ctx.fillStyle = "#f39c12";
			}
			else{
				ctx.fillStyle = "#3498db";
			}
			ctx.fillRect(j,i,padding,padding);
		}
	}
};

Grid.prototype.copySuperimpose = function(super_object) {
	for ( var i = 0; i < rows; ++i ){
		for ( var j = 0; j < cols; ++j ){
			if ( superimpose.temp_grid[i][j].state === 1 ){
				this.dimension[i][j].state = superimpose.temp_grid[i][j].state;
			}
		}
	}
};

// 	if ( state === 1 ){
// 		console.log("Invalid move");
// 	}
// };

// // Collision detection
// Superimpose.prototype.collisionDetection = function(shape_object,i,j) {
// 	if ( this.temp_grid[i][j] === 1 && shape_object.dimension[i][j] === 1 ){
// 		return 1;
// 	}
// 	return 0;
// };



var grid = new Grid(rows,cols);
grid.init_grid();
var superimpose = new Superimpose(rows,cols);
superimpose.init_super();
var t = new Shape_Z();

var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");
superimpose.copyShape(t);
grid.copySuperimpose(superimpose);
// superimpose.printSuper();
grid.printGrid(superimpose);
// for ( var i = 0; i < 300; i+=padding){
// 	for ( var j = 0; j < 500; j+=padding ){
// 		var m = i/padding; //Had to do this because of the Indexing, Yes it is a bitch
// 		var n = j/padding;
// 		if (superimpose.temp_grid[n][m].state === 1){
// 			ctx.fillStyle = "#f39c12";
// 		}
// 		else{
// 			ctx.fillStyle = "#3498db";
// 		}
// 		ctx.fillRect(i,j,padding,padding);
// 	}
// }

Superimpose.prototype.rotateShape = function(shapeObject,rotationDegree) {
	var sandboxShape = new TempShape(shapeObject.size_of);
	if ( rotationDegree === 4 ){
		rotationDegree = 0;
	}

	switch(rotationDegree){
		case 0:
			//Orientation : 0 degrees
			for ( var i = 0; i < shapeObject.size_of; i++ ){
				for ( var j = 0; j < shapeObject.size_of; j++ ){
					sandboxShape.dimension[i][j] = shapeObject.dimension[i][j];
				}
			}
			break;
		case 1:
			var m = 0;
			var n = 0;
			for ( var i = 0; i < shapeObject.size_of; i++,m++ ){
				for ( var j = shapeObject.size_of - 1; j >=0; j--,n++ ){
					sandboxShape.dimension[m][n] = shapeObject.dimension[j][i];
				}
			}
			break;
		case 2:

			case_2(temp_shape,shape_object);
			break;
		case 3:
			case_3(temp_shape,shape_object);
			break;
	}

};

function rotate (shape_object,rotation) {
	var temp_shape = new TempShape(shape_object.size_of);

	if ( rotation === 4 ){
		rotation = 0;
	}

	// Copy Contents of Shape_object to temp_shape
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for (var j = 0; j < shape_object.size_of; j++ ){
			temp_shape.dimension[i][j] = shape_object.dimension[i][j];
		}
	}
	//erase object Shape_object
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for (var j = 0; j < shape_object.size_of; j++ ){
			shape_object.dimension[i][j] = 0;
		}
	}

	switch(rotation){
		case 0:
			case_0(temp_shape,shape_object);
			break;
		case 1:

			case_1(temp_shape,shape_object);
			break;
		case 2:

			case_2(temp_shape,shape_object);
			break;
		case 3:
			case_3(temp_shape,shape_object);
			break;
		default:
			window.alert("Problem is here");
			break;
	}

}

function case_0 (temp_shape,shape_object) {
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for ( var j = 0; j < shape_object.size_of; j++ ){
			shape_object.dimension[i][j] = temp_shape.dimension[i][j];
		}
	}
}

function case_1 (temp_shape,shape_object) {
	var m = 0;
	var n = 0;
	for ( var i = 0; i < shape_object.size_of; i++,m++ ){
		for ( var j = shape_object.size_of - 1; j >=0; j--,n++ ){
			shape_object.dimension[m][n] = temp_shape.dimension[j][i];
		}
		
	}
}

function case_2 (temp_shape,shape_object) {
	window.alert("Problem is here");
	var m = 0;
	var n = 0;
	for ( var i = shape_object.size_of-1; i >= 0; i--,m++ ){
		for ( var j = shape_object.size_of - 1; j >=0; j--,n++ ){
			shape_object.dimension[m][n] = temp_shape.dimension[i][j];
		}
		
	}	
}

function case_3 (temp_shape,shape_object) {
	var m = 0;
	var n = 0;
	for ( var i = shape_object.size_of-1; i >= 0; i--,m++ ){
		for ( var j = 0; j < shape_object.size_of; j++,n++ ){
			shape_object.dimension[m][n] = temp_shape.dimension[j][i];
		}
		console.log("\n");
	}	
}


var current_x = 0;
var current_y = 0;
function move_down(shape_object){

	var m = 0;
	var n = 0;
	//First switch the current positions of the shape to 0
	for(i= current_x; i <current_x+ shape_object.size_of; i++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++)
		{
			superimpose.temp_grid[i][j] = 0;
			// console.log(i +"\t" +j);
		}
	}

	// console.log("\n");
	current_x++;

	//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			superimpose.temp_grid[i][j] = shape_object.dimension[m][n];
			// console.log(m + "\t" + n);
		}
		n=0;
	}
}

function move_left(shape_object){
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.size_of; i++)
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++)
		{
			this.temp_grid[i][j] = 0;
			//console.log(i +"\t" +j);
		}
	}

current_y--;		//Update the current positon of the square 

//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			this.temp_grid[i][j] = shape_object.dimension[m][n];
			//console.log(i + "\t" + j);
		}
		n=0;
	}
}	

function move_right(shape_object){
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.size_of; i++)
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++)
		{
			this.temp_grid[i][j] = 0;
			//console.log(i +"\t" +j);
		}
	}

current_y++;		//Update the current positon of the square 

//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			this.temp_grid[i][j] = shape_object.dimension[m][n];
			//console.log(i + "\t" + j);
		}
		n=0;
	}
}	
