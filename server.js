var sys          = require('sys'),
    nconf        = require('nconf'),
    express      = require('express'),
    app          = express(),
    server       = require('http').createServer(app),
    io           = require('socket.io').listen(server),
    pcap         = require('pcap'),
    tcp_tracker  = new pcap.TCP_tracker(),
    pcap_session = pcap.createSession('eth0', 'ip proto \\tcp and tcp port 443 || 80');
    game         = {};

// high scores!

nconf.use('file', { file: './highscores.json' });
nconf.load();

// game counter

game = {
  player1: {
    ip: '10.42.0.20',
    name: '',
    score: 0
  },
  player2: {
    ip: '10.42.0.78',
    name: '',
    score: 0
  }
};

// pcap

setInterval(function () {
  var stats = pcap_session.stats();
  if (stats.ps_drop > 0) {
    sys.puts('pcap dropped packets: ' + sys.inspect(stats));
  }
}, 2000);

tcp_tracker.on('start', function (session) {
  console.log('tcp start btw ' + session.src_name + ' and ' + session.dst_name);
  console.log('score: ' + game.player1.score);
  //console.log(sys.inspect(session));
});

tcp_tracker.on('end', function (session) {
  console.log('tcp end btw ' + session.src_name + ' and ' + session.dst_name);
  //console.log('stats: ' + sys.inspect(tcp_tracker.session_stats(session)));
});

pcap_session.on('packet', function(raw_packet) {
  var packet = pcap.decode.packet(raw_packet);
  tcp_tracker.track_packet(packet);
});

// webapp

server.listen(8080);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('gamestate', game);
  setInterval(function() {
    socket.emit('gamestate', game);
  }, 2000);
  socket.on('newgame', function(players) {
    // setup
    game.player1.name = players[0];
    game.player2.name = players[1];
    // scoring
    tcp_tracker.on('start', function (session) {
      if (session.dst.match(/:443$/)) {
        if (session.src_name.indexOf(game.player1.ip) === 0) {
          game.player1.score++;
        } else if (session.src_name.indexOf(game.player2.ip) === 0){
          game.player2.score++;
        }
      } else {
        if (session.src_name.indexOf(game.player1.ip) === 0) {
          game.player1.score--;
        } else if (session.src_name.indexOf(game.player2.ip) === 0){
          game.player2.score--;
        }
      }
    });
  });
  socket.on('endgame', function() {
    var gameid = Math.round((new Date()).getTime() / 1000); // unix timestamp
    nconf.set(gameid+':state', 'finished');
    nconf.set(gameid+':p1:name', game.player1.name);
    nconf.set(gameid+':p1:score', game.player1.score);
    nconf.set(gameid+':p2:name', game.player2.name);
    nconf.set(gameid+':p2:score', game.player2.score);
    nconf.save();
    game.player1.name = game.player1.score = game.player2.name = game.player2.score = '';
  });
});
