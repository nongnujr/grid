// Main app //
(function(){
	
	this.addEventListener('resize', function(){
		this.grid = createGrid(60,2)
		two.update()
		console.log(this.grid.length)
	})

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
				grid.push(circle);
			};
		};
		return grid;
	}

	//console.log(grid)

	two.update()

})();