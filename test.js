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
					  [1,1,0]];
	this.size_of = 2;
	this.rowSize = 2;
	this.colSize = 2;
	this.orientation = 0;
}

function Shape_T(){
	this.dimension = [[1,1,1],
					  [0,1,0]];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 4;
}

function Shape_Z(){
	this.dimension = [[1,1,0],
					  [0,1,1],];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 2;
}

function Shape_L(){
	this.dimension = [[1,1,1],
					          [0,0,1]];
	this.size_of = 3;
	this.rowSize = 2;
	this.colSize = 3;
	this.orientation = 2;
}


function TempShape (size_of,rowSize,colSize) {
	this.dimension = [[0,0,0],
					  [0,0,0],
					  [0,0,0]];
	this.size_of = size_of;
	this.rowSize = rowSize;
	this.colSize = colSize;
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
	current_x = 0;
	current_y = 0;
	for ( var i = 0; i < shape_object.rowSize; i++ ){
		for ( var j = 0; j < shape_object.colSize; j++ ){
			// if ( this.collisionDetection(shape_object, i, j) ){
			if ( shape_object.dimension[i][j] === 1){
				this.temp_grid[i][j].state = 1;
			}
		}
	}
};

Superimpose.prototype.printSuper = function() {
	for( var i = 0; i < canvas_height; i+=padding ){
		for ( var j = 0; j < canvas_width; j+=padding ){
			var m = i/padding; //Had to do this because of the Indexing, Yes it is a bitch
			var n = j/padding;
			if ( this.temp_grid[m][n].state === 1 ){
				ctx.fillStyle = "#f39c12";
			}
			else{
				ctx.fillStyle = "#3498db";
			}
			ctx.fillRect(j,i,padding,padding);
		}
	}	
};

