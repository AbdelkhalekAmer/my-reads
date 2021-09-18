import BookItem from './BookItem';
import './BookList.css';

const BookList = props => {
    const books = props.books;
    //TODO:add another implementation for empty book list.
    return (
        <ol className="books-grid">
            {books.length ? books.map(book => <BookItem book={book} />) : <p>N/A</p>}
        </ol>
    );
}

export default BookList;