var Circle = function(param,two){
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
module.exports = Circle