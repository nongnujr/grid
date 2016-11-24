var Event = require('./animate/event');
var Circle = function(param,two){

		var obj = new Two.Ellipse(param.x, param.y, param.radius, param.radius);
		obj.linewidth = param.linewidth || 0;
		obj.fill = param.fill || "#888";
		obj.wave = Event.wave;

		// render
		two.scene.add(obj);
		two.update();

		return obj;
	}

module.exports = Circle