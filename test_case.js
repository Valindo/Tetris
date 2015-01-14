var rotate = 3;
var state = 0;
superimpose.rotateShape(t,rotate);

switch(rotate){
	case 0:
		if ( t.dimension[0][0] === 1 && t.dimension[0][1] === 1 && t.dimension[1][1] === 1 && t.dimension[1][2]){
			state = 1;
		}
		else{
			state = 0;
		}

		
		break;

	case 1:
		if (t.dimension[0][2] === 1 && t.dimension[1][1] === 1 && t.dimension[1][2] === 1 && t.dimension[2][1] === 1){
			state = 1;
		}
		else{
			state = 0;
		}
		break;

	case 2:
		break;

	case 3:
		break;

}

if ( state === 1 ){
			console.log("true");
}
else{
	console.log("false");
}

superimpose.printSuper();
