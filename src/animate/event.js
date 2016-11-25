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

	}

}

module.exports = Event;