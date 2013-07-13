(function() {

    function cell(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = (type)?type:"empty";
    }

    cell.prototype = {
    };

    module.exports = cell;

}());