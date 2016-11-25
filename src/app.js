// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");
var Event = require('./animate/event');

(function(){

	// get element to render two //
	var elem = document.getElementById('space');

	// initiate screen //
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	//add axes
	var arrow = new Arrow(two);
	var collection = []

	// Add event to document //
	document.addEventListener('click',function(){
		var circle = new Circle({
			x: Math.floor(Math.random() * window.innerWidth),
			y: Math.floor(Math.random() * window.innerHeight),
			radius: Math.floor(Math.random() * 20)+3
		},two,Event);
		collection.push(circle);
	})

	// Main timeline //
	animate();
	function animate(){
		tween = requestAnimationFrame(animate);
		for (var i = 0; i < collection.length; i++) {
			collection[i].wave(0.01, 0.0001, 1000)
		};
		
		two.update();
	}
	
})();