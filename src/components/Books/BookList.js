import BookItem from './BookItem';
import './BookList.css';

/**
 * @param {{
 *          books:[{
 *             id:number,
 *             title:string,
 *             author:string,
 *             url:string,
 *             bookShelfId:string
 *          }],
 *          updateBookShelf:function(book, string)
 *        }} props 
 * @returns {JSX.Element}
 */
const BookList = props => {
    const books = props.books;
    //TODO:add another implementation for empty book list.
    return (
        <ol className="books-grid">
            {
                books.length ?
                    books.map(book => <BookItem key={book.id} book={book} updateBookShelf={props.updateBookShelf} />) :
                    <p>No available books in this book shelf.</p>
            }
        </ol>
    );
}

export default BookList;