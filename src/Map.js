(function() {

    var Utils = new require('./Utils');
    var Cell = new require('./Cell');
    var Soldier = new require('./Soldier');

    function Map() {
        this.width = global.Map.WIDTH;
        this.height = global.Map.HEIGHT;
        this.blockSize = global.Map.BLOCK_SIZE;
        this.grid = [];
        this.path = []; // left to right
        this.turrets = {};
        this.create();
        this.generatePath();
    }

    Map.prototype = {
        "create": function() {
            for (var i = 0; i < this.width; i++) {
                this.grid.push([]);
                for (var j = 0; j < this.height; j++) {
                    this.grid[i].push(new Cell(i,j));
                }
            }
        },

        "feedTurrets": function(turrets, playerNr) {
            this.turrets[playerNr] = [];
            for (var i = 0; i < turrets.length; i++) {
                if (turrets[i].x && turrets[i].y && this.checkBounds(turrets[i])) {
                    this.turrets[playerNr].push(turrets[i]);
                }
            }
        },

        "simulate": function(callback) {
            var status1 = this.simulatePlayer(1, this.path);
            var status2 = this.simulatePlayer(2, this.path.reverse());
            var res = {"status1": status1, "status2": status2};
            callback(res);
        },

        "simulatePlayer": function(playerNr, path) {
            var offset = 0;
            var turrets1 = this.turrets[playerNr];
            var r = global.Turret.RADIUS;
            var nbSoldiers = global.Soldier.MAX_NB;
            var soldiers = [];
            for (var s = 0; s < nbSoldiers; s++) {
                soldiers.push(new Soldier(-s));
            }

            var status = [];

            var steps = this.path.length + nbSoldiers;
            for (var i = 0; i < steps && soldiers.length > 0; i++) {
                var attacked = [];
                var dead = [];
                for (var t = 0; t < turrets1.length; t++) {
                    var turret = turrets1[t];
                    var dists = [];
                    for (var s = 0; s < soldiers.length; s++) {
                        var sPos = this.path[soldiers[s].pos + offset];
                        if (sPos) {
                            var dist = (turret.x - sPos.x) *  (turret.x - sPos.x) + (turret.y - sPos.y) * (turret.y - sPos.y);
                            dists.push(dist);
                        }
                    }
                    var min = 100000;
                    var best = -1;
                    for (var d = 0; d < dists.length; d++) {
                        if (dists[d] < min) {
                            min = dists[d];
                            best = d;
                        }
                    }

                    if (min <= r) {
                        var killed = soldiers[best].hurt();
                        attacked.push(soldiers[best].pos);
                        if (killed) {
                            dead.push(soldiers[best].pos);
                            soldiers.splice(best, 1);
                        }
                        if (soldiers.length === 0) {
                            break;
                        }
                    }
                }
                status.push({
                    'dead': dead,
                    'attacked': attacked,
                    'offset': offset
                });
                offset++;
            }

            console.log("Results for player " + playerNr + ":");
            console.log(soldiers);
            console.log(status);

            return status;
        },

        "generatePath": function() {
            console.log("generating path");
            var startY = Utils.random(0, this.width-1);
            var pos = {
                x: 0,
                y: startY
            };
            this.path = [];
            this.path.push(pos);
            var up = {x:0, y:-1};
            var down = {x: 0, y:1};
            var right = {x: 1, y: 0};
            var moves = [up, down, right];
            var trash = [];
            while (pos.x < this.width - 1) {
                var valid = false;
                trash = [];
                while (!valid) {
                    console.log("pos " + JSON.stringify(pos));
                    var move = Utils.random(0, moves.length-1);
                    console.log("move id " + move);
                    var nextMove = moves[move];
                    if (!nextMove) {
                        nextMove = right;
                    }
                    var newPos = {
                        x: pos.x + nextMove.x,
                        y: pos.y + nextMove.y
                    };
                    var prevPrev = this.path[this.path.length-3] || {x: 0, y: 1000};
                    if (this.checkBounds(newPos) && this.grid[newPos.x][newPos.y].type != "path" && (prevPrev.y != newPos.y || Math.abs(prevPrev.x-newPos.x) >= 4)) {
                        valid = true;
                        this.path.push(newPos);
                        pos = newPos;
                        this.grid[pos.x][pos.y].type = "path";
                        while (trash.length > 0) moves.push(trash.pop());
                    } else {
                        trash.push(nextMove);
                        moves.splice(move, 1);
                    }

                    console.log("trash " + JSON.stringify(trash));
                    console.log("moves " + JSON.stringify(moves));
                }
            }
            console.log("path generated");
        },

        "checkBounds": function(pos) {
            return (pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height);
        }
    };

    module.exports = Map;

}());