// Main app //
var Square = require("./square");

(function(){

	var elem = document.getElementById('space');
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	var mySquare = new Square(two);

	var Circle = function(param){
		var obj = new Two.Ellipse(param.x, param.y, param.radius, param.radius);
		obj.linewidth = param.linewidth;
		obj.fill = param.fill;
		obj.scale = 0

		// method
		obj.init = function(){
			tween = requestAnimationFrame(obj.init.bind(this))
			if(this.scale >= 1){
				if(this.translation.y >= 100){
					this.move(0, 100, -10);
					two.update();
				} else {
					cancelAnimationFrame(tween);
				}
			} else {
				this.scale += 0.1
				two.update();
			};
		}

		obj.move = function(x,y,speed){
			this.translation.y != y ?
				this.translation.y += speed :
				this.translation.x = y;
			two.update();
		}

		return obj;
	}

	animate()

	function animate(){
		var tween = requestAnimationFrame(animate);
		this.count == void 0 ? this.count = 0 : this.count += 1;
		if(this.count == 20){
			this.objLength == void 0 ? this.objLength = 0 : this.objLength += 1;
			if(this.objLength >= 8) return console.log("complete");
			this.x == void 0 ? this.x = 100 : this.x += 100 ;
			
			// Create Animate Object //
			var obj = new Circle({
				x : this.x,
				y : window.innerHeight/2,
				radius : 30,
				linewidth : 0,
				fill : '#888'
			})
			two.scene.add(obj);
			two.scene._collection[this.objLength].init();
			this.count = 0
		} 
	}

	//create grid
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

	var grid = {}//createGrid(30,20);

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

})();