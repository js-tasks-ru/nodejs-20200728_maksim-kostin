const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  #lineBuff = '';

  _transform(chunk, encoding, callback) {
    const isHasEOL = chunk.toString()
      .includes(os.EOL);
    this.#lineBuff += chunk.toString();
    if (isHasEOL) {
      this.#lineBuff = this.#lineBuff.split(os.EOL);
      const pop = this.#lineBuff.pop();
      this.#lineBuff.forEach(line => {
        this.push(line);
      });
      this.#lineBuff = pop;
    }
    callback();
  }

  _flush(callback) {
    callback(null, this.#lineBuff);
  }
}

module.exports = LineSplitStream;