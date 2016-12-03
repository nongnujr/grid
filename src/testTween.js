var TWEEN = function(){
	console.log(this)
}

TWEEN.Tween = function(){

	this.to = function(){
		console.log("to is chained");
		return this;
	}

	this.onUpdate = function(){
		console.log("onUpdate is chained");
		return this;
	}


}

console.log(Date.now())

var test = new TWEEN.Tween().onUpdate().to();
var TWEEN = TWEEN || (function(){
	var _tweens = [];
	return {
		add : function(tween){
			_tweens.push(tween)
		}
	}
})();

TWEEN.Tween = function(object){
	var _object = object;
	this.start = function(){
		TWEEN.add(this);
		return this;
	}

}


module.exports = TWEEN;
