var Arrow = function(two,mouse){
	var arrow = two.makePath(100, 0, 0, 10, 0, -10, false);
	arrow.linewidth = 0;
	arrow.fill = "#888";
	arrow.translation.x = window.innerWidth/2;
	arrow.translation.y = window.innerHeight/2;
    arrow.getDist = function(mouse){
    	return {
    		x : mouse.x - arrow.translation.x,
    		y : mouse.y - arrow.translation.y
    	}; 
    }

    two.update();
	//showMousePos()

	function showMousePos(){
		requestAnimationFrame(showMousePos);
		var dist = arrow.getDist(document);
		if(!dist.x) return false;
		arrow.rotation = Math.atan2(dist.y,dist.x);
		two.update();
	}

	function follow(){
		requestAnimationFrame(follow);
		var dist = arrow.getDist(document);
		if(!dist.x) return false;
		arrow.rotation = Math.atan2(dist.y,dist.x);
		two.update();
	}

}

module.exports = Arrow;