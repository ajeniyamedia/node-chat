var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createEmail', {
        to: 'ola@yahoo.com',
        text: 'Hey. This is Oladimeji.'
    });

    socket.emit('createMessage', {
        From: 'Oladimeji',
        text: 'Hey. Message from Oladimeji.'
    });
});

socket.on('disconnect', function() {
    console.log('disconnect from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
});

