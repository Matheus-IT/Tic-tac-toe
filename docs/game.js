const game = {
    board: ["","","","","","","","",""],
    conteiner: window.document.querySelector("div#game"),
    end_game: false,
    winner_sequence: null,
    symbols: {
        option: ["X", "O"],
        index: 0,
        change: function () { //This method will be executed on each click
            this.index = (this.index == 0) ? 1 : 0;
        },
        get value() {
            return this.option[this.index];
        },
    },

    mostra_player: function () {
        let player = window.document.querySelector("div#player");
        player.innerHTML = `Player ${this.symbols.value}`;
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
        if (this.end_game) return false;
        if (this.board[pos] == "") {
            this.board[pos] = this.symbols.value;
            this.drawer();
            if (this.check_win(this.symbols.value))
                this.game_over();
            else {
                if (this.board_full())
                    this.game_over();
                else {
                    this.symbols.change();
                    this.mostra_player();
                }
            }
        }
    },

    paint_winner_sequence: function (win_seq) {
        let elements = this.conteiner.children;
        for (let c in win_seq) {
            elements[win_seq[c]].style.background = "#005186";
        }
    },

    game_over: function () {
        this.end_game = true;
        let r = window.document.querySelector("div#res");
        r.style.visibility = "visible";
        if (this.winner_sequence != null) {
            this.paint_winner_sequence(this.winner_sequence);
            r.innerHTML = `
                Game over! Winner ${this.symbols.value}
                <button id="btn" onclick="game.start()">Restart?</button>
            `;
        } else {
            r.innerHTML = `
                Game over! Deu Velha! \u{1F475}
                <button id="btn" onclick="game.start()">Restart?</button>
            `;
        }
    },

    drawer: function() {
        let content = "";
        for (let c in this.board) {
            content += `<div onclick="game.play(${c})"> ${this.board[c]} </div>`;
        }
        this.conteiner.innerHTML = content;
    },

    start: function () {
        this.board = ["","","","","","","","",""];
        this.mostra_player();
        this.drawer();
        this.end_game = false;
        let r = window.document.querySelector("div#res");
        r.innerHTML = "";
        r.style.visibility = "hidden";
        this.winner_sequence = null;
    },
};

game.start();
