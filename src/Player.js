(function(){

	var Defence = require('./Defence');
	var Army = require('./Army');

	function Player(playerID){
		this.player_id = playerID;
		this.turrets = [];
		this.army = new  Army();
		this.defence = new Defence();
		this.isReady = false;
	}

	Player.prototype = {
		"buildArmy":function(){
			this.army.buildArmy();
		}
	};

	module.exports = Player;

}());