/**
 * Protocol race.
 */

(function($) {
$(document).ready(function() {

var socket = io.connect('http://localhost:8080');
socket.on('score', function (data) {
  console.log(data);
});

});
})(jQuery);
