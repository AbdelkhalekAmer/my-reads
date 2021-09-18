import BookItem from './BookItem';
import './BookList.css';

/**
 * @param {{
 *          books:[{
 *             id:number,
 *             title:string,
 *             author:string,
 *             url:string
 *          }]
 *        }} props 
 * @returns {JSX.Element}
 */
const BookList = props => {
    const books = props.books;
    //TODO:add another implementation for empty book list.
    return (
        <ol className="books-grid">
            {books.length ? books.map(book => <BookItem key={book.id} book={book} />) : <p>N/A</p>}
        </ol>
    );
}

export default BookList;