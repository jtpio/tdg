(function(){
	var Turrets = new require('./Turrets');
	function Defence(){
		this.turrets = [];
	}
	Defence.prototype = {
		"set": function(turrets){
			if(Turrets.MAX_NB >= turrets.length && turrets.length>0){}
				this.turrets = [];
				for(var i=0;i<turrets.length;i++){
					this.turrets.push(new Turret(turrets[i]));
				}
			}
		}
	}
	module.exports = Defence;
}());