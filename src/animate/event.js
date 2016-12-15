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

	loop : function(collection, speed, range, type){
		collection.forEach(function(item){
			console.log(item)
		})
	},

	circularMove : function(speed, range){

		if(this.angleX == undefined){
				this.angleX = 0;
				this.currentPos = this.translation;
		} else {
				this.angleX += speed;
		}	

		this.translation.y = this.currentPos.y + Math.sin(this.angleX) * range;
		this.translation.x = this.currentPos.x + Math.cos(this.angleX) * range;

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

	duplicate : function(obj, two, Event, count){

		var arr = [];
		
			for (var i = 0; i < count-1; i++) {

					var circle = new obj({
						x : Math.random() * window.innerWidth,
						y : Math.random() * window.innerHeight,
						radius : 4
					},two,Event)
					this.addEvent(circle)
					arr.push(circle)

			};

		return arr;
		
	},

	addEvent : function(obj){
		var elem = document.getElementById(obj.id)
		elem.addEventListener('mouseover', function(){
			obj.scale = 10;
		})
		elem.addEventListener('mouseout', function(){
			obj.scale = 1;
		})
	},

	animate : function(obj, TWEEN, target){
		for (var i = 0; i < obj.length; i++) {
			obj[i].target = target[i]
			this.move(obj[i], TWEEN);
		};
	},

	move : function(obj, TWEEN){

		// Check if the random is finished //
		var target = this.defineTarget(obj)
		//var target = obj.round

		// assign tween to obj //
		var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
		.to(target , 1000)
		.onUpdate(function(){
			 obj.translation.x = this.x;
			 obj.translation.y = this.y;
		})
		.onComplete(function(){
			if(obj.random === true) {
				obj.random = false;
				return true;
			}
			obj.random = true;
			Event.move(obj, TWEEN);
		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start(undefined);

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

		//console.log(obj);
		var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
		.to(target,2000)
		.onUpdate(function(){
			 obj.translation.x = this.x;
			 obj.translation.y = this.y;
		})
		.easing(TWEEN.Easing.Elastic.Out)
		.start();
		
	},

	defineTarget : function(obj){

		var target = {}
		if(obj.random === void 0){
			target = {
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight
			}
		} else {
			target = obj.target;
		}

		return target;

	}

}

module.exports = Event;