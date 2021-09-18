import { useState, useEffect } from 'react'
import './Main.css';
import BookShelfList from '../components/Categories/BookShelfList';
import * as BooksApiService from '../services/BooksApiService';

const Main = props => {
    const [booksShelfList, setbooksShelfList] = useState([]);

    useEffect(() => {
        BooksApiService.getAll().then(books => {
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
                    author: book.authors[0],
                    url: book.imageLinks.smallThumbnail
                }))
            }));
            setbooksShelfList(sortedBooks);
        });
    }, []);

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

    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <BookShelfList list={booksShelfList} />
        <div className="open-search">
            <button>Add a book</button>
        </div>
    </div>);
};

export default Main;