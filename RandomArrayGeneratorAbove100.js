module.exports = function getRandomArray(num) {
  const arr = [];
  while (arr.length <= num) {
    const randomNumber = Math.floor(Math.random() * 10000);
    arr.push(randomNumber);
  }
  return arr;
};
