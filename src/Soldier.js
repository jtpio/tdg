(function(){
	function Soldier(x, y, player_no){
		this.x = x;
		this.y = y;
		this.regiment = player_no;
	}
	Soldier.prototype = {
		"SPEED":10,
		"move": function( path, direction){

		},
		"status": function(){
           return "win"
		}
	}
	module.exports = Soldier;
}());