var Mouse = (function(){
	document.addEventListener('mousemove', function(){
		this.x = event.pageX;
		this.y = event.pageY;
	})
})();

module.exports = Mouse