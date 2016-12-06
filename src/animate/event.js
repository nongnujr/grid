// Mouse event
//var TWEEN = require('tween.js');
var Event = {
	
	swing : function(speed,range){

		if(this.angleX == undefined){
			this.angleX = 0;
		} else {
			this.angleX += speed;
		}
		this.translation.y = window.innerHeight/2 + Math.sin(this.angleX) * range;

	},

	wave : function(angleX,angleY,range){

		if(this.initX == undefined){
			this.initX = this.translation.x;
			this.initY = this.translation.y;
		}

		this.angleX === void 0 ? this.angleX = 0 : this.angleX += angleX;
		this.angleY === void 0 ? this.angleY = 0 : this.angleY += angleY;

		this.translation.y = this.initY + Math.sin(this.angleX) * 100;
		this.translation.x = this.initX + Math.sin(this.angleY) * 100;

	},

	circularMove : function(speed,range){
		if(this.angleX == undefined){
			this.angleX = 0;
		} else {
			this.angleX += speed;
		}

		this.translation.y = window.innerHeight/2 + Math.sin(this.angleX) * range;
		this.translation.x = window.innerWidth/2 + Math.cos(this.angleX) * range;
	},

	moveLeft : function(speed,target){

		this.distX = target.x - this.translation.x;
		this.distY = target.y - this.translation.y;
		
		var dist = 0; 
		Math.sign(this.distX) !== 1 ? dist = this.distX * -1 : dist = this.distX; 

		// set radian using atan2 //
		var radian = Math.atan2(this.distY, this.distX); 

		// set velocity //
		var vx = Math.cos(radian) * speed;
		var vy = Math.sin(radian) * speed;

		this.translation.x += Math.floor(vx);
		this.translation.y += Math.floor(vy);

	},

	duplicate : function(obj, two, Event, count){

		var row = count+1;
		var gap = innerWidth / row;
		var column = innerHeight / gap;
		var arr = [];

		for (var j = 0; j < (column - 1); j++) {
		
			for (var i = 0; i < (row - 1); i++) {

					var circle = new obj({
						x : Math.random() * window.innerWidth,
						y : Math.random() * window.innerHeight,
						radius : 5
					},two,Event)

					circle.grid = {
						x: gap*(i+1),
						y: gap*(j+1)
					}

					arr.push(circle)

			};
		};

		return arr;
		
	},

	grid : function(collection,TWEEN){	
		for (var i = 0; i < collection.length; i++) {
			this.move(collection[i], collection[i].grid, TWEEN); 
		};
	},

	move : function(obj, target, TWEEN){
		var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
		.to(target,2000)
		.onUpdate(function(){
			 obj.translation.x = this.x;
			 obj.translation.y = this.y;
		})
		.delay(1000)
		.easing(TWEEN.Easing.Elastic.Out)
		.start(undefined);

	},

	round : function(obj, radius, TWEEN){
		
		var angle = (2 * Math.PI) / obj.length;
	
		for (var i = 0; i < obj.length; i++) {
			obj[i].grid.x = window.innerWidth/2 + Math.sin(angle * i) * radius;
			obj[i].grid.y = window.innerHeight/2 + Math.cos(angle * i) * radius;	
			this.move(obj[i], obj[i].grid, TWEEN);
		};
	} 

}

module.exports = Event;