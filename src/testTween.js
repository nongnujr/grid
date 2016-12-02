var TWEEN = TWEEN || (function(){
	var _tweens = [];
	return {
		add : function(tween){
			_tweens.push(tween)
		}
	}
})();

TWEEN.Tween = function(object){

	this.start = function(){
		TWEEN.add(this);
	}

}


module.exports = TWEEN;