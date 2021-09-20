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
const BookOptionsMenu = props => {
    const onChangeBookShelf = event => {
        const bookShelfId = event.target.value;
        if (props.book.bookShelfId !== bookShelfId) props.updateBookShelf(props.book, bookShelfId);
    };
    return (<div className="book-shelf-changer">
        <select onChange={onChangeBookShelf} value={props.book.bookShelfId}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>);
}

export default BookOptionsMenu;