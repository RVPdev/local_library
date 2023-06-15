function findAccountById(accounts, id) {
  const result = accounts.find(account => account.id === id);
  return result
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((account1, account2) => {
    return account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1: -1;
  })
  return result;
}

// It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
function getTotalNumberOfBorrows(account, books) {
  const {id} = account;
  let counter = 0;
  // let arr = [];
  for (let book of books) {
    let borrow = book.borrows;
    let result = borrow.filter(element => element.id === id);
    counter += result.length;
    // arr.push(...result);
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
  // des variable from account
  const {id} = account;

  const arr = []; // create base array variable

  // iterate over books object
  for(let book of books) {

    // create temp variable
    let borrow = book.borrows;

    // if-cond check
    if(!borrow[0].returned && borrow[0].id === id){

      // including author information and storing it in a variable
      let found = authors.find(author => author.id === book.authorId);
      book.author = found;
      arr.push(book); // It returns an array of book objects
    }
  }
  // console.log(arr);  

  // It returns an array of book objects
  return arr;
}

// another way w/ .filter() & .map()

// function getBooksPossessedByAccount(account, books, authors) {
//   return books
//     .filter((book) => {
//       let borrow = book.borrows;
//       return !borrow[0].returned && borrow[0].id === account.id;
//     })
//     .map((book) => {
//         let author = authors.find(author => author.id === book.authorId);
//         return { ...book, author)




module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
