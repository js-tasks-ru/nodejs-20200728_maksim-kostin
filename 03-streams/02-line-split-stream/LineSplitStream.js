const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  #newLineBuf = [];

  _transform(chunk, encoding, callback) {
    this.#newLineBuf.push(chunk);
    callback();
  }

  _flush(callback) {
    Buffer.concat(this.#newLineBuf)
    .toString()
    .split(os.EOL)
    .forEach(l => {
        this.push(l);
      });
    callback();
  }
}


module.exports = LineSplitStream;
