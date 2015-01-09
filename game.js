function Grid () {
	this.dimension = [[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false],
						[false,false,false,false]];	
}

function Shape () {
	this.shape_sqr = [[true,true],
						[true,true]];
	this.size_sqr = 2;


} 

var grid = new Grid();
var shape = new Shape();

//window.alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);

display();

alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);

// move_down(0); 
// move_down(1);
move_right(0);
move_down(0);
move_right(1);
//move_left(1);


function display(xaxis,yaxis) {
	for( var i = 0; i < 2; i++ ){
		for ( var j = 0; j < 2; j++ ){
			grid.dimension[i][j] = shape.shape_sqr[i][j];
		}
	}
}

function move_down (arg1) {
	for (var i = arg1; i < arg1+ shape.size_sqr; i++){
		for (var j = 0; j < shape.size_sqr;j++) {
				grid.dimension[i][j] = false;
		}
	}
	arg1 +=1;
	var temp = arg1;
	var k = 0; 
	for (var i = arg1; i < arg1+ shape.size_sqr; i++, k++){
		for (var j = 0; j < shape.size_sqr;j++) {
				grid.dimension[i][j] = shape.shape_sqr[k][j];
		}
	}
	alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);
	//return move_down(arg1);
	// if(temp<= shape.shape_sqr){
	// 	return move_down(temp);
	// }
}

function move_right (arg1) {
	for (var i = 0; i < shape.size_sqr; i++){
		for (var j = arg1; j < arg1+shape.size_sqr;j++) {
				grid.dimension[i][j] = false;
		}
	}
	arg1 +=1;
	var temp = arg1;
	var k = 0; 
	for (var i = 0; i <  shape.size_sqr; i++, k++){
		for (var j = arg1; j < arg1+shape.size_sqr;j++) {
				grid.dimension[i][j] = true;
		}
	}
	alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);
}

function move_left (arg1) {
	for (var i = 0; i < shape.size_sqr; i++){
		for (var j = arg1; j < arg1+shape.size_sqr;j++) {
				grid.dimension[i][j] = false;
		}
	}
	arg1 -=1;
	var temp = arg1;
	var k = 0; 
	for (var i = 0; i <  shape.size_sqr; i++, k++){
		for (var j = arg1+shape.size_sqr; j > arg1; j--) {
				grid.dimension[i][j] = true;
		}
	}
	alert(grid.dimension[0]+"\n"+grid.dimension[1]+"\n"+grid.dimension[2]+"\n"+grid.dimension[3]);
}