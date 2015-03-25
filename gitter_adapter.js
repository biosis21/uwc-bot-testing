var events = require('events');
var Gitter = require('node-gitter');

/**
 * Gitter Adapter
 * @param token {String} - your application token.
 * @constructor
 */
var GitterAdapter = function ( token ) {
    if ( !token ) throw "Token is missing!";

    events.EventEmitter.call(this);

    this._gitter = new Gitter(token);
    this.getCurrentUser();
};

GitterAdapter.prototype.__proto__ = events.EventEmitter.prototype;

/**
 * Method gets current user.
 * @returns {*}
 */
GitterAdapter.prototype.getCurrentUser = function () {
    return this._gitter.currentUser().then(function ( user ) {
        console.log('You are logged in as:', user.username);
    });
};

/**
 * Method connects to the room.
 * @param roomId {String} - a room id (name).
 */
GitterAdapter.prototype.joinRoom = function ( roomId ) {
    if ( !roomId ) return;
    this._gitter.rooms.join(roomId).then(function ( room ) {
        this._room = room;
        console.log('You are connected to:', roomId);
        this.emit('join');
    }.bind(this)).fail(function ( err ) {
        console.log('Not possible to join the room: ', err);
    });
};

/**
 * Method listens messages form server.
 * @param cb {Function}.
 */
GitterAdapter.prototype.listenMsg = function ( cb ) {
    this.on('join', function () {
        this._room.listen().on('message', cb);
        console.log('Let\'s try to calculate!');
    });
};

/**
 * Method sends message to the server.
 * @param text {String}
 */
GitterAdapter.prototype.sendMsg = function ( text ) {
    if ( !this._room ) return;
    return this._room.send(text);
};

module.exports = GitterAdapter;