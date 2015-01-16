//Testing Move functions
// var t = new Shape_T();


// function display() {
// alert(superimpose.temp_grid[0] + "\n" + superimpose.temp_grid[1] + "\n" + superimpose.temp_grid[2] + "\n" + superimpose.temp_grid[3] + "\n" + superimpose.temp_grid[4] + "\n" + superimpose.temp_grid[5] + "\n" + superimpose.temp_grid[6] + "\n" + superimpose.temp_grid[7] + "\n" + superimpose.temp_grid[8] + "\n" + superimpose.temp_grid[9] + "\n" );
// }

superimpose.copyShape(t);
// superimpose.temp_grid[6][1].state = 1;
superimpose.temp_grid[8][0].state = 1;
// superimpose.temp_grid[7][8].state = 1;

superimpose.printSuper();
// superimpose.rotateShape(t,1);
move_right(t);
superimpose.printSuper();
move_left(t);
superimpose.printSuper();
move_left(t);
superimpose.printSuper();

document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
 		case 37: // left
 			move_left(t);
 			superimpose.printSuper();
        break;

        case 38: // up
        	superimpose.rotateShape(t,1);
        	superimpose.printSuper();
        break;

        case 39: // right
        	move_right(t);
        	superimpose.printSuper();
        break;

        case 40: // down
        	
        	move_down(t);
       		superimpose.printSuper();
        break;

        case 33:  //page up
        	superimpose.copyShape(t);			//leave the older shape on grid  and insert a new one at the top! 
        	superimpose.printSuper();
        break;

        default:
   		return; 
    }
}

// superimpose.copyShape(t);

