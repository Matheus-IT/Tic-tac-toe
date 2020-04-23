const game = {
    board: ["","","","","","","","",""],
    symbols: {
        option: ["X", "O"],
        index: 0,
        change: function () { //This method will be executed on each click
            this.index = (this.index == 0) ? 1 : 0;
        }
    },
    conteiner: null,
    end_game: false,
    win_sequence: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    check_win: function (symb) {
        for (let c in this.win_sequence) {
            if (this.board[this.win_sequence[c][0]] == symb &&
                this.board[this.win_sequence[c][1]] == symb &&
                this.board[this.win_sequence[c][2]] == symb) {
                    window.alert(`Winner sequence ${c}`);
                    return c; //If a winner sequence was found, return its indexs
                }
        }
        return -1; //Couldn't find a winner sequence
    },

    constructor: function (c) {
        this.conteiner = c;
    },

    play: function (pos) {
        if (this.end_game) return false;
        if (this.board[pos] == "") {
            this.board[pos] = this.symbols.option[this.symbols.index];
            this.drawer();
            let win_sequence_index = this.check_win(this.symbols.option[this.symbols.index]);
            if (win_sequence_index >= 0) {
                this.game_over();
            } else {
                this.symbols.change();
            }
            return true;
        } else {
            return false;
        }
    },

    game_over: function () {
        this.end_game = true;
        window.alert("game over");
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
    },
};

game.constructor(window.document.querySelector("div#game"));
game.start();
