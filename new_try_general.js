function Grid () {
	this.dimension =   [[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false]];
}

Grid.prototype.display = function() //Function to display the grid
	{
		alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]+"\n"+grid.dimension[4]+"\n"+grid.dimension[5]+"\n"+grid.dimension[6]+"\n"+grid.dimension[7]); 
	}

function Shape () {
	this.shape_sqr =   [[true,true],
						[true,true]];
	this.size_sqr = 2;
	this.current_top_left_corner = [0,0];				//Initializing variables that will hold current pos of sqaure
	this.current_bottom_right_corner = [0,0];


} 

var grid = new Grid();		//object of class Grid
var shape = new Shape();	//object of class Shape

grid.display();

function enter_sqaure_into_grid()  //At the top of the grid, the square is placed 
{ 
	for( var i = 0; i < 2; i++ ){		//Specifies the position where the square is placed
		for ( var j = 1; j < 3; j++ ){  
			grid.dimension[i][j] = true;
		}
	}

	shape.current_top_left_corner = [0,1];		//Store the current position of the square
	shape.current_bottom_right_corner = [1,2];
}

enter_sqaure_into_grid();
grid.display();

function move_down()		//Function that moves sqaure down by 1 block (Anywhere on grid)
{
	//First we remove the square from it's current location
	// grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]] = false;
	// grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]+1] = false;
	// grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]] = false;
	// grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]-1] = false;

	for ( var i = shape.current_top_left_corner[0]; i <= shape.current_bottom_right_corner[0]-1;i++){
		for ( var j = shape.current_top_left_corner[1]; j <= shape.current_bottom_right_corner[1];j++){
			grid.dimension[i][j] = false;
		}
	}
	
	//Then we shift it one position lower on the grid
	grid.dimension[shape.current_top_left_corner[0]+1][shape.current_top_left_corner[1]] = true;
	grid.dimension[shape.current_top_left_corner[0]+2][shape.current_top_left_corner[1]] = true;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]] = true;
	grid.dimension[shape.current_bottom_right_corner[0]+1][shape.current_bottom_right_corner[1]] = true;

	grid.display();

	//Update the current position of the square
	shape.current_top_left_corner[0]+=1;
	shape.current_bottom_right_corner[0] +=1;

	console.log(shape.current_top_left_corner);
	console.log(shape.current_bottom_right_corner);
}

move_down();

function move_left()	//Function that moves sqaure left by 1 block (Anywhere on grid)
{
	//First we remove the square from it's current location
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]] = false;
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]+1] = false;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]] = false;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]-1] = false;
	
	//Then we shift it left by one position on the grid
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]-1] = true;
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]] = true;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]-2] = true;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]-1] = true;

	grid.display();
	//Update the current position of the square
	shape.current_top_left_corner[1]-=1;
	shape.current_bottom_right_corner[1] -=1;

	console.log(shape.current_top_left_corner);
	console.log(shape.current_bottom_right_corner);
}

// move_left();
move_down();

function move_right()	//Function that moves sqaure left by 1 block (Anywhere on grid)
{
	//First we remove the square from it's current location
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]] = false;
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]+1] = false;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]] = false;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]-1] = false;
	
	//Then we shift it right by one position on the grid
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]+2] = true;
	grid.dimension[shape.current_top_left_corner[0]][shape.current_top_left_corner[1]+1] = true;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]] = true;
	grid.dimension[shape.current_bottom_right_corner[0]][shape.current_bottom_right_corner[1]+1] = true;

	grid.display();
	//Update the current position of the square
	shape.current_top_left_corner[1]+=1;
	shape.current_bottom_right_corner[1] +=1;

	console.log(shape.current_top_left_corner);
	console.log(shape.current_bottom_right_corner);
}

// move_right();
// move_right();
move_down();
// move_left();