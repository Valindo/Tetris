//Every individual block in the grid
function Blocks (pos_x,pos_y) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.state = false;
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
};

function Shapes() {
	this.dimension = [[1,2],
					[3,4]];
	this.size_of = 2;
}



var grid = new Grid();
var shapes = new Shapes();
grid.init_grid();


// for ( var i = 0; i< 5; i++ ){
// 	for ( var j = 0; j<5; j++ ){
// 		console.log(grid.dimension[i][j]);
// 	}
// 	console.log("\n");
// }

// console.log(shapes.array_shape[0]);


function rotate (shape_object,rotation) {
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
			shape_object.dimension[i][j] = temp_shape.dimension[i][j]
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
	var m = 0;
	var n = 0;
	for ( var i = shape_object-1; i >= 0; i--,m++ ){
		for ( var j = shape_object.size_of - 1; j >=0; j--,n++ ){
			shape_object.dimension[m][n] = temp_shape.dimension[i][j];
		}
	}	
	print(shapes);
}

function case_3 (temp_shape,shape_object) {
	var m = 0;
	var n = 0;
	for ( var i = shape_object-1; i >= 0; i--,m++ ){
		for ( var j = 0; j < shape_object.size_of; j--,n++ ){
			shape_object.dimension[m][n] = temp_shape.dimension[j][i];
		}
	}	
}

function print(shape_object){
	for ( var i = 0; i < shape_object.size_of; i++ ){
		for ( var j = 0; j < shape_object.size_of; j++ ){
			console.log(shape_object.dimension[i][j]);
		}
		console.log("\n");
	}
}

print(shapes);
  
