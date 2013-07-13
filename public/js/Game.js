define(function() {

    var Game = function(renderer, main) {
        this.playerNr = 0;
        this.renderer = renderer;
        this.main = main;
        this.stage = new PIXI.Stage(0x8dd35f, true);
        this.map = {};
        this.load();
        this.tick();
    };

    Game.prototype.load = function() {

    };

    Game.prototype.setMap= function(mapObj) {
        this.player = mapObj.playerNumber;
        this.map = mapObj;
        var path = mapObj.map.path;
        for (var i = 0; i < path.length; i++) {
            var sprite = new PIXI.Sprite.fromImage('path.png');
            sprite.position.x = path[i].x * mapObj.map.blockSize;
            sprite.position.y = path[i].y * mapObj.map.blockSize;
            console.log("adding path sprite");
            this.stage.addChild(sprite);
        }
    };

    Game.prototype.tick = function() {
        this.renderer.render(this.stage);
        requestAnimFrame(this.tick.bind(this));
    };


    return Game;

});