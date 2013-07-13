define(function() {

    var Game = function(renderer, main) {
        this.playerNr = 0;
        this.renderer = renderer;
        this.main = main;
        this.stage = new PIXI.Stage(0x8dd35f, true);
        this.map = {};
        this.turrets = [];
        this.load();
        this.tick();
    };

    Game.prototype.setNet = function(net) {
        this.net = net;
    };

    Game.prototype.load = function() {
        var self = this;
        self.turretsButton = new PIXI.Text("Send Turrets", {font: "35px Arial", fill: "black"});
        self.turretsButton.anchor.x = self.turretsButton.anchor.y = 0.5;
        self.turretsButton.position.x = 768 / 2;
        self.turretsButton.position.y = 600;
        self.turretsButton.setInteractive(true);
        self.turretsButton.click = function(data) {
            var res = [];
            for (var i = 0; i < self.turrets.length; i++) {
                res.push({
                    x: self.turrets[i].x,
                    y: self.turrets[i].y
                });
            }
            self.net.send('turrets', res);
        };

        self.stage.addChild(self.turretsButton);
    };

    Game.prototype.setMap = function(mapObj) {
        var self = this;
        self.playerNr = mapObj.playerNumber;
        self.map = mapObj;
        console.log("max turrets: " + mapObj.map.maxTurrets);
        var grid = mapObj.map.grid;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                var sprite = new PIXI.Sprite.fromImage('path.png');
                sprite.position.x = i * mapObj.map.blockSize;
                sprite.position.y = j * mapObj.map.blockSize;
                sprite.x = i;
                sprite.y = j;
                if (grid[i][j].type != "path") {
                    sprite.setTexture(PIXI.Texture.fromImage('empty.png'));
                    sprite.setInteractive(true);
                    sprite.click = function(data) {
                        if (this.turret) {
                            this.setTexture(PIXI.Texture.fromImage('empty.png'));
                            self.turrets.splice(self.turrets.indexOf(this), 1);
                        } else {
                            if (self.turrets.length < mapObj.map.maxTurrets) {
                                this.turret = true;
                                self.turrets.push(this);
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