Superimpose.prototype.rotateShape = function(shapeObject,rotationDegree) {
	var sandboxShape = new TempShape(shapeObject.size_of);
	if ( rotationDegree >= shapeObject.orientation ){
		rotationDegree = 0;
	}
	for ( var i = current_x; i < current_x+shapeObject.rowSize; i ++ ){
		for ( var j = current_y; j < current_y+shapeObject.colSize; j++){
			this.temp_grid[i][j].state = 0;
		}
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
			//Orientation : 90 degrees
			var m = 0;
			var n = 0;
			shapeObject.colSize= [shapeObject.rowSize, shapeObject.rowSize = shapeObject.colSize][0];
			// for ( var i = 0; i < shapeObject.size_of; i++,m++ ){
			// 	for ( var j = shapeObject.size_of - 1,n=0; j >=0; j--,n++ ){
			// 		sandboxShape.dimension[m][n] = shapeObject.dimension[i][j];
			// 		// alert(sandboxShape.dimension[m][n]);
			// 	}
			// }
			// alert("Running fine");
			for (var i = 0; i < shapeObject.rowSize; i++, m++ ){	
				for ( var j =shapeObject.colSize-1, n=0; j >=0; j--,n++ ){
					// alert(m+" "+n);
					sandboxShape.dimension[m][n] = shapeObject.dimension[j][i];
				}
			}
		break;
		case 2:
			//Orientation : 180 degrees
			var m = 0;
			var n = 0;
			for ( var i = shapeObject.size_of-1; i >= 0; i--,m++ ){
				for ( var j = shapeObject.size_of - 1,n=0; j >=0; j--,n++ ){
					sandboxShape.dimension[m][n] = shapeObject.dimension[i][j];
				}
			}	
		break;
		case 3:
			var m = 0;
			var n = 0;
			for ( var i = shapeObject.size_of-1; i >= 0; i--,m++ ){
				for ( var j = 0,n=0; j < shapeObject.size_of; j++,n++ ){
					sandboxShape.dimension[m][n] = shapeObject.dimension[j][i];
				}
			}
		break;
	}
	for ( var i = 0; i < shapeObject.rowSize; i ++ ){
		shapeObject.dimension[i]=[];
		for ( var j = 0; j < shapeObject.colSize; j++ ){
			alert(i+" "+j);
			alert(shapeObject.dimension[i][j]);
			shapeObject.dimension[i][j]=0;
			// this.temp_grid[i][j].state=0;
			shapeObject.dimension[i][j]=sandboxShape.dimension[i][j];
		}
	}
	for ( var i = current_x, m = 0; i < current_x + shapeObject.rowSize; i ++,m++ ){
		for ( var j = current_y , n =0; j < current_y + shapeObject.colSize; j++,n++ ){
			superimpose.temp_grid[i][j].state = 0;
			superimpose.temp_grid[i][j].state = sandboxShape.dimension[m][n];
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

Superimpose.prototype.collisionDetection = function(shapeObject,direction) {
	switch ( direction ){
		case "down":
			// var m=2;
			// var n=0;
			// var j = current_x + 2;
			// for ( var i = current_y; i <= current_y + 2; ++i, n++ ){
			// 	console.log(j);
			// 	console.log(i);
			// 	if ( (this.temp_grid[j+1][i].state === 1 && shapeObject.dimension[m][n] === 1) ){
			// 		return 1;				
			// 	}
			// 	else if (this.temp_grid[j][i].state === 1 && shapeObject.dimension[m-1][n] ===1) {
			// 		return 1;
			// 	} 
			// }

			alert("It reaches here");
			for ( var i = 0,m = current_x; i < shapeObject.rowSize && m < current_x+shapeObject.rowSize ; i++,m++ ){
				console.log(i);
				console.log(m);
				var nextBlockShape = i + 1;
				var nextBlockGrid = m + 1;
				for ( var j = 0,n = current_y; j < shapeObject.colSize && n < current_y+shapeObject.colSize; j++,n++ ){
					console.log(j);
					console.log(n);
					if ( nextBlockShape >= shapeObject.rowSize  &&  nextBlockGrid >= current_x+shapeObject.rowSize ){
						if ( shapeObject.dimension[i][j] === 1 && this.temp_grid[nextBlockGrid][n].state === 1){
							console.log("HEYYYYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
							return 1;
						}
					}
					else{
						if ( shapeObject.dimension[i][j] === 1 && shapeObject.dimension[nextBlockShape][j] === 0 ){
							if ( this.temp_grid[nextBlockGrid][n].state===1 ){
								console.log("HEYYYYOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
								return 1;
							}
						}
					}
				}
			}


			break;
		case "right":
			var m=0;
			var n=2;
			var j = current_y+2;
			for ( var i = current_x; i <= current_x + 2; ++i, m++ ){
				if ( this.temp_grid[i][j+1].state === 1 && shapeObject.dimension[m][n]){
					return 1;
				}
			}
			break;
		case "left":
			var m=0;
			var n=0;
			var j = current_y;
			for ( var i = current_x; i <= current_x+2; ++i ,m++){
				if ( this.temp_grid[i][j-1].state === 1 && shapeObject.dimension[m][n]){
					return 1;
				}
			}
			break;
	}
	return 0;
};

Superimpose.prototype.outOfBounds = function(shapeObject,direction) {
	switch(direction){
		case "down":
			var check = current_x + shapeObject.rowSize;
			if ( check >= rows ){
				
				alert("Fuck");
				return 1;
			}
			break;
		case "right":
			var check = current_y + 3;
			if ( check > cols ){
				var condition = 0;
				for ( i = current_x; i < current_x + 2; ++i ){
					if ( shapeObject.dimension[i][check-1] == 0 ){
						this.shapeManupilator(shapeObject,direction);
						return 0;
					}
				}
				return 1;
			}
			break;
		case "left":
			var check = current_y - 1;
			if ( check < 0 ){
				var condition = 0;
				for ( i = current_x; i < current_x + 2; ++i ){
					if ( shapeObject.dimension[i][check+1] ){
						this.shapeManupilator(shapeObject,direction);
						return 0;
					}
				}
				return 1;
			}
			break;
	}
	return 0;
};

Superimpose.prototype.shapeManupilator = function(shapeObject,direction) {
	var sandboxShape = new TempShape(shapeObject.size_of);
	switch(direction){
		case "down":
			for ( i = 1; i < 3; i++ ){
				for ( j = 0; j < 3; j++ ){
					sandboxShape.dimension[i][j] = shapeObject.dimension[i-1][j];
				}
			}
			for ( i = 0; i < 3; i++ ){
				for ( j = 0; j < 3; j++ ){
					shapeObject.dimension[i][j];
					shapeObject.dimension[i][j] = sandboxShape.dimension[i][j];
				}
			}
			break;
		case "right":
			break;
		case "left":
			break;
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
var t = new Shape_L();

var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");
//superimpose.copyShape(t);
grid.copySuperimpose(superimpose);
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






var current_x = 0;
var current_y = 0;
function move_down(shape_object){
	//Check for collision/Out of BOunds
	var bounds = superimpose.outOfBounds(shape_object,"down");
	if(bounds === 1){
		return 1;
	}
	var collision = superimpose.collisionDetection(shape_object,"down");
	if(collision === 1){
		alert("Collision Detected!")
		return 1;
	}
	var m = 0;
	var n = 0;
	//First switch the current positions of the shape to 0
	for(i= current_x; i <current_x+ shape_object.rowSize; i++, m++) 
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0; }
		}
	n =0;
	}
	alert("cleared");
	// console.log("\n");
	current_x+=1;
	m = 0;
	n=0;
	//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.rowSize; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.colSize; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
		n=0;
	}
	return 0;
}

function move_left(shape_object){
	//Check for collision/Out of BOunds
	var bounds = superimpose.outOfBounds(shape_object,"left");
	if(bounds === 1){
		return 1;
	}
	var collision = superimpose.collisionDetection(shape_object,"left");
	if(collision === 1){
		return 1;
	}
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.size_of; i++, m++)
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0;  }
		}
	n=0;
	}

current_y--;		//Update the current positon of the square 
alert("cleared");
m = 0;
n=0;
//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
		n=0;
	}
}	

function move_right(shape_object){
	//Check for collision/Out of BOunds
	var bounds = superimpose.outOfBounds(shape_object,"right");
	if(bounds === 1){
		return 1;
	}
	var collision = superimpose.collisionDetection(shape_object,"right");
	if(collision === 1){
		return 1;
	}
	var m=0;
	var n=0;
	//First switch the current positions of the shape to 0
	for(i = current_x; i<current_x+shape_object.size_of; i++, m++)
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++, n++)
		{
			if(shape_object.dimension[m][n] === 1){ 		//CLEAR ONLY THE SHAPE, leave other blocks on grid
			superimpose.temp_grid[i][j].state = 0;  }
		}
	n=0;
	}

current_y++;		//Update the current positon of the square 
alert("cleared");
m = 0;
n=0;
//Update all the blocks of the shape to their new position
	for(i= current_x; i <current_x+ shape_object.size_of; i++,m++) 
	{
		for(j= current_y; j< current_y + shape_object.size_of; j++,n++)
		{
			if(superimpose.temp_grid[i][j].state != 1){			//if there is already something occupying the block but not colliding
			superimpose.temp_grid[i][j].state = shape_object.dimension[m][n];
			}
		}
		n=0;
	}
}	
