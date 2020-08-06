const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.#limit = options.limit;
  }

  #totalLength = 0;
  #limit = null;

  _transform(chunk, encoding, callback) {
    this.#totalLength += chunk.length;
    if (this.#totalLength > this.#limit) {
      return callback(new LimitExceededError());
    }
    callback(null, chunk);
  }
}


module.exports = LimitSizeStream;