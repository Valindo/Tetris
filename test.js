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
	this.shape_sqr = [[true,true]
					[true,true]];

	this.array_shape = [this.shape_sqr];

}



var grid = new Grid();
var shapes = new Shapes();
grid.init_grid();


for ( var i = 0; i< 5; i++ ){
	for ( var j = 0; j<5; j++ ){
		console.log(grid.dimension[i][j]);
	}
	console.log("\n");
}

console.log(shapes.array_shape[shapes.shape_sqr[0][0]]);