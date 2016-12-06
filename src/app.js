// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');
var Line = require('./Line');
var TWEEN = require('tween.js');
var Grid = require('./Grid');
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

	//Round the object//
	Event.round(collection, 250, TWEEN);

	//Create Grid//
	//Event.grid(collection,TWEEN);

	// add center pivot //
	var pivotCenter = new Line(two);

	// Main timeline //
	animate();
	function animate(){
		tween = requestAnimationFrame(animate);
		two.update();
		TWEEN.update();
	}
	
})();

