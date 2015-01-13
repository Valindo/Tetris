//Every individual block in the grid
function Blocks (pos_x,pos_y) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.state = 0;
}
//This is the whole Grid
function Grid() {
	this.dimension = []; // Have an array here to hold all the values of the grid
}
//Decalres every element in the grid
Grid.prototype.init_grid = function() {
	for ( var i = 0; i < 5; i++ ){
		this.dimension[i] = [];
		for ( var j = 0; j < 5; j++ ){
			this.dimension[i][j] = new Blocks(i,j); 
		}
	}
}

//Temp Grid ( SuperImpose )
function Superimpose () {
	this.temp_grid = [];
}

//Grid Init
Superimpose.prototype.init_super = function() {
	for ( var i = 0; i < 5; i++ ){
		this.temp_grid[i] = [];
		for ( var j = 0; j < 5; j++ ){
			this.temp_grid[i][j] = new Blocks(i,j);
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


// Superimpose.prototype.copyShape = function(shape_object){
// 	var state = 0;
// 	for ( var i = 0; i < shape_object.size_of; i++ ){
// 		for ( var j = 0; j < shape_object.size_of; j++ ){
// 			if ( this.collisionDetection(shape_object, i, j) ){
// 				state = 1;
// 			}
// 		}
// 	}

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

var grid = new Grid();
var shapes = new Shape_Square();
var superimpose = new Superimpose();
var t = new Shape_T();
grid.init_grid();


// rotate(t,1);
// rotate(t,2);
// rotate(t,3);



// for ( var i = 0; i< 5; i++ ){
// 	for ( var j = 0; j<5; j++ ){
// 		console.log(grid.dimension[i][j]);
// 	}
// 	console.log("\n");
// }

// console.log(shapes.array_shape[0]);


function rotate (shape_object,rotation) {
	window.alert("Problem is here");
	var temp_shape = shape_object;

	if ( rotation === 4 ){
		rotation = 0;
	}

	// erase_object(shape_object);

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

function erase_object(shape_object){
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for ( var j = 0; j < shape_object.size_of; j++ ){
			shape_object.dimension[i][j] = 0;
		}
	}
	return;
}

function case_0 (temp_shape,shape_object) {
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for ( var j = 0; j < shape_object.size_of; j++ ){
			shape_object.dimension[i][j];// = temp_shape.dimension[i][j]
		}
	}
}

function case_1 (temp_shape,shape_object) {
	var m = 0;
	var n = 0;
	for ( var i = 0; i < shape_object.size_of; i++,m++ ){
		for ( var j = shape_object.size_of - 1; j >=0; j--,n++ ){
			// shape_object.dimension[m][n] = 
			window.alert(temp_shape.dimension[j][i]);
		}
		console.log("\n");
	}
}

function case_2 (temp_shape,shape_object) {
	window.alert("Problem is here");
	var m = 0;
	var n = 0;
	for ( var i = shape_object.size_of-1; i >= 0; i--,m++ ){
		for ( var j = shape_object.size_of - 1; j >=0; j--,n++ ){
			//shape_object.dimension[m][n] = 
			window.alert(temp_shape.dimension[i][j]);
		}
		console.log("\n");
	}	
	// print(shapes);
}

function case_3 (temp_shape,shape_object) {
	var m = 0;
	var n = 0;
	for ( var i = shape_object.size_of-1; i >= 0; i--,m++ ){
		for ( var j = 0; j < shape_object.size_of; j++,n++ ){
			//shape_object.dimension[m][n] = 
			window.alert(temp_shape.dimension[j][i]);
		}
		console.log("\n");
	}	
}

// function print(shape_object){
// 	for ( var i = 0; i < shape_object.size_of; i++ ){
// 		for ( var j = 0; j < shape_object.size_of; j++ ){
// 			console.log(shape_object.dimension[i][j]);
// 		}
// 		console.log("\n");
// 	}
// }


rotate(t,2);
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
			this.temp_grid[i][j] = 0;
			console.log(i +"\t" +j);
		}
	}
	console.log("\n");
	current_x++;		//Update the current positon of the square 

	//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			this.temp_grid[i][j] = shape_object.dimension[m][n];
			console.log(m + "\t" + n);
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