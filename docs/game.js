const game = {
    board: ["","","","","","","","",""],
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
    conteiner: null,
    end_game: false,
    winner_sequence: null,

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

    constructor: function (c) {
        this.conteiner = c;
    },

    play: function (pos) {
        if (this.end_game) return false;
        if (this.board[pos] == "") {
            this.board[pos] = this.symbols.value;
            this.drawer();
            if (this.check_win(this.symbols.value)) {
                this.game_over(this.winner_sequence);
            } else {
                this.symbols.change();
            }
        }
    },

    game_over: function (win_seq) {
        this.end_game = true;
        let r = window.document.querySelector("div#res");
        r.style.visibility = "visible";
        r.innerHTML = `
            Game over! Winner ${this.symbols.value}
            <button id="btn" onclick="game.start()">Restart?</button>
        `;
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
        this.drawer();
        this.end_game = false;
        let r = window.document.querySelector("div#res");
        r.innerHTML = "";
        r.style.visibility = "hidden";
    },
};

game.constructor(window.document.querySelector("div#game"));
game.start();
