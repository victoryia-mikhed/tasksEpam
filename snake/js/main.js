var snakeModule = (function() {
	var snake = {
		body: [{x: 0, y: 0}],
		direction: 'right'
	};

	var game = {
		fieldWidth: 640,
		fieldHeight: 480,
		cellSize: 16,
		cellsX: 30,
		cellsY: 40,

		currentFood: {x: -1, y: -1},

		randomInt: function(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		},

		generateFood: function() {
			var foodX = this.randomInt(0, this.cellsY - 1);
			var foodY = this.randomInt(0, this.cellsX - 1);
			return {x: foodX, y: foodY};
		},

		newFood: function() {

			//generates new food if current food is on the snake cell
			do {
				var food = this.generateFood();
				this.currentFood = food;
				console.log(this.currentFood.x + " " + this.currentFood.y);
			} 
			while (this.isSnakeCell(this.currentFood.y, this.currentFood.x));

			return;
		},

		move: function() {
			var that = this;
			var moveInterval = setInterval (function() {
				switch(snake.direction) {
					case 'right': {
						snake.body.unshift( {x: snake.body[0].x + 1, y: snake.body[0].y} );

						if (that.currentFood.x === snake.body[0].x && that.currentFood.y === snake.body[0].y) {
							that.newFood();
						}
						else {
							snake.body.pop();
						}

						break;
					}
					case 'down': {
						snake.body.unshift( {x: snake.body[0].x , y: snake.body[0].y + 1} );

						if (that.currentFood.x === snake.body[0].x && that.currentFood.y === snake.body[0].y) {
							that.newFood();
						}
						else {
							snake.body.pop();
						}
						break;
					}
					case 'left': {
						snake.body.unshift( {x: snake.body[0].x - 1, y: snake.body[0].y} );

						if (that.currentFood.x === snake.body[0].x && that.currentFood.y === snake.body[0].y) {
							that.newFood();
						}
						else {
							snake.body.pop();
						}
						break;
					}
					case 'up': {
						snake.body.unshift( {x: snake.body[0].x , y: snake.body[0].y - 1} );

						if (that.currentFood.x === snake.body[0].x && that.currentFood.y === snake.body[0].y) {
							that.newFood();
						}
						else {
							snake.body.pop();
						}
						break;
					}
					default: {}

				}
				
				ctx.clearRect(0, 0, that.fieldWidth, that.fieldHeight);
				that.drawSnake();

				// if snake's head is on the border or on the snake
				if (snake.body[0].x < 0 || snake.body[0].x > that.cellsY - 1 || snake.body[0].y < 0 || snake.body[0].y > that.cellsX - 1 || that.cross()) {
					console.log("Game over!");
					document.getElementById("gameover").style.display="block";
					snake.body = [];
					ctx.clearRect(0, 0, that.fieldWidth, that.fieldHeight);
					//that.drawSnake();
					clearInterval(moveInterval);
				}
			
			}, 100);

		},

		//checks if snake's head crosses tail
		cross: function() {
			for (var i = 1; i < snake.body.length; i++) {
				if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
					return true;
				}
			}
			return false;
		},

		drawFood: function() {
			ctx.fillStyle="#ea4545";
			ctx.fillRect(this.currentFood.x * this.cellSize, this.currentFood.y * this.cellSize, this.cellSize, this.cellSize);
		},

		isSnakeCell: function(i, j) {
			for (var c = 0; c < snake.body.length; c++) {
				if (snake.body[c].x === j && snake.body[c].y === i) {
					return true;
				}
			}
			return false;
		},

		drawSnake: function() {

			ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
			ctx.fillStyle="#071b35";

			for (var c = 0; c < snake.body.length; c++) {
				ctx.fillRect(snake.body[c].x * this.cellSize, snake.body[c].y * this.cellSize, this.cellSize, this.cellSize);
			}

			//head
			ctx.fillStyle="#4e264b";
			ctx.fillRect(snake.body[0].x * this.cellSize, snake.body[0].y * this.cellSize, this.cellSize, this.cellSize);

			this.drawFood();
		},
			

		init: function(id) {
			var field = document.getElementById(id);
			field.height = this.fieldHeight;
			field.width = this.fieldWidth;
			ctx = field.getContext('2d');
			this.newFood();
			this.drawSnake();
		}

	};

	document.getElementById("start").addEventListener("click", function() {
		snake = {
			body: [{x: 0, y: 0}],
			direction: 'right'
		};
		document.getElementById("gameover").style.display="none";
		game.init("field");
		game.move();
		ctx.clearRect(0,0, this.fieldWidth, this.fieldHeight);
	}, false);

	function handler(event) {

		var KEY_CODE = {
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40
		};
		switch(event.keyCode) {
			case KEY_CODE.LEFT:
			if (snake.direction !== "right" || snake.body.length === 1) {
				snake.direction = 'left';
				console.log("left");
			}
			break;

			case KEY_CODE.UP:
			if (snake.direction !== "down" || snake.body.length === 1) {
				snake.direction = 'up';
				console.log("up");
			}
			break;

			case KEY_CODE.RIGHT:
			if (snake.direction !== "left" || snake.body.length === 1) {
				snake.direction = 'right';
				console.log("right");
			}
			break;

			case KEY_CODE.DOWN:
			if (snake.direction !== "up" || snake.body.length === 1) {
				snake.direction = 'down';
				console.log("down");
			}
			break;

			default: { }
		}
	}

	window.addEventListener('keydown', handler, false);
})();
