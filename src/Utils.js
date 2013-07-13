(function() {

    var Utils = {};

    Utils.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    module.exports = Utils;

}());