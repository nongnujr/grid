// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');
var Line = require('./Line');
var TWEEN = require('./testTween');
var Grid = require('./Grid');
var RoundEffect = require('./RoundEffect');

(function(){

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	// execute grid system //
	//Grid(two,Event,Circle,TWEEN);



	// duplicate the circle round system //
	var collection = Event.duplicate(Circle, two, Event, 10); 
	
	// Execute Round Effect
	//var round = new RoundEffect(collection);

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

