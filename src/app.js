// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');
var Line = require('./Line');
var TWEEN = require('tween.js');
var RoundEffect = require('./RoundEffect');

(function(){

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	// duplicate the circle round system //
	var collection = Event.duplicate(Circle, two, Event, 10);

	// add center pivot //
	var pivotCenter = new Line(two);

	this.count = 0;
	this.animate = 0;

	// Main timeline //
	animate();
	function animate(){

		tween = requestAnimationFrame(animate);
		two.update();
		TWEEN.update();
		this.count++

		if(this.count === 180){

			//Round the object//
			if(this.animate === 0){
				Event.round(collection, 250, TWEEN);
				this.animate = 1;
			} else if (this.animate === 1) {
				Event.grid(collection, TWEEN);
				this.animate = 0;
			}
	
			console.log("fire");
			this.count = 0;
			
		};
	}
	
})();

