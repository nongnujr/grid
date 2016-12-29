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

	circularMove : function(obj, speed, range){
		
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		obj.translation.y += speed * plusOrMinus;
		obj.translation.x += speed * plusOrMinus;

		/*if(this.angleX == undefined){
				this.angleX = 0;	
				this.translation.y -= range * 10
				
		} else {
				this.angleX += speed;
		}

		this.translation.y = this.currentPos.y + Math.sin(this.angleX) * range;
		this.translation.x = this.currentPos.x + Math.cos(this.angleX) * range;*/

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

	duplicateGrid : function(obj, two, Event, count){

		var row = count+1;
		var gap = innerWidth / row;
		var column = innerHeight / gap;
		var arr = [];

		for (var j = 0; j < (column - 1); j++) {
		
			for (var i = 0; i < (row - 1); i++) {

					var circle = new obj({
						x : Math.random() * window.innerWidth,
						y : Math.random() * window.innerHeight,
						radius : Math.random() * 10
					},two,Event)

					arr.push(circle)

			};
		};

		return arr;
		
	},

	duplicate : function(obj, two, Event, charecter){
		var radius = 4
		var gap = 20
		var count = charecter.vertices.length + 1
		var arr = [];
		
			for (var i = 0; i < count-1; i++) {

					var circle = new obj({
						x : Math.random() * window.innerWidth/2,
						y : Math.random() * window.innerHeight/2,
						radius : radius
					},two,Event)
					arr.push(circle)

			};

		return {
			points : arr,
			width : charecter.width + (gap + radius),
			height : charecter.height
		};

	},

	addEvent : function(obj){
		var elem = document.getElementById(obj.id)
		elem.addEventListener('mouseover', function(){
			obj.scale += 1;
		})
		elem.addEventListener('mouseout', function(){
			obj.scale -= 1;
		})
	},

	animateToShape : function(col, target, position, cb){
		var obj = col.points;
		for (var i = 0; i < obj.length; i++) {
			this.moveTo.call(obj[i], target[i].x + position, target[i].y, col, i, cb);
		};
	},

	moveToLeft : function(text){
		console.log(text[0]);
		for (var i = 0; i < text[0].length; i++) {
				text[0][i].translation.x -= 200
		};
	},

	moveTo : function(xTarget, yTarget, col, i, cb){
	
		var easingType = TWEEN.Easing.Elastic.Out;
		var obj = this;
		var animate = new TWEEN.Tween({
				x: this.translation.x,
				y: this.translation.y
			})
			.to({
				x: xTarget,
				y: yTarget
			}, 2000)
			.onUpdate(function(){
				obj.translation.x = this.x;
			 	obj.translation.y = this.y;
			})
			.onComplete(function(){
				if(i === col.points.length - 1) cb(col);
				return 
			})
			.delay(1000)
			.easing(easingType)
			.start()

	},

	round : function(obj, radius, TWEEN){

		var angle = (2 * Math.PI) / obj.length;
		for (var i = 0; i < obj.length; i++) {
			obj[i].round = {};
			obj[i].round.x = window.innerWidth/2 + Math.sin(angle * i) * radius;
			obj[i].round.y = window.innerHeight/2 + Math.cos(angle * i) * radius;	
			this.move(obj[i], TWEEN);
		};

	},

	random : function(obj, target, TWEEN){

		var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
		.to(target,2000)
		.onUpdate(function(){
			 obj.translation.x = this.x;
			 obj.translation.y = this.y;
		})
		.easing(TWEEN.Easing.Elastic.Out)
		.start();
		
	}

}

module.exports = Event;