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

var Shape = function(obj, amount){

	this.create = (function(){
		function create(){
			
		}
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