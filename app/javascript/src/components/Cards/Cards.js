import {List} from 'immutable';
import PropTypes from "prop-types";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as selectors from 'src/reducer';
import * as actions from '../../actions';
import CardTable from '../CardTable/CardTable';
import Title from '../Title/Title';
import ReactSpinner from 'react-spinjs-fix';

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCardSets();
    this.props.fetchCards();
  }

  render() {
    if (this.props.isLoading) {
      return <ReactSpinner />
    }

    return (
      <div>
        <Title>Cards</Title>
        <CardTable
          cards={this.props.cards}
          onIncrement={this.props.incrementQuantity}
          onDecrement={this.props.decrementQuantity}
        />
      </div>
    );
  }
}

Cards.defaultProps = {
  cards: List(),
};

Cards.propTypes = {
  cards: PropTypes.instanceOf(List),
};

const mapStateToProps = (state) => {
  return {
    cards: selectors.getCards(state),
    isLoading: state.cards.get('isLoading'),
  };
};

export default connect(mapStateToProps, actions)(Cards);
