// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Line = require('./Line');
var Text = require('./Text');
var TWEEN = require('tween.js');
var Event = require('./animate/event');
var RoundEffect = require('./RoundEffect');

(function(){

	// Set initial value //
	this.count = 0;
	this.animate = 0;
	this.TWEEN = TWEEN;
	var state = {};
	var text = [];

	window.addEventListener('keypress', function(){

		//Create Text//
		state.count = state.count || 0
		var charecter = Text.Create(event.keyCode);

		if(text.length > 0) {
			Event.moveToLeft(text);
		}

		// duplicate the circle round system //
		var collection = Event.duplicate(Circle, two, Event, charecter);

		// Animate obj to shape //
		/*Event.animateToShape(collection, charecter.vertices, function(col){
			console.log(col);
			text.push(col);
		});
*/
		state.count++
	
	})

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem); 

	this.two = two;

	// add center pivot //
	var pivotCenter = new Line(two);

	// Main timeline //
	two.bind("update", function(){

		TWEEN.update();
		this.count = this.count === undefined ? 0 : this.count;
		this.count++;

	}).play();
	
})();

