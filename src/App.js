import './App.css';
import { useState, useEffect } from 'react'
import * as BooksApiService from './services/BooksApiService';
import Main from './pages/Main';
import Search from './pages/Search';
import { Route, Switch } from "react-router-dom";
import BOOK_SHELF_TYPE from './Constants/BOOK_SHELF_TYPE';

const App = () => {
  const [myReads, setMyReads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    BooksApiService.getAll()
      .then(books => {
        const bookShelves = books.map(book => book.shelf)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map(bookShelf => ({
            id: bookShelf,
            title: BOOK_SHELF_TYPE[bookShelf]
          }));
        const sortedBooks = bookShelves.map(bookShelf => ({
          bookShelf,
          books: books.filter(book => book.shelf === bookShelf.id).map(book => ({
            id: book.id,
            title: book.title,
            author: book.authors && book.authors.length ? book.authors.join(', ') : '',
            url: book.imageLinks ? book.imageLinks.smallThumbnail : '',
            bookShelfId: bookShelf.id
          }))
        }));
        return sortedBooks;
      })
      .then(setMyReads)
      .then(() => setLoading(false));
  }, []);

  const updateBookShelf = (book, bookShelfId) => {
    if (book.bookShelfId !== bookShelfId) {
      setMyReads(prevMyReads => {
        const newMyReads = [...prevMyReads];
        const bookShelf = newMyReads.find(shelf => shelf.books.find(bookInShelf => bookInShelf.id.toLowerCase() === book.id.toLowerCase()) || false);
        if (bookShelf) {
          const bookToBeDeleted = bookShelf.books.find(bookInShelf => bookInShelf.id.toLowerCase() === book.id.toLowerCase());
          if (bookShelf.books.indexOf(bookToBeDeleted) > -1) bookShelf.books.splice(bookShelf.books.indexOf(bookToBeDeleted), 1);
        }
        book.bookShelfId = bookShelfId;
        const newBookShelf = newMyReads.find(shelf => shelf.bookShelf.id === bookShelfId);
        if (newBookShelf && newBookShelf.id !== 'none') newBookShelf.books.push(book);
        return newMyReads;
      });
      BooksApiService.update(book, bookShelfId);
    }
  };

  return (<Switch>
    <Route exact path='/' render={() => <Main myReads={myReads} updateBookShelf={updateBookShelf} appLoading={loading} />} />
    <Route exact path='/search' render={() => <Search shelvedBooks={myReads.map(shelf => shelf.books).flat()} updateBookShelf={updateBookShelf} appLoading={loading} />} />
  </Switch>
  )
};

export default App;
