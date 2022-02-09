module.exports.stringify = (value) => {
  return typeof value !== 'string' ? JSON.stringify(value) : value;
}