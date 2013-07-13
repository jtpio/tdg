define(['Network', 'Game'], function(Network, Game) {

    var WIDTH = 768;
    var HEIGHT = 576;

    var Main = function() {
        this.load();
    };

    Main.prototype.load = function() {
        var assetsToLoader = ["img/spriteSheet.json"];
        var loader = new PIXI.AssetLoader(assetsToLoader);

        var self = this;
        loader.onComplete = function() {
            console.log("Assets loaded");

            var renderer =  PIXI.autoDetectRenderer(WIDTH, HEIGHT);
            document.body.appendChild(renderer.view);

            self.game = new Game(renderer, self);
            var host = "http://"+window.location.hostname;
            self.net = new Network(host, self.game);
        };

        loader.load();
    };

    return Main;

});