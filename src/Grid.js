// initialise grid system //

var Grid = function(two,Event,Circle,TWEEN){

	// config //
	var row = 30;
	var gap = innerWidth / row;
	var column = innerHeight / gap;
	var arr = [];

	for (var j = 0; j < (column - 1); j++) {
		
		for (var i = 0; i < (row - 1); i++) {

			var circle = new Circle({
				x : Math.random() * window.innerWidth,
				y : Math.random() * window.innerHeight,
				radius : 5
			},two,Event)

			var move = function(obj,target){
				var test =new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
				.to(target,1000)
				.onUpdate(function(){
					 obj.translation.x = this.x;
					 obj.translation.y = this.y;
				})
				.start(undefined);
			}

			arr.push(circle)

			move(circle,{
				x: gap*(i+1),
				y: gap*(j+1)
			})

		};
	};
	console.log(arr.length);
	return true

}

module.exports = Grid