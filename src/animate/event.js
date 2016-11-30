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
			this.distX = target.x - this.translation.x;
			this.distY = target.y - this.translation.y;
		}

		// set radian using atan2 //
		var radian = Math.atan2(this.distY, this.distX); 

		// set velocity //
		var vx = Math.cos(radian) * speed;
		var vy = Math.sin(radian) * speed;

		this.translation.x += vx;
		this.translation.y += vy;
	}
}

module.exports = Event;