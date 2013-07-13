(function() {

	function Soldier(pos){
		this.pos = pos;
		this.hp = global.Soldier.MAX_HP;
	}

	Soldier.prototype = {
		"hurt": function() {
			this.hp -= global.Soldier.DAMAGE;
			this.hp = Math.max(0, this.hp);
			return this.hp === 0;
		}
	};

	module.exports = Soldier;

}());