var BLOCK_SIZE = 24;
var WIDTH_N_BLOCKS = 32;
var HEIGHT_N_BLOCKS = 24;
var SOLDIER_SIZE = 16;
var NO_TURRETS = 4;
var NO_UNITS = 5;
var UNIT = {
	'speed' : 10,
	'max_health' : 100
};

player_1_units = [];
player_2_units = [];

player_1_points = 0;
player_2_points = 0;
player_1_alive = 0;
player_2_alive = 0;

player1_turret_positions = [];
player2_turret_positions = [];

state = null;

$(document).ready(function(){
  var stage = new PIXI.Stage(0x000000)
  var renderer = new PIXI.autoDetectRenderer(576, 576);

  document.body.appendChild(renderer.view);
  
  var soldier_texture = PIXI.Texture.fromImage("/img/sword_soldier.gif");
  var path_texture = PIXI.Texture.fromImage("/img/sword_soldier.gif");

  // generate player 1 soldiers and player 2 soldiers.
  for(var i=0; i<NO_UNITS; i++){
  	var soldier = new PIXI.Sprite(soldier_texture);
  	soldier.anchor.x = 0.0;
  	soldier.anchor.y = 0.0; 
  	soldier.position.x = i*32 + 16;
  	soldier.position.y = 544 + 16;
  	player_1_units.push(soldier);
  	stage.addChild(soldier);
  	var soldier = new PIXI.Sprite(soldier_texture);
  	soldier.anchor.x = 0.0;
  	soldier.anchor.y = 0.0; 
  	soldier.position.x = 512 - (i*32 + 16);
  	soldier.position.y = 544 + 16;
  	player_2_units.push(soldier);
  	stage.addChild(soldier);
  }

  requestAnimFrame(animate);
  function animate(){
  	requestAnimFrame(animate);
  	renderer.render(stage);
  }
  function get_click_position(e, self){
  	var parentOffset = $(self).parent().offset();
	var rel_x = e.pageX - parentOffset.left;
	var rel_y = e.pageY - parentOffset.top;
	return [rel_x, rel_y]
  }

  function get_tile_position(x, y){
    return([Math.ceil(x/24), Math.ceil(y/24)]);
  }
  function place_turret(x,y){
  	tile_pos = get_tile_position(x, y);
  }
  function activate_click_events(){
  	$('canvas').click(function(e){
  		e.preventDefault();
  		[x, y] = get_click_position(e, this);
  		switch(state){
  			case 'PlaceTurrets': place_turret(x,y);break;
  		}
  	});
  }

  function render_map(map){

  	stage.
  }

    var host = "http://"+window.location.hostname;
    var socket = new io.connect(host);

    socket.on('connect', function() {
        console.log("Connected");
    });
    
    socket.on('map', function(map){
    	render_map(map);
    	state = 'PlaceTurrets';
    	team = map.team;
    	activate_click_events();
        console.log("got message " + JSON.stringify(map));
    });

    socket.on('move', function(move){

    	console.log('Move received' + JSON.stringify(move));
    });
    
    socket.on('status', function(status){

    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
    
    socket.emit("join", {});
});