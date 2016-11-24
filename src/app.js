// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');

(function(){

	var elem = document.getElementById('space');
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	var circle = new Circle({
		x: Math.random() * window.innerWidth/2,
		y: Math.random() * window.innerHeight/2,
		radius: 10
	},two);

	animate();
	function animate(){
		tween = requestAnimationFrame(animate);
		circle.wave(0.001, 0.0001, 100, two);
	}
	
})();