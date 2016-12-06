var RoundEffect = function(collection){
	var radius = 100;
	var circumference = 2 * Math.PI * radius;
	var gap = circumference / collection.length;
	for (var i = 0; i < collection.length; i++) {
		collection[i].translation.x = window.innerWidth + Math.cos()
	};
}

module.exports = RoundEffect;