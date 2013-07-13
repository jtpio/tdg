(function() {

    var Turret = {
        MAX_NB: 5,
        RADIUS: 1
    };

    var Map = {
        WIDTH: 32,
        HEIGHT: 24,
        BLOCK_SIZE: 24
    };

    var Soldier = {
        MAX_NB: 10,
        MAX_HP: 100,
        DAMAGE: 50
    };

    global.Turret = Turret;
    global.Map = Map;
    global.Soldier = Soldier;

}());