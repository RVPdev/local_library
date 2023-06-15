const { partitionBooksByBorrowedStatus } = require("./books.js");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = partitionBooksByBorrowedStatus(books);

  return result[0].length;
}

function _helper(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyA] < obj[keyB]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
  const counter = books
    .reduce((acc, {genre}) => {
      if (acc[genre]) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
      return acc;
    }, {});

  const sortedData = _helper(counter);

  return sortedData.map((name) => ({
    name, count: counter[name]
  })).slice(0,5);
}

function getMostPopularBooks(books) {
  const counter = books
    .reduce((acc, {id, borrows}) => {
      acc[id] = borrows.length
      return acc;
    }, {});

  const sortedData = _helper(counter);
  
  return sortedData.map((id) => {
    const {title:name} = books.find(({id:bookId}) => bookId === id);
    return { name, count: counter[id]}
  }).slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const counter = books
    .reduce((acc, {authorId, borrows}) => {
      if (acc[authorId]) {
        acc[authorId].push(borrows.length);
      } else {
        acc[authorId] = [borrows.length];
      }
      return acc;
    }, {});

    for(let id in counter){
      const sum = counter[id].reduce((first, second) => first + second);
      counter[id] = sum;
    }

  const sortedData = _helper(counter);
  
  return sortedData.map((authorId) => {
    const {name: {first, last},} = authors.find(({id}) => id === (+authorId));
    const name = `${first} ${last}`
    return { name, count: counter[authorId]}
  }).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
