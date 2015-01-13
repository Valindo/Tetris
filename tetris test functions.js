function Blocks (pos_x,pos_y) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.state = 0;
}

//Temp Grid ( SuperImpose )
function Superimpose () {
	this.temp_grid = [[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],];
}	

var current_x = 0;
var current_y = 0;

Superimpose.prototype.newShape = function(shape_object) {
var m = 0;
var n = 0;
	for ( var i = current_x; i < current_x+3; i++,m++ ){
		for ( var j = current_y; j < current_y+3; j++,n++ ){
			this.temp_grid[i][j] = shape_object.dimension[m][n];
			}
		n=0;
		}
}


function move_down(shape_object){

	var m = 0;
	var n = 0;
	//First switch the current positions of the shape to 0
	for(i= current_x; i <current_x+ shape_object.size_of; i++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++)
		{
			superimpose.temp_grid[i][j] = 0;
		}
	}

	current_x++;

	//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			superimpose.temp_grid[i][j] = shape_object.dimension[m][n];
		}
		n=0;
	}
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

var shapes = new Shape_T();

var superimpose = new Superimpose();
//superimpose.init_super();

var t = new Shape_T();

function display() {
alert(superimpose.temp_grid[0] + "\n" + superimpose.temp_grid[1] + "\n" + superimpose.temp_grid[2] + "\n" + superimpose.temp_grid[3] + "\n" + superimpose.temp_grid[4] + "\n" + superimpose.temp_grid[5] + "\n" + superimpose.temp_grid[6] + "\n" + superimpose.temp_grid[7] + "\n" + superimpose.temp_grid[8] + "\n" + superimpose.temp_grid[9] + "\n" );
}

superimpose.newShape(shapes);
display();
// move_down(shapes);

// display();
setInterval(function(){
move_down(shapes);
display();
},3000);
