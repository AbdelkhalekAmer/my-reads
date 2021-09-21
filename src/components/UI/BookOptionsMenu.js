import BOOK_SHELF_TYPE from '../../Constants/BOOK_SHELF_TYPE';
import './BookOptionsMenu.css';

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
const BookOptionsMenu = ({ book, updateBookShelf }) => {
    const onChangeBookShelf = event => {
        const bookShelfId = event.target.value;
        if (bookShelfId) updateBookShelf(book, bookShelfId);
    };
    return (<div className="book-shelf-changer">
        <select onChange={onChangeBookShelf} value={book.bookShelfId}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">{BOOK_SHELF_TYPE.currentlyReading}</option>
            <option value="wantToRead">{BOOK_SHELF_TYPE.wantToRead}</option>
            <option value="read">{BOOK_SHELF_TYPE.read}</option>
            <option value="none">{BOOK_SHELF_TYPE.none}</option>
        </select>
    </div>);
}

export default BookOptionsMenu;