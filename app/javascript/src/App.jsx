import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Cards from './components/Cards/Cards';
import Decks from './components/Decks/Decks';
import AddDeck from './components/Decks/AddDeck';
import ShowDeck from './components/Decks/ShowDeck';
import Order from './components/Order/Order';

export const App = class extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <div className="container">
            <Route path="/" exact component={Cards}/>
            <Route path="/cards" component={Cards}/>
            <Route path="/decks" exact component={Decks}/>
            <Route path="/decks/new" exact component={AddDeck}/>
            <Route path="/decks/:id" component={ShowDeck}/>
            <Route path="/order/new" component={Order}/>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
