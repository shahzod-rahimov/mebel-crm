function getUniqueID(id) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const length = letters.length;

  return `${letters[getRandomNumber(length)]}${
    letters[getRandomNumber(length)]
  }${1000 + id}`;
}

function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

module.exports = { getUniqueID };
