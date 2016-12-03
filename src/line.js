var Line = function(two){

	var height = 30;
	var line = new Two.Line(window.innerWidth/2,
		window.innerHeight/2-height,
		window.innerWidth/2,
		window.innerHeight/2+height);
	var line2 = new Two.Line(window.innerWidth/2-height,
		window.innerHeight/2,
		window.innerWidth/2+height,
		window.innerHeight/2);

	line.stroke = line2.stroke = "#ff0000";
	two.scene.add(line);
	two.scene.add(line2);
	two.update();

	return line;
}

module.exports = Line;