var json = require("json-loader!./data/data.json");
var Text = Text || (function(){
	var _text = [];
	return {
		add : function(text){
			_text.push(text);
		}
	}
})();

Text.Create = function(char){
	var arr = []
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.innerHTML = '<path d="' + json[char.toString()].code + '"/>';	
	var shape = two.interpret(svg).center();
	var area = shape.getBoundingClientRect(true);

	shape.visible = false;

	shape.scale = 1;
	shape.translation.set(two.width / 2, two.height / 2);
	shape.children[0].vertices.forEach(
		function(item){
			arr.push({
				x: two.width / 2 + item.x - (area.width / 2),
				y: two.height / 2 + item.y - (area.height / 2),
				width: area.width,
				height: area.height
			});

			return arr;
		}
	)
	
	shape.vertices = arr

	return shape;

}

module.exports = Text;