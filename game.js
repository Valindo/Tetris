function Grid () {
	this.dimension = [[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false]];	
}

function Shape () {
	this.shape_sqr = [[true,true],
						[true,true]];


} 

var grid = new Grid();
var shape = new Shape();

window.alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);

display();

window.alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);


function display(xaxis,yaxis) {
	for( var i = 0; i < 2; i++ ){
		for ( var j = 0; j < 2; j++ ){
			grid.dimension[i][j] = shape.shape_sqr[i][j];
		}
	}
}