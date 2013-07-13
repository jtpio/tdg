(function() {

    var Map = require('./Map');

    function Game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new Map();
        this.turretReady = [false, false];
    }

    Game.prototype = {
        "feedTurrets": function(turrets, playerNr) {
            if (Object.prototype.toString.call(turrets) !== '[object Array]') {
                turrets = [];
            }
            this.map.feedTurrets(turrets, playerNr);
            this.turretReady[playerNr-1] = true;
            if(this.turretReady[0] && this.turretReady[1]) {
                this.player1.emit("turrets", this.map.turrets[2]);
                this.player2.emit("turrets", this.map.turrets[1]);
                this.simulate();
            }
        },
        "getMap": function() {
            var res = {
                'width':  this.map.width,
                'height': this.map.height,
                'blockSize': this.map.blockSize,
                'maxTurrets': global.Turret.MAX_NB,
                'maxSoldiers': global.Soldier.MAX_NB,
                'grid': this.map.grid,
                'path': this.map.path
            };
            return res;
        },
        "simulate": function(){
            var self = this;
            self.map.simulate(function(status) {
                self.player1.emit("status", status);
                self.player2.emit("status", status);
            });
        }
    };

    module.exports = Game;

}());