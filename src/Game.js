(function() {

    var Map = require('./Map');

    function Game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new Map();
        this.turret_ready = [false, false];
    }

    Game.prototype = {
        "feedTurrets": function(turrets, playerNr) {
            if (Object.prototype.toString.call(turrets) !== '[object Array]') {
                turrets = [];
            }
            this.map.feedTurrets(turrets, playerNr);
            this.turret_ready[playerNr-1] = true;
            if(this.turret_ready[0] && this.turret_ready[1]){
                this.simulate();
            }
        },
        "getMap": function() {
            var res = {
                'width':  this.map.width,
                'height': this.map.height,
                'blockSize': this.map.blockSize,
                'maxTurrets': global.Turret.MAX_NB,
                'grid': this.map.grid,
                'path': this.map.path
            };
            return res;
        },
        "simulate":function(){
            
        }
    };

    module.exports = Game;

}());