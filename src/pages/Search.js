import './Search.css';
import BookList from '../components/Books/BookList';
import * as BooksApiService from '../services/BooksApiService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        BooksApiService.search(query)
            .then(mapBooks)
            .then(setBooks)
            .then(() => setLoading(false))
    }, [query]);

    const updateBookShelf = (book, bookShelfId) => {
        setLoading(true);
        console.log(book, bookShelfId);
        BooksApiService.update(book, bookShelfId).then(response => {
            BooksApiService.search(query)
                .then(mapBooks)
                .then(setBooks)
                .then(() => setLoading(false));
        });
    };

    const mapBooks = books => books && books.length ? books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.authors && book.authors.length ? book.authors[0] : '',
        url: book.imageLinks ? book.imageLinks.smallThumbnail : '',
        bookShelfId: book.shelf || 'none'
    })
    ) : [];

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

export default Search