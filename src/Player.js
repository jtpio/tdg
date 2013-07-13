(function(){
	var Defence = require('./Defence');
	var Army = require('./Army');
	function Player(player_id){
		this.player_id = player_id
		this.turrets = [];
		this.army = new  Army();
		this.defence = new Defence();
		this.is_ready = false;
	}
	Player.prototype = {
		"is_ready": function(){
            return this.is_ready;
		},
		"set_ready":function(){
			this.is_ready = true;
		},
		"build_army":function(){
			this.army.build_army();
		}
	}
	module.exports = Player;
}());