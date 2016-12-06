var TWEEN = TWEEN || (function(){

	var _tween = [];

	return {
		add : function(tween){
			_tween.push(tween)
		},
		update : function(time){
			if(_tween === 0) return false;
			time = time !== undefined ? time : TWEEN.now();
			
			var i = 0;

			while(i<_tween.length){
				if(_tween[i].update(time)){
					i++;
				} else {
					_tween.splice(i,1);
				}
			}

			return false;
		}
	}
})();

(function(){
	TWEEN.now = Date.now
})();

TWEEN.Tween = function(object){
	var _object = object;
	var _valueStart = {};
	var _valueEnd = {};
	var _duration = 1000;
	var _onUpdateCallback = null;
	var _startTime = null;
	var _delayTime = 0;

	this.to = function(prop,duration){
		_valueEnd = prop;
		_duration = duration;
		return this;
	};

	this.start = function(time,delay){
		TWEEN.add(this);
		
		_startTime = time !== undefined ? time : TWEEN.now();
		_startTime += delay || 0;

		for(var props in _object){
			_valueStart[props] = _object[props];
		}

		return this
	};

	this.onUpdate = function(callback){
		_onUpdateCallback = callback;
		return this;
	}

	this.update = function(time){
		var property;
		var elapsed;
		var value;

		if(time < _startTime){
			return true;
		}
		
		elapsed = (time - _startTime) / _duration
		elapsed = elapsed > 1 ? 1 : elapsed;

		value = TWEEN.Easing.Quintic.In(elapsed);

		for(var props in _valueEnd){
			var start = _valueStart[props] || 0;
			var end = _valueEnd[props];

			//update object property
			_object[props] = start + (end - start) * value
		}


		if(_onUpdateCallback != null) _onUpdateCallback.call(_object);

		if(elapsed === 1) return false;
		
		return true
	}

}

TWEEN.Easing = {
	Quintic : {
		In: function (k) {

			return k * k * k * k * k;

		}
	}
}

module.exports = TWEEN;
