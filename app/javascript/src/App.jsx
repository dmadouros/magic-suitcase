import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import * as Cards from 'src/reducer';
import * as actions from './actions';
import CardTable from './components/CardTable/CardTable';
import Navbar from './components/Navbar/Navbar';
import Title from './components/Title/Title';

export const App = class extends React.Component {
  componentDidMount() {
    this.props.fetchCardSets();
    this.props.fetchCards();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Title />
          <CardTable
            cards={this.props.cards}
            onIncrement={this.props.incrementQuantity}
            onDecrement={this.props.decrementQuantity}
          />
        </div>
      </div>
    );
  }
};

App.defaultProps = {
  cards: List(),
};

App.propTypes = {
  cards: PropTypes.instanceOf(List),
};

const mapStateToProps = (state) => {
  return {
    cards: Cards.getCards(state),
  };
};

export default connect(mapStateToProps, actions)(App);
