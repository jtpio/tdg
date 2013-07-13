(function() {

    var utils = new require('./utils');
    var cell = new require('./cell');

    function map() {
        this.width = 32;
        this.height = 32;
        this.blockSize = 16;
        this.grid = [];
        this.path = []; // left to right
        this.create();
        this.generatePath();
    }

    map.prototype = {
        "create": function() {
            for (var i = 0; i < this.width; i++) {
                this.grid.push([]);
                for (var j = 0; j < this.height; j++) {
                    this.grid[i].push(new cell(i,j));
                }
            }
        },

        "generatePath": function() {
            console.log("generating path");
            var startY = utils.random(0, this.width-1);
            var pos = {
                x: 0,
                y: startY
            };
            this.path = [];
            this.path.push(pos);
            var up = {x:0, y:-1};
            var down = {x: 0, y:1};
            var right = {x: 1, y: 0};
            this.moves = [up, down, right];
            this.lastMove = "";
            while (pos.x < this.width - 1) {
                var valid = false;
                while (!valid) {
                    var trash = [];
                    var move = utils.random(0, this.moves.length-1);
                    var nextMove = this.moves[move];
                    var newPos = {
                        x: pos.x + nextMove.x,
                        y: pos.y + nextMove.y
                    };
                    if (this.checkBounds(newPos) && this.grid[newPos.x][newPos.y] != "path") {
                        valid = true;
                        this.path.push(newPos);
                        pos = newPos;
                        this.grid[pos.x][pos.y].type = "path";
                        while (trash.length > 0) this.moves.push(trash.pop());
                    } else {
                        trash.push(nextMove);
                        this.moves.slice(move, 1);
                    }
                }
            }
            console.log("path generated: " + JSON.stringify(this.path));
        },

        "checkBounds": function(pos) {
            return (pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height);
        }
    };

    module.exports = map;

}());