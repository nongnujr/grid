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

	move : function(target){
		console.log("move");
		return
	},

	duplicate : function(Circle, two, Event, count){
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

					arr.push(circle)

			};
		};

		return arr;
		
	}

}

module.exports = Event;