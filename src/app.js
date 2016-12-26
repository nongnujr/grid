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
	var text = [];
	var totalWidth = 0;

	window.addEventListener('keypress', function(){
		
		var position = text.length > 1 ? totalWidth / 2 : 0;

		// Create Text //
		var charecter = Text.Create(event.keyCode, position);

		// duplicate the circle round system //
		var collection = Event.duplicate(Circle, two, Event, charecter);

		// Animate obj to shape //
		Event.animateToShape(collection, charecter.vertices, function(col){
			text.push(col);
			totalWidth += text[text.length-1].width;
		});
	
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

