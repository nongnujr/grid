// Main app //
var Circle = require("./Circle");
var Line = require('./Line');
var Text = require('./Text');
var TWEEN = require('tween.js');
var Event = require('./animate/event');
var Shape = require('./Shape');

(function(){

	// Set initial value //
	this.count = 0;
	this.animate = 0;
	this.TWEEN = TWEEN;
	var elem = document.getElementById('space');
	this.two = new Two({fullscreen : true}).appendTo(elem); 
	var pivotCenter = new Line(two);// add center pivot //
	var text = [];

	// initiate screen //
	window.addEventListener('keypress', function(){

		// Create Text //
		var charecter = Text.Create(event.keyCode);

		// duplicate the circle round system //
		var shape = new Shape(Circle, 10);

	})

	// Main timeline //
	two.bind("update", function(){

		TWEEN.update();
		this.count = this.count === undefined ? 0 : this.count;
		this.count++;

	}).play();
	
})();

