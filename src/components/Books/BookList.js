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
    return (
        <ol className="books-grid">
            {
                books.length ?
                    books.map(book => <BookItem key={book.id} book={book} updateBookShelf={props.updateBookShelf} />) :
                    <p>No available books.</p>
            }
        </ol>
    );
}

export default BookList;