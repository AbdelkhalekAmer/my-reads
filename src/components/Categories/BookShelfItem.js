import './BookShelfItem.css';
import BookList from '../Books/BookList';

/**
 * @param {{
 *          bookShelf:{
 *             id:number, 
 *             title:string
 *          },
 *          books:[{
 *             id:number,
 *             title:string,
 *             author:string,
 *             url:string
 *          }]
 *        }} props 
 * @returns {JSX.Element}
 */
const BookShelfItem = props => {
    const bookShelf = props.bookShelf;
    const books = props.books;
    return (<div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelf.title}</h2>
        <div className="bookshelf-books">
            <BookList books={books} />
        </div>
    </div>);
};

export default BookShelfItem;