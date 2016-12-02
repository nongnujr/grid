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