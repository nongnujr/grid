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

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	//Create Text//
	var text = Text.Create(two);

	// duplicate the circle round system //
	var collection = Event.duplicate(Circle, two, Event, text.vertices.length + 1);
	collection[0].moveTo();

	// initiate animation //
	//var currnetPos = Event.animate(collection, TWEEN, text.vertices);

	// add center pivot //
	var pivotCenter = new Line(two);

	// Main timeline //
	two.bind("update", function(){

		TWEEN.update();

		this.count = this.count === undefined ? 0 : this.count;
		this.count++;

		//if(collection[collection.length - 1].random === false) collection[0].circularMove(0.1, 3);

	}).play();
	
})();

