var Shape = Shape || (function(){

	var collection = [];
	var fullWidth = 0;
	
	return {
		
		add : function(object, width){
			collection.push(object);
			fullWidth += width;
		},
		getWidth : function(){
			return fullWidth;
		},
		getAll : function(){
			return collection;
		},
		getLength : function(){
			return collection.length;
		},
		getCurrentObject : function(){
			return collection[collection.length - 1]
		},
		reposition : function(){
			if(this.getLength() > 0) return true
		},
		setPosition : function(){

			function move(object){
				object.translation.x -= object.width / 2
			}

			function pick(object,index){
				object.forEach(move);
			}

			if(Shape.reposition()){
				collection.forEach(pick)
			}

		}

	}
})();

Shape.create = function(object, mock){

	var _obj = object;
	var _amount = mock.vertices.length;
	var _mock = mock
	
	this.create = (function(){

		function addToArray(){
			var arr = Array(_amount);
			for (var i = 0; i < arr.length; i++) {
				arr[i] = create(); 
				arr[i].width = mock.width
			};
			return arr;
		}

		function create(){
			var object = _obj({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: 4
			})
			return object
		}

		Shape.add(addToArray(), mock.width);
		return this;

	})();

	this.moveTo = function(mock){

		Shape.setPosition();

		var target = mock.vertices || _mock.vertices;
		var object = Shape.getCurrentObject();
		var addition = Shape.getWidth()/2 - mock.width/2;

		var complete = function(){
			if(this.index === target.length-1) console.log("complate");
		};

		var tween = function(object,index){
			var tween = new TWEEN.Tween({
				x: object.translation.x,
				y: object.translation.y,
				index : index
			})
			.to({
				x: target[index].x + addition,
				y: target[index].y
			}, 1000)
			.onUpdate(function(){
				object.translation.set(this.x,this.y)
			})
			.easing(TWEEN.Easing.Elastic.Out)
			.onComplete(complete)
			.start();
		}

		object.forEach(tween);
		return this;

	}

	this.stop = function(){
		console.log("stop")
		return this;
	}

}

module.exports = Shape;