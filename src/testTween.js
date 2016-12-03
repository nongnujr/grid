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