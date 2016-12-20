var json = require("json-loader!./data/data.json");
var Text = Text || (function(){
	var _text = [];
	return {
		add : function(text){
			_text.push(text);
			console.log(_text);
		}
	}
})();

Text.Create = function(two){

	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	//svg.innerHTML = '<polygon id="XMLID_2_" points="223,114.2 195.1,142 167.2,169.9 139.4,197.8 111.5,225.7 83.6,197.8 55.7,169.9 27.9,142 0,114.2 27.9,86.3 55.7,58.4 83.6,30.6 111.5,2.7 139.4,30.6 167.2,58.4 195.1,86.3 "/>'
	svg.innerHTML = '<path d="' + json[0].ก + '"/>'
	var shape = two.interpret(svg).center();
	var area = shape.getBoundingClientRect(true);
	shape.visible = false;

	var arr = []

	shape.scale = 1;
	shape.translation.set(two.width / 2, two.height / 2);
	shape.children[0].vertices.forEach(
		function(item){
			arr.push({
				x: two.width / 2 + item.x - (area.width / 2),
				y: two.height / 2 + item.y - (area.height / 2)
			});

			return arr;
		}
	)
	
	shape.vertices = arr

	return shape;

}

module.exports = Text;