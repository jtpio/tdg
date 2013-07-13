(function() {

    var Map = require('./Map');
    var Logic = require('./Logic');

    function Game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new Map();
        this.player1.build_army();
        this.player2.build_army();
    }

    Game.prototype = {
        "feedTurrets": function(turrets, playerNr) {
            if (Object.prototype.toString.call(turret) !== '[object Array]') {
                turrets = [];
            }
            this.map.feedTurrets(turrets, playerNr);
            switch(playerNr){
                case 1:this.player1.defence.set(turrets);this.player1.set_ready();break;
                case 2:this.player2.defence.set(turrets);this.player1.set_ready();break;
            }
        },
        "simulateWhenReady":function(){
            if(this.player1.is_ready() && this.player2.is_ready()){
                this.simulate();
            }
        }

        "getMap": function() {
            var res = {
                'width':  this.map.width,
                'height': this.map.height,
                'blockSize': this.map.blockSize,
                'path': this.map.path
            };
            return res;
        },
        "simulate": function(){
            return Logic.simulate(this);
        }
    };

    module.exports = Game;

}());