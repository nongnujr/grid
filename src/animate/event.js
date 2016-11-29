// Mouse event
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
		
		// set up Adjacent length and Oposite length //
		if(this.distX == undefined){
			this.distX = this.translation.x - target.x;
			this.distY = this.translation.y - target.y; 
		}

		// set up hypotenuse //
		var hypo = Math.sqrt(this.distX * this.distX + this.distY * this.distY);
		var radianX = Math.acos(this.distX / hypo);
		var radianY = Math.asin(this.distY / hypo);
		
		// set velocity //
		var vx = Math.cos(radianX) * -10;
		var vy = Math.sin(radianY) * -10;

		// add velocity to direction //
		if(this.translation.x >= target.x){
			this.translation.x += vx;
			this.translation.y += vy;
		} else {
			return
			console.log("Done");
		}

	}

}

module.exports = Event;