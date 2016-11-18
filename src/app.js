// Main app //
(function(){

	var elem = document.getElementById('space');
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	function createGrid(gap, radius){
		var grid = [];
		var initGrid = [];
		var gap = gap+radius
		var maxRow = Math.round(this.innerWidth / gap);
		var maxCol = Math.round(this.innerHeight / gap);
		var currentRow = 0;

		for (var j = 0; j < maxRow; j++) {
			var currentCol = 0;
			currentRow += gap;
			for (var i = 0; i < maxCol; i++) {
				currentCol += gap;
				var circle = createObj(radius);
				grid.push(circle);
				initGrid.push({width : currentRow, height : currentCol});
			};
		};

		function createObj(radius){
			var width = this.innerWidth/2;
			var height = this.innerHeight/2;
			var circle = new Two.Ellipse(width, height, radius, radius);
				circle.linewidth = 0;
				circle.fill = "#888";
				circle.dom = document.querySelector('#' + circle.id);
			return circle;
		};

		function animate(){
			tween = requestAnimationFrame(animate);			
		}

		return grid;
	}

	var grid = createGrid(300,10);

	grid.addEvent = function(){

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
			console.log(this.scale)
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
			
			two.update();
		}

	};

	//grid.addEvent();

})();