const game = {
	board: ["","","","","","","","",""],
	container: window.document.querySelector("div#game"),
	is_end_game: false,
	winner_sequence: null,
	symbols: {
		option: ["X", "O"],
		index: 0,
		change: function () { // This method will be executed on each click
			this.index = (this.index == 0) ? 1 : 0;
		},
		get currentPlayer() {
			return this.option[this.index];
		}
	},

	showCurrentPlayer: function () {
		let player = window.document.querySelector("div#player");
		player.innerHTML = `Player ${this.symbols.currentPlayer}`;
	},

	board_full: function () {
		for (let c in this.board) {
			if (this.board[c] == "") {
				return false;
			}
		}
		return true;
	},

	check_win: function (symb) {
		let win_sequences = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let c in win_sequences) {
			if (this.board[win_sequences[c][0]] == symb &&
				this.board[win_sequences[c][1]] == symb &&
				this.board[win_sequences[c][2]] == symb) {
					this.winner_sequence = win_sequences[c];
					return true; //If a winner sequence was found
				}
		}
		return false; //Couldn't find a winner sequence
	},

	play: function (pos) {
		if (this.is_end_game) return false;
		if (this.board[pos] == "") {
			this.board[pos] = this.symbols.currentPlayer;
			this.drawTheBoard();
			if (this.check_win(this.symbols.currentPlayer))
				this.game_over();
			else {
				if (this.board_full())
					this.game_over();
				else {
					this.symbols.change();
					this.showCurrentPlayer();
				}
			}
		}
	},

	paint_winner_sequence: function (win_seq) {
		let elements = this.container.children;
		for (let c in win_seq) {
			elements[win_seq[c]].style.background = "#005186";
		}
	},

	game_over: function () {
		this.is_end_game = true;
		let r = window.document.querySelector("div#res");
		r.style.visibility = "visible";
		if (this.winner_sequence != null) {
			this.paint_winner_sequence(this.winner_sequence);
			
			if (this.symbols.currentPlayer === "X") {
				let timesXWon = Number.parseInt(sessionStorage.getItem("timesXWon"));
				timesXWon += 1;
				sessionStorage.setItem("timesXWon", timesXWon);
				document.querySelector("#timesXWon").innerHTML = `Won ${timesXWon} times`;
			} else {
				let timesOWon = Number.parseInt(sessionStorage.getItem("timesOWon"));
				timesOWon += 1;
				sessionStorage.setItem("timesOWon", timesOWon);
				document.querySelector("#timesOWon").innerHTML = `Won ${timesOWon} times`;
			}
			
			r.innerHTML = `Game over! Winner ${this.symbols.currentPlayer}`;
		} else {
			r.innerHTML = `Game over! Deu Velha! \u{1F475}`;
		}
		r.innerHTML += '<button id="btn" onclick="game.restart()">Restart?</button>';
	},

	drawTheBoard: function() {
		let content = "";
		for (let c in this.board) {
			content += `<div onclick="game.play(${c})"> ${this.board[c]} </div>`;
		}
		this.container.innerHTML = content;
	},

	start: function () {
		this.showCurrentPlayer();
		sessionStorage.setItem("timesXWon", 0);
		sessionStorage.setItem("timesOWon", 0);
		this.drawTheBoard();
	},

	restart: function () {
		this.board = ["", "", "", "", "", "", "", "", ""];
		this.is_end_game = false;
		this.winner_sequence = null;
		let r = window.document.querySelector("div#res");
		r.innerHTML = "";
		r.style.visibility = "hidden";
		this.showCurrentPlayer();
		this.drawTheBoard();
	}
};

game.start();
