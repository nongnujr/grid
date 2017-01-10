var Shape = Shape || (function(){
	var collection = [];
	return {
		add : function(object){
			collection.push(object);

		},
		getAll : function(){
			return collection;
		},
		getCurrentObject : function(){
			return collection[collection.length - 1]

		}
	}
})();

Shape.create = function(obj, mock){
	
	var _obj = obj;
	var _mock = mock;
	var _amount = Array(mock.vertices.length);

	this.create = (function(){

		function looper(){
			for (var i = 0; i < _amount.length; i++) {
				_amount[i] = create();

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

	this.moveTo = function(target){

		var target = target || mock.vertices;
		var object = Shape.getCurrentObject();
		
		var tween = function(object,index){
			var tween = new TWEEN.Tween({
				x: object.translation.x,
				y: object.translation.y
			})
			.to(target[index],2000)
			.onUpdate(function(){
				object.translation.set(this.x,this.y)
			})
			.easing(TWEEN.Easing.Elastic.Out)
			.start();
		}

		object.forEach(tween);
		return this
	}

	this.stop = function(){
		console.log("stop")
		return this;
	}

}

module.exports = Shape;