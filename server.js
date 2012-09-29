var sys          = require('sys'),
    express      = require('express'),
    app          = express(),
    server       = require('http').createServer(app),
    io           = require('socket.io').listen(server),
    pcap         = require('pcap'),
    tcp_tracker  = new pcap.TCP_tracker(),
    pcap_session = pcap.createSession('eth0', 'ip proto \\tcp and tcp port 443 || 80');
    scoreboard   = {};

// game counter

scoreboard = {
  player1: 0,
  player2: 0
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
  if (session.dst.match(/:443$/)) {
    scoreboard.player1++;
  } else {
    scoreboard.player1--;
  }
  console.log('score: ' + scoreboard.player1);
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
  socket.emit('score', scoreboard);
  tcp_tracker.on('start', function () { socket.emit('score', scoreboard) });
});
