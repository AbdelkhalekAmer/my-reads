import './App.css';
import Main from './pages/Main';
import Search from './pages/Search';
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path='/' render={() => <Main />} />
    <Route exact path='/search' render={() => <Search />} />
  </Switch>
);

export default App;
