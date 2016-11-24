var Event = {
	move : function(obj,speed,two){
		obj.translation.x += speed;
		obj.translation.y += speed;
		two.update();
	},
	wave : function(initX,initY,angleX,angleY,range,two){
		console.log(initX)
		/*this.angleX === void 0 ? this.angleX = 0 : this.angleX += angleX;
		this.angleY === void 0 ? this.angleY = 0 : this.angleY += angleY;
		this.translation.y = initX + Math.sin(this.angleX) * window.innerHeight/2;
		this.translation.x = initY + Math.sin(this.angleY) * window.innerWidth/2;
		two.update();*/
	}

}

module.exports = Event;