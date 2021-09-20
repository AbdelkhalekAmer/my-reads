import './BookItem.css';
import BookOptionsMenu from '../UI/BookOptionsMenu';

/**
 * @param {{
 *          book:{
 *             id:number,
 *             title:string,
 *             author:string,
 *             url:string,
 *             bookShelfId:string
 *          },
 *          updateBookShelf:function(book, string)
 *        }} props 
 * @returns {JSX.Element}
 */
const BookItem = props => {
    const book = props.book;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.url}")` }}></div>
                    <BookOptionsMenu updateBookShelf={props.updateBookShelf} book={book} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
            </div>
        </li>
    );
}

export default BookItem;