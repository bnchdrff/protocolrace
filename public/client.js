/**
 * Protocol race.
 */

(function($) {
$(document).ready(function() {

var socket = io.connect('http://localhost:8080');

var game = {};

$('#startstop').click(function(ev) {
  if($('#startstop').text() === 'START') {
    startgame();
  } else {
    stopgame();
  }
});

var startgame = function() {
  // start it
  var p1 = $('#p1 input').val();
  $('#p1 input').val('').hide();
  $('#p1 h2').text(p1);
  var p2 = $('#p2 input').val();
  $('#p2 input').val('').hide();
  $('#p2 h2').text(p2);
  socket.emit('newgame', [p1,p2]);
  $('#startstop').text('STOP');
};

var stopgame = function() {
  // stop it
  socket.emit('endgame');
  $('#p1 h2, #p2 h2, #thisgame').each(function() {
    $(this).text('');
  });
  $('#p1 input, #p2 input').show();
  $('#lastgame').text('Last game: ' + game.player1.name + ' scored ' + game.player1.score + ' and ' + game.player2.name + ' scored ' + game.player2.score);
  $('#startstop').text('START');
};

socket.on('gamestate', function (gamestate) {
  console.log(gamestate);
  $('#p1 h2').text(gamestate.player1.name);
  $('#p2 h2').text(gamestate.player2.name);
  game = gamestate;
  $('#thisgame').text('This game: ' + game.player1.name + ' scored ' + game.player1.score + ' and ' + game.player2.name + ' scored ' + game.player2.score);
  if (gamestate.player1.name.length > 0) {
    $('#p1 input').val('').hide();
    $('#p2 input').val('').hide();
    $('#startstop').text('STOP');
  }
});

});
})(jQuery);
