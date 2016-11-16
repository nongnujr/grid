// Main app //
(function(){

	var elem = document.getElementById('space');
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	function createGrid(gap, radius){
		var grid = [];
		var gap = gap+radius
		var maxRow = Math.round(this.innerWidth / gap);
		var maxCol = Math.round(this.innerHeight / gap);
		var currentRow = 0;

		for (var j = 0; j < maxRow; j++) {
			var currentCol = 0;
			currentRow += gap;
			for (var i = 0; i < maxCol; i++) {
				currentCol += gap;
				var circle = two.makeCircle(currentRow, currentCol, radius);
				circle.linewidth = 0;
				circle.fill = "#888";
				circle.dom = document.querySelector('#' + circle.id);
				grid.push(circle);
			};
		};
		two.update();
		return grid;
	}

	var grid = createGrid(30,20);

	grid.addEvent = (function(){

		for (var i = 0; i < this.length; i++) {
			this[i].dom = document.querySelector('#' + this[i].id);
			this[i].dom.addEventListener('mouseover',animate.bind(this[i]));
			this[i].dom.addEventListener('mouseout',animate.bind(this[i]));
		};

		var incSpeed = 0.05, decSpeed = 0.02;

		function animate(){
			if(this.animate == undefined || this.animate == false){
				onClick.bind(this)();
				this.animate = true;
			} else {
				cancelAnimationFrame(increase)
				decrease.bind(this)();
			}
		}

		function onClick(){
			increase = requestAnimationFrame(onClick.bind(this));
			this.scale += incSpeed;
			two.update();
		}

		function decrease(){
			minus = requestAnimationFrame(decrease.bind(this));
			if(this.scale > 1){
				this.scale -= decSpeed;	
			} else {
				this.animate = false;
				cancelAnimationFrame(minus)
				return;
			}
			//this.scale > 1 ? this.scale -= 0.01 : return;	
			two.update();
		}

	}).bind(grid)();

})();