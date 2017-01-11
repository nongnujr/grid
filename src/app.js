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

	/*var createChar = function(text,index){
		var charecter = Text.Create(text[0]);
		var shape = new Shape
			.create(Circle, charecter)
			.moveTo(charecter,text,index,createChar)
	}*/
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
	var createChar = function(item,index){
		console.log("create")
		setTimeout(function(){
			if(item.length === 0){
				console.log("done");
				return false;
			}
			console.log(item)
			item.splice(0,1);
			return createChar(item,index + 1);
		}, randomDelay)
	}
	var addToCollection = function(e){
		text.push(e.keyCode);
		console.log(text);
		createChar(text,0)
	}

	// initiate screen //
	window.addEventListener('keyup', addToCollection)

	// Main timeline // 

	two.bind("update", function(){

		TWEEN.update();
		this.count = this.count === undefined ? 0 : this.count;
		this.count++;

	}).play();
	
})();

