'use strict';
const {
    Transform
} = require('stream');
const {
    EOL
} = require('os');

class LineSplitStream extends Transform {
    constructor(option) {
        super(option);
    }

    #newLineBuf = [];

    _transform(chunk, encoding, callback) {
        this.#newLineBuf.push(chunk);
        callback();
    }

    _flush(callback) {
        console.log(Buffer.concat(this.#newLineBuf).toString().split(EOL));
        Buffer.concat(this.#newLineBuf).toString()
            .split(EOL)
            .forEach(l => {
                console.log(l);
                this.push(l);
            });
        callback();
    }
}

const line = new LineSplitStream({
    encoding: 'utf8',
});
let i = 1;

function onData(line) {
    console.log(i++);
    console.log(line);
}

line.on('data', onData);
line.write('a');
line.write(`b${EOL}`);
line.write(`c${EOL}`);

line.end();