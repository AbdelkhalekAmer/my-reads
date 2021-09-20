import './App.css';
import { useState, useEffect } from 'react'
import * as BooksApiService from './services/BooksApiService';
import Main from './pages/Main';
import Search from './pages/Search';
import { Route, Switch } from "react-router-dom";

const App = () => {
  const [myReads, setMyReads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMyReads();
  }, []);

  const updateBookShelf = (book, bookShelfId) => {
    setMyReads(prevMyReads => {
      const newMyReads = [...prevMyReads];
      const newBookShelf = newMyReads.find(shelf => shelf.books.indexOf(book) > -1);
      if (!newBookShelf) return newMyReads;
      newBookShelf.books.splice(newBookShelf.books.indexOf(book), 1);
      book.bookShelfId = bookShelfId;
      if (bookShelfId !== 'none') newMyReads.find(shelf => shelf.bookShelf.id === bookShelfId).books.push(book);
      return newMyReads;
    });
    BooksApiService.update(book, bookShelfId);
  };

  const getMyReads = () => BooksApiService.getAll().then(sortBooks).then(setMyReads).then(() => setLoading(false));

  const sortBooks = books => {
    const bookShelves = books.map(book => book.shelf)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(bookShelf => ({
        id: bookShelf,
        title: getBookShelfTitle(bookShelf)
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
  };

  const getBookShelfTitle = id => {
    switch (id) {
      case 'currentlyReading':
        return 'Currently Reading';
      case 'wantToRead':
        return 'Want To Read';
      case 'read':
        return 'Read';
      default: throw Error('Not supported book shelf type.')
    }
  }
  return (<Switch>
    <Route exact path='/' render={() => <Main myReads={myReads} updateBookShelf={updateBookShelf} appLoading={loading} />} />
    <Route exact path='/search' render={() => <Search shelvedBooks={myReads.map(shelf => shelf.books).flat()} appLoading={loading} />} />
  </Switch>
  )
};

export default App;
