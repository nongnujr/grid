var Square = function(two){
	var square = two.makeRectangle(window.innerWidth/2, window.innerHeight/2, 100, 100);
	two.update();
	square.rotation = 10
	square.init = function(){
		this.rotation = 10;
	}
	return square;
}

module.exports = Square;