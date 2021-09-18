import './BookShelfList.css';
import BookShelfItem from './BookShelfItem';

/**
 * @param {{
 *          list:[
 *          {
 *             bookShelf:{
 *                  id:number, 
 *                  title:string
 *             },
 *             books:[{
 *                  id:number,
 *                  title:string,
 *                  author:string,
 *                  url:string,
 *                  bookShelfId:string
 *             }],
 *             updateBookShelf:function(book, string)
 *          }]
 *       }} props 
 * @returns {JSX.Element}
 */
const BookShelfList = props => {
    const list = props.list;
    return (
        <div className="list-books-content">
            {list.map(item => <BookShelfItem key={item.bookShelf.id}
                bookShelf={item.bookShelf}
                books={item.books}
                updateBookShelf={props.updateBookShelf} />)}
        </div>
    );
};

export default BookShelfList;