/**
 *	Main Menu
 *	scene for the main menu
 *	(c) doublespeak games 2015	
 **/
define(['app/scenes/scene', 'app/graphics', 'app/event-manager', 
		'app/audio'], 
		function(Scene, Graphics, E, Audio) {
	
	var DEBUG = false;

	var _hitBoxes = [{
		x: 0,
		y: 230,
		width: 480,
		height: 100,
		onTrigger: _startGame
	},{
		x: 0,
		y: 350,
		width: 480,
		height: 100,
		onTrigger: function() { require('app/engine').setBot(true); _startGame(true); }
	},{
		x: 0,
		y: 470,
		width: 480,
		height: 100,
		onTrigger: _startTutorial
	}];

	function _startGame(singlePlayer) {
		var engine = require('app/engine');

		E.fire('startGame', { 
			fromTitle: true, 
			singlePlayer: singlePlayer 
		});

		engine.changeScene('game-board', null, true);
	}

	function _startTutorial() {
		E.fire('startTutorial', { 
			fromTitle: true 
		});
		require('app/engine').changeScene('game-board', true, true);
	}

	return new Scene({
		background: 'menu',

		drawFrame: function(delta) {
			Graphics.text('Radüm', Graphics.width() / 2, 120, 100, 'negative');
			Graphics.text('vs. human', Graphics.width() / 2, 280, 40, 'negative');
			Graphics.text('vs. cpu', Graphics.width() / 2, 400, 40, 'negative');
			Graphics.text('tutorial', Graphics.width() / 2, 520, 40, 'negative');

			if (DEBUG) {
				_hitBoxes.forEach(function(box) {
					Graphics.rect(box.x, box.y, box.width, box.height, 'negative');
				});
			}
		},

		onActivate: function() {
			require('app/engine').setBot(null);
		},

		onInputStart: function(coords) {
			_hitBoxes.forEach(function(box) {
				if (coords.x > box.x && coords.x < box.x + box.width &&
					coords.y > box.y && coords.y < box.y + box.height) {
					Audio.play('SELECT');
					box.onTrigger();
				}
			});
		}
	});
});