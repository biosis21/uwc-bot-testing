"use strict";

var argv            = require('yargs').argv;
var GitterAdapter   = require('./gitter_adapter.js');
var Calculator      = require('./calculator.js');
var CONFIG          = require('./config.json');

// It checks a --room argument with value in CLI.
if (!argv.room) {
    throw "Room was missed!";
}

var gitterAdapter      = new GitterAdapter(CONFIG.token);
var calculator         = new Calculator();

// connecting to the room.
gitterAdapter.joinRoom(argv.room);

// It listens new messages.
gitterAdapter.listenMsg(function ( msg ) {

    // Sending.
    gitterAdapter.sendMsg(calculator.calculate(msg.text));
});
