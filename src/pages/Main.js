import './Main.css';
import BookShelfList from '../components/Categories/BookShelfList';
import { Link } from 'react-router-dom';

const Main = ({ myReads, updateBookShelf, appLoading }) => {
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        {appLoading ? <p>Loading...</p> : <BookShelfList list={myReads} updateBookShelf={updateBookShelf} />}
        <div className="open-search">
            <Link to="/search"><button>Add a book</button></Link>
        </div>
    </div>);
};

export default Main;