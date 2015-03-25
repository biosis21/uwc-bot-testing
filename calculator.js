/**
 * Calculator
 * @constructor
 */
var Calculator = function () {
    this.REGEXP_MATH_OPERATION = /^\s*calc\s+(.*)$/gim;
    this._isMatched = false;
};

/**
 * Method executes value.
 * @param exp {String}
 * @returns {string|Number} - Error message or formed expression.
 */
Calculator.prototype.execute = function ( exp ) {
    var res = 'Error: Does not correct expression!';
    try {
        res = Function("return " + exp + ";")();
    } catch ( e ) {
    }
    return res;
};

/**
 * Method creates a new message such as '1+2=3'.
 * @param value {String} - the expression without 'calc' such as '1+2'.
 * @param result {String|Number} - executed value.
 * @returns {string}.
 */
Calculator.prototype.concat = function ( value, result ) {
    return value + '=' + result + '\n';
};

/**
 * Method parses message.
 * @param msg {String}
 * @returns {string|undefined} - a new message or undefined when message did not match.
 */
Calculator.prototype.parse = function ( msg ) {
    var arr,
        output = '',
        exp = '';

    while ( (arr = this.REGEXP_MATH_OPERATION.exec(msg)) !== null ) {
        this._isMatched = true;
        exp = arr[1];
        output += this.concat(exp, this.execute(exp));
    }

    if ( this._isMatched ) {
        this._isMatched = false;
        return output;
    }
};

/**
 * Method handlers input data on existing and runs parsing.
 * @param msg {String} - the message expression such as 'calc 1+2'.
 * @returns {string} - a new message.
 */
Calculator.prototype.calculate = function ( msg ) {
    if ( !msg ) return;
    return this.parse(msg);
};

module.exports = Calculator;