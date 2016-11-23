// Main app //
var Circle = require("./Circle");
var Mouse = require("./Mouse");
var Arrow = require("./Arrow");

(function(){

	var elem = document.getElementById('space');
	var two = new Two({
		fullscreen : true
	}).appendTo(elem);

	var arrow = new Arrow(two,this.x);

	//animate()

	function animate(){
		var tween = requestAnimationFrame(animate);
		this.count == void 0 ? this.count = 0 : this.count += 1;
		if(this.count == 20){
			this.objLength == void 0 ? this.objLength = 0 : this.objLength += 1;
			if(this.objLength >= 8) return console.log("complete");
			this.x == void 0 ? this.x = 100 : this.x += 100 ;
			
			// Create Animate Object //
			var obj = new Circle({
				x : this.x,
				y : window.innerHeight/2,
				radius : 30,
				linewidth : 0,
				fill : '#888'
			},two)
			two.scene.add(obj);
			two.scene._collection[this.objLength].init();
			this.count = 0
		} 
	}
	
})();