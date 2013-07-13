define(function() {

    var Game = function(renderer, main) {
        this.playerNr = 0;
        this.renderer = renderer;
        this.main = main;
        this.stage = new PIXI.Stage(0x8dd35f, true);
        this.map = {};
        this.turrets = 0;
        this.load();
        this.tick();
    };

    Game.prototype.load = function() {
    };

    Game.prototype.setMap = function(mapObj) {
        var self = this;
        self.playerNr = mapObj.playerNumber;
        self.map = mapObj;
        var grid = mapObj.map.grid;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                var sprite = new PIXI.Sprite.fromImage('path.png');
                sprite.position.x = i * mapObj.map.blockSize;
                sprite.position.y = j * mapObj.map.blockSize;
                if (grid[i][j].type != "path") {
                    sprite.setTexture(PIXI.Texture.fromImage('empty.png'));
                    sprite.setInteractive(true);
                    sprite.click = function(data) {
                        if (this.tower) {
                            this.setTexture(PIXI.Texture.fromImage('empty.png'));
                            this.turrets--;
                        } else {
                            if (this.turrets < self.map.MAX_TURRETS) {
                                this.tower = true;
                                this.turrets++;
                                this.setTexture(PIXI.Texture.fromImage('turret'+self.playerNr+'.png'));
                            }
                        }
                    };
                }
                self.stage.addChild(sprite);
            }
        }
    };

    Game.prototype.tick = function() {
        this.renderer.render(this.stage);
        requestAnimFrame(this.tick.bind(this));
    };

    return Game;

});