/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bin/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Main app //
	var Circle = __webpack_require__(1);
	var Mouse = __webpack_require__(2);
	var Arrow = __webpack_require__(3);
	var Line = __webpack_require__(4);
	var Text = __webpack_require__(5);
	var TWEEN = __webpack_require__(6);
	var Event = __webpack_require__(8);
	var RoundEffect = __webpack_require__(9);

	(function(){

		// Set initial value //
		this.count = 0;
		this.animate = 0;

		// get element to render two //
		var elem = document.getElementById('space');

		// initiate screen //
		var two = new Two({
			fullscreen : true
		}).appendTo(elem);

		//Create Text//
		var text = Text.Create(two);

		// duplicate the circle round system //
		var collection = Event.duplicate(Circle, two, Event, text.vertices.length + 1);

		// initiate animation //
		Event.animate(collection, TWEEN, text.vertices);
		

		// add center pivot //
		var pivotCenter = new Line(two);
	 
		// Main timeline //
		two.bind("update", function(){

			TWEEN.update();

			this.count = this.count === undefined ? 0 : this.count;
			this.count++;

			// Check if initial animation is completed //
			if(collection[collection.length - 1].random === false) collection[0].circularMove(0.1, 3);
			// if(collection[collection.length - 1].random === false) Event.loop(collection);

		}).play();

		//animate();
		function animate(){

			tween = requestAnimationFrame(animate);
			two.update();
			TWEEN.update();
			this.count++

			if(this.count === 360){

				//Round the object//
				/*if(this.animate === 0){
					Event.animate(collection, 250, TWEEN);
					this.animate = 1;
				} else if (this.animate === 1) {
					Event.animate(collection, TWEEN);
					this.animate = 0;
				}*/

				Event.animate(collection, TWEEN);

				this.count = 0;

			};
		}
		
	})();



