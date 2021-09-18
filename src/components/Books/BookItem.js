import BookOptionsMenu from '../UI/BookOptionsMenu';
import './App.css';

const BookItem = props => {
    const book = props.book;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.url}")` }}></div>
                <BookOptionsMenu bookId={book.id} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.author}</div>
        </div>
    );
}

export default BookItem;