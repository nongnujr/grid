var Shape = Shape || (function(){
	console.log("Shape created!");
	var collection = [];
	return{
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

Shape.create = function(object,amount){

	var _object = object;
	var _amount = amount;

	this.create = (function(){

		function addToArray(){
			var arr = Array(_amount);
			for (var i = 0; i < arr.length; i++) {
				arr[i] = create(); 
			};
			return arr;
		}
	
		function create() {
			return _object({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					radius : 4
			})
		}

		Shape.add(addToArray());
		return this;

	})();

	this.moveTo = function(target){

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

	}

	this.stop = function(){
		console.log("stop")
		return this;
	}

}

module.exports = Shape;