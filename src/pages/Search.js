import './Search.css';
import BookList from '../components/Books/BookList';
import * as BooksApiService from '../services/BooksApiService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = ({ shelvedBooks, updateBookShelf, appLoading }) => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(appLoading);

    useEffect(() => {
        if (query) {
            setLoading(true);
            BooksApiService.search(query)
                .then(books => {
                    return books && books.length ? books.map(book => ({
                        id: book.id,
                        title: book.title,
                        author: book.authors && book.authors.length ? book.authors.join(', ') : '',
                        url: book.imageLinks ? book.imageLinks.smallThumbnail : '',
                        bookShelfId: getBookShelfId(book.id)
                    })
                    ) : [];
                })
                .then(setBooks)
                .then(() => setLoading(false));
        }
        else {
            setBooks([]);
        }
    }, [query]);

    const getBookShelfId = id => {
        const book = shelvedBooks.find(shelvedBook => shelvedBook.id === id);
        return book ? book.bookShelfId : 'none';
    };

    const onSearchBoxChange = event => setQuery(event.target.value || '');

    return (<div className="search-books">
        <div className="search-books-bar">
            <Link to='/'><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={onSearchBoxChange} />
            </div>
        </div>
        <div className="search-books-results">
            {loading ? <p>Loading...</p> : books.length ? <BookList books={books} updateBookShelf={updateBookShelf} /> : null}
        </div>
    </div>);
};

export default Search;