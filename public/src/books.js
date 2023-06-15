function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // const checkedBooks = [];
  // const returnedBooks = [];
  const result = [[], []];

  for (let book of books) {
    let borrow = book.borrows[0].returned;
    if (borrow) {
      result[1].push(book);
    } else {
      result[0].push(book);
    }
  }
  //   const total = []; [checkedBooks, returnedBooks]
  // total.push(checkedBooks);
  // total.push(returnedBooks);
  return result;
}

// with reduce method
// function partitionBooksByBorrowedStatus(books) {
//   return books.reduce((result, book) => {
//     let borrow = book.borrows[0].returned;
//     if (borrow) {
//       result[1].push(book);
//     } else {
//       result[0].push(book);
//     }
//     return result;
//   }, [[], []])
// }

function getBorrowersForBook(book, accounts) {
  const borrowsID = book.borrows;
  const result = [];
  borrowsID.forEach(element => {
    let returnStat = element.returned;
    accounts.forEach(account => {
      if(account.id === element.id) {
        account["returned"] = returnStat;
        result.push(account);
      }
    })
  });
  return result.splice(0,10);
  //  I need to compare the borrowsID
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
