function sum(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return Number(a + b);
  }
  throw new TypeError('Аргументы функции `sum` должны быть числом');
}

module.exports = sum;
