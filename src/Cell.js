(function() {

    function Cell(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = (type)?type:"empty";
    }

    Cell.prototype = {
    };

    module.exports = Cell;

}());