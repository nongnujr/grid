var Shape = Shape || (function(){
	var collection = [];
	return {
		add : function(object){
			collection.push(object);

		},
		getAll : function(){
			return collection;
		},
		getLength : function(){
			return collection.length;
		},
		getCurrentObject : function(){
			return collection[collection.length - 1]
<<<<<<< HEAD

=======
		},
		reposition : function(){
			if(this.getLength() > 0) return true
		},
		setPosition : function(){

			function move(object){
				object.translation.x -= object.width / 2
			}

			function pick(object){
				object.forEach(move)
			}

			if(Shape.reposition()){
				collection.forEach(pick)
			}
>>>>>>> c2be3a54944032792314171887f1d5ed22bf269a
		}

	}
})();

Shape.create = function(object, mock){

	var _object = object;
	var _amount = mock.vertices.length;
	var _mock = mock

	this.create = (function(){
		
		function addToArray(){
			var arr = Array(_amount);
			for (var i = 0; i < arr.length; i++) {
				arr[i] = create(); 
				arr[i].width = mock.width

			};
			return _amount
		}

		function create(){
			var object = _obj({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: 4
			})
			return object
		}

		Shape.add(looper());
		return this;

	})();

	this.moveTo = function(mock){
		var target = mock.vertices;
		var object = Shape.getCurrentObject();
		var addition = Shape.reposition() != true ? 0 : target.width / 2

		var tween = function(object,index){
			var tween = new TWEEN.Tween({
				x: object.translation.x,
				y: object.translation.y
			})
			.to({
				x: target[index].x,
				y: target[index].y
			}, 2000)
			.onUpdate(function(){
				object.translation.set(this.x,this.y)
			})
			.easing(TWEEN.Easing.Elastic.Out)
			.delay(100)
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