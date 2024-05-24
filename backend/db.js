const data = {
  authors: [
    { id: '1', name: 'J.K. Rowling' },
    { id: '2', name: 'J. D. Salinger' },
    { id: '3', name: 'Stephen King' },
    { id: '4', name: 'Victor Hugo' },
  ],
  books: [
    {
      id: '10',
      title: "Harry Potter and the Sorcerer's stone",
      authorId: '1',
    },
    {
      id: '11',
      title: 'Harry Potter and the Chamber of Secrets',
      authorId: '1',
    },
    {
      id: '12',
      title: 'Harry Potter and the Prisoner of Azkaban',
      authorId: '1',
    },
    { id: '20', title: 'Catcher in the Rye', authorId: '2' },
    { id: '31', title: 'The Shining', authorId: '3' },
    { id: '32', title: 'Christine', authorId: '3' },
  ],
};

const db = {
  getAuthors() {
    return data.authors;
  },
  getAuthor(authorId) {
    return data.authors.find(author => author.id === authorId);
  },
  getAuthorBooks(authorId) {
    return data.books.filter(book => book.authorId === authorId);
  },
  getBooks() {
    return data.books;
  },
  getBook(bookId) {
    let a = data.books.find(book => book.id === bookId);
    console.log(a);
    return a;
  },
  getBookAuthor(bookId) {
    const { authorId } = this.getBook(bookId);
    return this.getAuthor(authorId);
  },
  createAuthor(input) {
    console.log(input);
    return [...data.authors, input]
  },
  addAuthor(args) {
    const newAuthor = {
      id: data.authors.length + 1,
      name: args.name,
    }
    data.authors.push(newAuthor);
    console.log(newAuthor);
    return newAuthor;
  }
};

 module.exports = db;