/***/ },
/* 1 */
/***/ function(module, exports) {

	var Circle = function(param,two,Event){

			var obj = new Two.Ellipse(param.x, param.y, param.radius, param.radius);
			obj.linewidth = param.linewidth || 0;
			obj.fill = param.fill || "#888";
			obj.scale = 0; 
			obj.wave = Event.wave;
			obj.move = Event.move;
			obj.swing = Event.swing;
			obj.circularMove = Event.circularMove;
			obj.moveLeft = Event.moveLeft;
			obj.move = Event.move;

			// render
			two.scene.add(obj);
			two.update();

			// initiate the obj
			init();
			function init(){
				tween = requestAnimationFrame(init.bind(obj));
				if(this.scale !== undefined){
					this.scale < 1 ? this.scale += 0.05 : cancelAnimationFrame(tween);
				}
			}

			//return obj
			return obj;
		}

	module.exports = Circle

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Mouse = (function(){
		document.addEventListener('mousemove', function(){
			this.x = event.pageX;
			this.y = event.pageY;
		})
	})();

	module.exports = Mouse

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Arrow = function(two,mouse){

		var arrow = two.makePath(100, 0, 0, 10, 0, -10, false);
		arrow.linewidth = 0;
		arrow.fill = "#888";
		arrow.translation.x = window.innerWidth/2;
		arrow.translation.y = window.innerHeight/2;
	    arrow.wave = Event.wave;
	    return arrow;
	}

	module.exports = Arrow;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var Line = function(two){

		var height = 30;
		var line = new Two.Line(window.innerWidth/2,
			window.innerHeight/2-height,
			window.innerWidth/2,
			window.innerHeight/2+height);
		var line2 = new Two.Line(window.innerWidth/2-height,
			window.innerHeight/2,
			window.innerWidth/2+height,
			window.innerHeight/2);

		line.stroke = line2.stroke = "#ff0000";
		two.scene.add(line);
		two.scene.add(line2);
		two.update();

		return line;
	}

	module.exports = Line;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var Text = Text || (function(){
		var _text = [];
		return {
			add : function(text){
				_text.push(text);
				console.log(_text);
			}
		}
	})();

	Text.Create = function(two){

		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		//svg.innerHTML = '<path id="XMLID_4_" d="M94.5,168.9v-6.1v-4v-5.2v-3.7v-4.7v-4.8v-4.5v-4.3v-4.5v-4.2v-4.3v-4.3v-4.5v-4.2v-5V97c-1.7,1.4-3.8,2.4-6.9,3.4c-1.7,0.6-3.7,1.1-6.2,1.6c-1.9,0.4-3.9,0.7-6.3,1c-2.3,0.3-4.9,0.5-7.7,0.6c-2.2,0.1-4.6,0.2-7.2,0.2c-2.2,0-4.6,0.2-7.2,0.6c-2.6,0.4-5.3,1-7.9,1.8c-2.5,0.8-5,1.7-7.3,2.9c-1.8,0.9-3.6,2-5.3,3.2c-1.7,1.3-3.3,2.7-4.6,4.3c-1.4,1.6-2.6,3.5-3.5,5.5c-1.2,2.7-1.9,5.8-1.9,9.3c0,3,0.4,5.7,1.2,8.1c0.5,1.4,1,2.7,1.7,4c0.9,1.5,1.9,2.9,3.1,4.1c0.9,0.9,1.9,1.8,2.9,2.5c2,1.4,4.3,2.6,6.7,3.4c1.3,0.4,2.6,0.8,4,1.1c2.5,0.5,5.1,0.8,7.7,0.8c2,0,3.9-0.1,5.7-0.3c2.4-0.3,4.6-0.8,6.6-1.4c1.7-0.3,3.4-1,4.8-1.7v4.6v4.5v4v4.1c-1.4,0.3-3.1,1-4.8,1.4c-1.8,0.6-3.9,1-6.3,1.2c-1.8,0.2-3.8,0.2-6,0.2c-3.7,0-7.2-0.2-10.5-0.6c-3-0.3-5.8-0.8-8.4-1.5c-4-1-7.5-2.3-10.7-3.9c-2.1-1.1-4-2.3-5.8-3.8c-2.2-1.8-4.1-3.8-5.7-6c-1.6-2.3-3-4.8-4-7.5c-1.1-2.8-1.8-5.8-2.3-9c-0.4-2.6-0.5-5.3-0.5-8.1c0-4,0.4-7.7,1.2-11.1c0.9-3.7,2.3-7.1,4-10.2c1.7-2.9,3.7-5.5,6-7.7c2.3-2.3,4.9-4.3,7.6-6c2.5-1.6,5.3-2.9,8.1-4.1c2-0.8,4-1.5,6.1-2.1c2.6-0.8,5.3-1.4,8-1.9c3.2-0.6,6.4-1,9.7-1.2c2.5-0.2,5.1-0.3,7.6-0.3c2.8,0,5.4-0.1,7.7-0.2c2.4-0.1,4.6-0.3,6.5-0.4c2.9-0.3,5.3-0.6,7.5-1c2.9-0.5,5.2-1.2,7.1-1.8c2.7-1,4.5-2.1,5.5-3.4v-8.9c0-2.9-0.2-5.7-0.7-8.4c-0.4-2.5-1.1-4.9-1.9-7.2c-1-2.7-2.4-5.3-4-7.6c-1.3-1.8-2.8-3.4-4.4-4.9c-1.7-1.5-3.6-2.7-5.7-3.8c-1.3-0.7-2.7-1.2-4.1-1.7c-3.8-1.3-8.3-2-13.4-2c-2,0-3.9,0.1-5.8,0.4c-2.4,0.3-4.6,0.8-6.8,1.4c-2.2,0.6-4.3,1.4-6.3,2.2c-1.3,0.6-2.5,1.2-3.7,1.8c-1.7,0.9-3.2,1.9-4.7,2.9c-1.7,1.2-3.4,2.4-4.9,3.7c-1.2,1-2.3,2-3.4,3c-1.4,1.3-2.8,2.7-4.1,4.2c-0.9,1-1.7,2-2.6,3c-1,1.2-2,2.5-2.9,3.9c-1,1.4-1.9,2.9-2.8,4.4l-2.4-6l-1.3-3.3L7.1,53L5.4,49c0.8-1.5,1.7-3,2.6-4.5c0.9-1.5,1.9-2.9,3-4.3c0.9-1.1,1.8-2.2,2.8-3.2c1.1-1.2,2.3-2.3,3.6-3.4c1.3-1.2,2.7-2.4,4.3-3.5c1.5-1.2,3.2-2.3,5-3.3c1.4-0.8,2.8-1.6,4.3-2.3c1.6-0.8,3.3-1.5,5.1-2.2c2.1-0.8,4.4-1.5,6.8-2.1c2.4-0.6,4.9-1.1,7.6-1.4c3.1-0.4,6.3-0.6,9.8-0.6c3.2,0,6.3,0.2,9.2,0.5c3,0.3,5.8,0.9,8.6,1.6c2.3-1,4.5-2.2,6.6-3.7c1-0.7,2-1.4,2.9-2.2c1-0.8,1.9-1.7,2.7-2.7c1-1.2,1.9-2.5,2.6-3.9c1-2.1,1.6-4.3,1.6-6.8h5.4h5.3h4.3h5.6c0,3.4-0.5,6.4-1.5,9.1c-0.5,1.4-1.1,2.8-1.8,4c-0.7,1.3-1.5,2.5-2.4,3.6c-1.5,1.9-3.2,3.6-5.1,5.2c-1.2,0.9-2.4,1.8-3.6,2.6c-1.4,0.9-2.9,1.8-4.4,2.6c1.7,1.3,3.2,2.6,4.6,4.1c0.9,0.9,1.8,1.9,2.6,2.9c0.9,1.1,1.7,2.2,2.5,3.4c1.4,2.2,2.7,4.5,3.8,7.1c1.1,2.5,2,5.2,2.8,8.1c0.3,1.2,0.6,2.4,0.8,3.6c0.4,2.1,0.8,4.3,1.1,6.5c0.2,2,0.4,4.1,0.6,6.3c0.1,2,0.2,4.1,0.2,6.3v7.5v4.5v6.6v3.9v5.5v4.7v5.5v4v4.3v3.5v5v4v5v5v4.7v3.5v5.5v4v5.8h-4.4H106h-6H94.5z"/>'
		svg.innerHTML = '<polygon id="XMLID_2_" points="223,114.2 195.1,142 167.2,169.9 139.4,197.8 111.5,225.7 83.6,197.8 55.7,169.9 27.9,142 0,114.2 27.9,86.3 55.7,58.4 83.6,30.6 111.5,2.7 139.4,30.6 167.2,58.4 195.1,86.3 "/>'
		var shape = two.interpret(svg).center();
		var area = shape.getBoundingClientRect(true);
		shape.visible = false;
		var arr = []

		shape.scale = 1;
		shape.translation.set(two.width / 2, two.height / 2);
		shape.children[0].vertices.forEach(
			function(item){
				arr.push({
					x: two.width / 2 + item.x - (area.width / 2),
					y: two.height / 2 + item.y - (area.height / 2)
				});

				return arr;
			}
		)
		
		shape.vertices = arr

		return shape;

	}

	module.exports = Text;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	var TWEEN = TWEEN || (function () {

		var _tweens = [];

		return {

			getAll: function () {

				return _tweens;

			},

			removeAll: function () {

				_tweens = [];

			},

			add: function (tween) {

				_tweens.push(tween);

			},

			remove: function (tween) {

				var i = _tweens.indexOf(tween);

				if (i !== -1) {
					_tweens.splice(i, 1);
				}

			},

			update: function (time, preserve) {

				if (_tweens.length === 0) {
					return false;
				}

				var i = 0;

				time = time !== undefined ? time : TWEEN.now();

				while (i < _tweens.length) {

					if (_tweens[i].update(time) || preserve) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}

				}

				return true;

			}
		};

	})();


	// Include a performance.now polyfill
	(function () {
		// In node.js, use process.hrtime.
		if (this.window === undefined && this.process !== undefined) {
			TWEEN.now = function () {
				var time = process.hrtime();

				// Convert [seconds, microseconds] to milliseconds.
				return time[0] * 1000 + time[1] / 1000;
			};
		}
		// In a browser, use window.performance.now if it is available.
		else if (this.window !== undefined &&
		         window.performance !== undefined &&
			 window.performance.now !== undefined) {

			// This must be bound, because directly assigning this function
			// leads to an invocation exception in Chrome.
			TWEEN.now = window.performance.now.bind(window.performance);
		}
		// Use Date.now if it is available.
		else if (Date.now !== undefined) {
			TWEEN.now = Date.now;
		}
		// Otherwise, use 'new Date().getTime()'.
		else {
			TWEEN.now = function () {
				return new Date().getTime();
			};
		}
	})();


	TWEEN.Tween = function (object) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		// Set all starting values present on the target object
		for (var field in object) {
			_valuesStart[field] = parseFloat(object[field], 10);
		}

		this.to = function (properties, duration) {

			if (duration !== undefined) {
				_duration = duration;
			}

			_valuesEnd = properties;

			return this;

		};

		this.start = function (time) {

			TWEEN.add(this);

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : TWEEN.now();
			_startTime += _delayTime;

			for (var property in _valuesEnd) {

				// Check if an Array was provided as property value
				if (_valuesEnd[property] instanceof Array) {

					if (_valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				_valuesStart[property] = _object[property];

				if ((_valuesStart[property] instanceof Array) === false) {
					_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[property] = _valuesStart[property] || 0;

			}

			return this;

		};

		this.stop = function () {

			if (!_isPlaying) {
				return this;
			}

			TWEEN.remove(this);
			_isPlaying = false;

			if (_onStopCallback !== null) {
				_onStopCallback.call(_object);
			}

			this.stopChainedTweens();
			return this;

		};

		this.stopChainedTweens = function () {

			for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
				_chainedTweens[i].stop();
			}

		};

		this.delay = function (amount) {

			_delayTime = amount;
			return this;

		};

		this.repeat = function (times) {

			_repeat = times;
			return this;

		};

		this.yoyo = function (yoyo) {

			_yoyo = yoyo;
			return this;

		};


		this.easing = function (easing) {

			_easingFunction = easing;
			return this;

		};

		this.interpolation = function (interpolation) {

			_interpolationFunction = interpolation;
			return this;

		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		this.onStart = function (callback) {

			_onStartCallback = callback;
			return this;

		};

		this.onUpdate = function (callback) {

			_onUpdateCallback = callback;
			return this;

		};

		this.onComplete = function (callback) {

			_onCompleteCallback = callback;
			return this;

		};

		this.onStop = function (callback) {

			_onStopCallback = callback;
			return this;

		};

		this.update = function (time) {

			var property;
			var elapsed;
			var value;

			if (time < _startTime) {
				return true;
			}

			if (_onStartCallbackFired === false) {

				if (_onStartCallback !== null) {
					_onStartCallback.call(_object);
				}

				_onStartCallbackFired = true;

			}

			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			value = _easingFunction(elapsed);

			for (property in _valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				var start = _valuesStart[property] || 0;
				var end = _valuesEnd[property];

				if (end instanceof Array) {

					_object[property] = _interpolationFunction(end, value);

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {

						if (end.charAt(0) === '+' || end.charAt(0) === '-') {
							end = start + parseFloat(end, 10);
						} else {
							end = parseFloat(end, 10);
						}
					}

					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						_object[property] = start + (end - start) * value;
					}

				}

			}

			if (_onUpdateCallback !== null) {
				_onUpdateCallback.call(_object, value);
			}

			if (elapsed === 1) {

				if (_repeat > 0) {

					if (isFinite(_repeat)) {
						_repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					for (property in _valuesStartRepeat) {

						if (typeof (_valuesEnd[property]) === 'string') {
							_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[property];

							_valuesStartRepeat[property] = _valuesEnd[property];
							_valuesEnd[property] = tmp;
						}

						_valuesStart[property] = _valuesStartRepeat[property];

					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					_startTime = time + _delayTime;

					return true;

				} else {

					if (_onCompleteCallback !== null) {
						_onCompleteCallback.call(_object);
					}

					for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						_chainedTweens[i].start(_startTime + _duration);
					}

					return false;

				}

			}
			//console.log(elapsed)
			return true;

		};

	};


	TWEEN.Easing = {

		Linear: {

			None: function (k) {

				return k;

			}

		},

		Quadratic: {

			In: function (k) {

				return k * k;

			},

			Out: function (k) {

				return k * (2 - k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}

				return - 0.5 * (--k * (k - 2) - 1);

			}

		},

		Cubic: {

			In: function (k) {

				return k * k * k;

			},

			Out: function (k) {

				return --k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k + 2);

			}

		},

		Quartic: {

			In: function (k) {

				return k * k * k * k;

			},

			Out: function (k) {

				return 1 - (--k * k * k * k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}

				return - 0.5 * ((k -= 2) * k * k * k - 2);

			}

		},

		Quintic: {

			In: function (k) {

				return k * k * k * k * k;

			},

			Out: function (k) {

				return --k * k * k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k * k * k + 2);

			}

		},

		Sinusoidal: {

			In: function (k) {

				return 1 - Math.cos(k * Math.PI / 2);

			},

			Out: function (k) {

				return Math.sin(k * Math.PI / 2);

			},

			InOut: function (k) {

				return 0.5 * (1 - Math.cos(Math.PI * k));

			}

		},

		Exponential: {

			In: function (k) {

				return k === 0 ? 0 : Math.pow(1024, k - 1);

			},

			Out: function (k) {

				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}

				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

			}

		},

		Circular: {

			In: function (k) {

				return 1 - Math.sqrt(1 - k * k);

			},

			Out: function (k) {

				return Math.sqrt(1 - (--k * k));

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}

				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

			},

			Out: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				k *= 2;

				if (k < 1) {
					return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
				}

				return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

			}

		},

		Back: {

			In: function (k) {

				var s = 1.70158;

				return k * k * ((s + 1) * k - s);

			},

			Out: function (k) {

				var s = 1.70158;

				return --k * k * ((s + 1) * k + s) + 1;

			},

			InOut: function (k) {

				var s = 1.70158 * 1.525;

				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}

				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

			}

		},

		Bounce: {

			In: function (k) {

				return 1 - TWEEN.Easing.Bounce.Out(1 - k);

			},

			Out: function (k) {

				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}

			},

			InOut: function (k) {

				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}

				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;

			if (k < 0) {
				return fn(v[0], v[1], f);
			}

			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}

			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

		},

		Bezier: function (v, k) {

			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;

			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}

			return b;

		},

		CatmullRom: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;

			if (v[0] === v[m]) {

				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}

				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

			} else {

				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}

				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}

				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

			}

		},

		Utils: {

			Linear: function (p0, p1, t) {

				return (p1 - p0) * t + p0;

			},

			Bernstein: function (n, i) {

				var fc = TWEEN.Interpolation.Utils.Factorial;

				return fc(n) / fc(i) / fc(n - i);

			},

			Factorial: (function () {

				var a = [1];

				return function (n) {

					var s = 1;

					if (a[n]) {
						return a[n];
					}

					for (var i = n; i > 1; i--) {
						s *= i;
					}

					a[n] = s;
					return s;

				};

			})(),

			CatmullRom: function (p0, p1, p2, p3, t) {

				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;

				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

			}

		}

	};

	// UMD (Universal Module Definition)
	(function (root) {

		if (true) {

			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

		} else if (typeof module !== 'undefined' && typeof exports === 'object') {

			// Node.js
			module.exports = TWEEN;

		} else if (root !== undefined) {

			// Global variable
			root.TWEEN = TWEEN;

		}

	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	// Mouse event
	//var TWEEN = require('tween.js');
	var Event = {
		
		swing : function(speed,range){

			if(this.angleX == undefined){
				this.angleX = 0;
			} else {
				this.angleX += speed;
			}
			this.translation.y = window.innerHeight/2 + Math.sin(this.angleX) * range;

		},

		wave : function(angleX,angleY,range){

			if(this.initX == undefined){
				this.initX = this.translation.x;
				this.initY = this.translation.y;
			}

			this.angleX === void 0 ? this.angleX = 0 : this.angleX += angleX;
			this.angleY === void 0 ? this.angleY = 0 : this.angleY += angleY;

			this.translation.y = this.initY + Math.sin(this.angleX) * 100;
			this.translation.x = this.initX + Math.sin(this.angleY) * 100;

		},

		loop : function(collection, speed, range, type){
			collection.forEach(function(item){
				item.speed = item.speed || Math.random() * 0.5  
				item.circularMove(item.speed, 1);
				console.log(item)
			})
		},

		circularMove : function(speed, range){

			if(this.angleX == undefined){
					this.angleX = 0;
					this.currentPos = this.translation;
			} else {
					this.angleX += speed;
			}

			this.translation.y = this.currentPos.y + Math.sin(this.angleX) * range;
			this.translation.x = this.currentPos.x + Math.cos(this.angleX) * range;

		},

		moveLeft : function(speed,target){

			this.distX = target.x - this.translation.x;
			this.distY = target.y - this.translation.y;
			
			var dist = 0; 
			Math.sign(this.distX) !== 1 ? dist = this.distX * -1 : dist = this.distX; 

			// set radian using atan2 //
			var radian = Math.atan2(this.distY, this.distX); 

			// set velocity //
			var vx = Math.cos(radian) * speed;
			var vy = Math.sin(radian) * speed;

			this.translation.x += Math.floor(vx);
			this.translation.y += Math.floor(vy);

		},

		duplicateGrid : function(obj, two, Event, count){

			var row = count+1;
			var gap = innerWidth / row;
			var column = innerHeight / gap;
			var arr = [];

			for (var j = 0; j < (column - 1); j++) {
			
				for (var i = 0; i < (row - 1); i++) {

						var circle = new obj({
							x : Math.random() * window.innerWidth,
							y : Math.random() * window.innerHeight,
							radius : Math.random() * 10
						},two,Event)

						arr.push(circle)

				};
			};

			return arr;
			
		},

		duplicate : function(obj, two, Event, count){

			var arr = [];
			
				for (var i = 0; i < count-1; i++) {

						var circle = new obj({
							x : Math.random() * window.innerWidth,
							y : Math.random() * window.innerHeight,
							radius : 4
						},two,Event)
						this.addEvent(circle)
						arr.push(circle)

				};

			return arr;
			
		},

		addEvent : function(obj){
			var elem = document.getElementById(obj.id)
			elem.addEventListener('mouseover', function(){
				obj.scale = 10;
			})
			elem.addEventListener('mouseout', function(){
				obj.scale = 1;
			})
		},

		animate : function(obj, TWEEN, target){
			for (var i = 0; i < obj.length; i++) {
				obj[i].target = target[i]
				this.move(obj[i], TWEEN);
			};
		},

		move : function(obj, TWEEN){

			// Check if the random is finished //
			var target = this.defineTarget(obj)
			//var target = obj.round

			// assign tween to obj //
			var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
			.to(target , 1000)
			.onUpdate(function(){
				 obj.translation.x = this.x;
				 obj.translation.y = this.y;
			})
			.onComplete(function(){
				if(obj.random === true) {
					obj.random = false;
					return true;
				}
				obj.random = true;
				Event.move(obj, TWEEN);
			})
			.easing(TWEEN.Easing.Quintic.Out)
			.start(undefined);

		},

		round : function(obj, radius, TWEEN){
			var angle = (2 * Math.PI) / obj.length;
			for (var i = 0; i < obj.length; i++) {
				obj[i].round = {};
				obj[i].round.x = window.innerWidth/2 + Math.sin(angle * i) * radius;
				obj[i].round.y = window.innerHeight/2 + Math.cos(angle * i) * radius;	
				this.move(obj[i], TWEEN);
			};

		},

		random : function(obj, target, TWEEN){

			//console.log(obj);
			var test = new TWEEN.Tween({x:obj.translation.x, y:obj.translation.y})
			.to(target,2000)
			.onUpdate(function(){
				 obj.translation.x = this.x;
				 obj.translation.y = this.y;
			})
			.easing(TWEEN.Easing.Elastic.Out)
			.start();
			
		},

		defineTarget : function(obj){

			var target = {}
			if(obj.random === void 0){
				target = {
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight
				}
			} else {
				target = obj.target;
			}

			return target;

		}

	}

	module.exports = Event;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var RoundEffect = function(collection){
		var radius = 100;
		var circumference = 2 * Math.PI * radius;
		var gap = circumference / collection.length;
		for (var i = 0; i < collection.length; i++) {
			collection[i].translation.x = window.innerWidth + Math.cos()
		};
	}

	module.exports = RoundEffect;

/***/ }
/******/ ]);