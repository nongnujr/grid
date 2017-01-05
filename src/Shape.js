var Shape = Shape || (function(){
	console.log("Shape created!");
	var collection = [];
	return{
		add : function(object){
			collection.push(object);
		},
		getAll : function(){
			return collection.length;
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
		var tween = new TWEEN
	}

	this.stop = function(){
		console.log("stop")
		return this;
	}


}

module.exports = Shape;