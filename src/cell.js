(function() {

    function cell(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = (type)?type:"free";
    }

    cell.prototype = {
    };

    module.exports = cell;

}());