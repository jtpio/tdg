define(function() {

    var Game = function(renderer, main) {
        this.playerNr = 0;
        this.renderer = renderer;
        this.main = main;
        this.stage = new PIXI.Stage(0x8dd35f, true);
        this.map = {};
        this.turrets = [];
        this.load();
        this.last = Date.now();
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

    Game.prototype.setOtherTurrets = function(otherTurrets) {
        var turretNr = this.playerNr ^ 3;
        for (var i = 0; i < otherTurrets.length; i++) {
            var sprite = new PIXI.Sprite.fromImage('turret'+ turretNr + '.png');
            sprite.position.x = otherTurrets[i].x * this.map.map.blockSize;
            sprite.position.y = otherTurrets[i].y * this.map.map.blockSize;
            this.stage.addChild(sprite);
        }
    };

    Game.prototype.setStatus = function(status) {
        this.statusPos = 0;
        this.status = status;

        this.soldiers = {};
        this.populateSoldiers(1);
        this.populateSoldiers(2);
    };

    Game.prototype.populateSoldiers = function(playerNr) {
        var self = this;
        self.soldiers[playerNr] = [];
        for (var s = 0; s < self.map.map.maxSoldiers; s++) {
            var soldierSprite = new PIXI.Sprite.fromImage('unit.png');
            //var pos = (playerNr == 1)?self.map.path[0]:self.map.path[self.map.path.length-1];
            var pos = {x:0, y:0};
            soldierSprite.position.x = pos.x * self.map.map.blockSize;
            soldierSprite.position.y = pos.y * self.map.map.blockSize;
            soldierSprite.pos = -s;
            self.soldiers[playerNr].push(soldierSprite);
            self.stage.addChild(soldierSprite);
        }
    };

    Game.prototype.updateSoldiers = function(playerNr, status, offset) {
        var dead = status.dead;
        var attacked = status.attacked;
        var toDie = [];
        for (var i = 0; i < this.soldiers[playerNr].length; i++) {
            var sprite = this.soldiers[playerNr][i];
            if (dead.indexOf(sprite.pos) != -1) {
                toDie.push(sprite);
            } else {
                var sPos = this.map.map.path[sprite.pos + offset];
                if (sPos) {
                    sprite.position.x = sPos.x * this.map.map.blockSize;
                    sprite.position.y = sPos.y * this.map.map.blockSize;
                }
            }
        }

        for (var i = 0; i < toDie.length; i++) {
            this.soldiers[playerNr].splice(this.soldiers[playerNr].indexOf(toDie[i]), 1);
            this.stage.removeChild(toDie[i]);
        }
    };

    Game.prototype.simulate = function(dt) {
        var status1 = this.status.status1[this.statusPos];
        var status2 = this.status.status2[this.statusPos];

        if (!status1 && !status2) return;
        var status = status1 || status2;
        var offset = status.offset;

        if (status1) {
            this.updateSoldiers(1, status1, offset);
        }

        if (status2) {
            this.updateSoldiers(2, status2, offset);
        }
        this.statusPos++;
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
        var now = Date.now();
        var dt = now - this.last;
        if (dt > 200 && this.status) {
            this.simulate(dt);
            this.last = now;
        }
        this.renderer.render(this.stage);
        requestAnimFrame(this.tick.bind(this));
    };

    return Game;

});