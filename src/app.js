// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');
var Line = require('./Line');

(function(){

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	//add circle
	var circle = new Circle({
		x : window.innerWidth/2,
		y : window.innerHeight/2,
		radius : 20
	},two,Event)


	var target = {
		x : 800,
		y : 100
	}

	// add center pivot //
	var pivotCenter = new Line(two);
	
	// Main timeline //
	animate();
	function animate(){
		tween = requestAnimationFrame(animate);
		//circle.moveLeft(5, target);
		circle.move(target);
		two.update();
	}
	
})();