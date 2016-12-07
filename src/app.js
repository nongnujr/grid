// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');
var Line = require('./Line');
var TWEEN = require('tween.js');
var RoundEffect = require('./RoundEffect');

(function(){

	// Set initial value //
	this.count = 0;
	this.animate = 0;

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	// duplicate the circle round system //
	var collection = Event.duplicate(Circle, two, Event, 10); 

	//Create Grid//
	Event.animate(collection, TWEEN);

	// add center pivot //
	var pivotCenter = new Line(two);

	// Main timeline //
	animate();
	function animate(){

		tween = requestAnimationFrame(animate);
		two.update();
		TWEEN.update();
		this.count++

		if(this.count === 360){

			//Round the object//
			/*if(this.animate === 0){
				Event.animate(collection, 250, TWEEN);
				this.animate = 1;
			} else if (this.animate === 1) {
				Event.animate(collection, TWEEN);
				this.animate = 0;
			}*/

			Event.animate(collection, TWEEN);
			console.log("Fire")

			this.count = 0;

		};
	}
	
})();

