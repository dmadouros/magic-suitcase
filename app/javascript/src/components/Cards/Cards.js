import {List} from 'immutable';
import PropTypes from "prop-types";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as selectors from 'src/reducer';
import * as actions from '../../actions';
import CardTable from '../CardTable/CardTable';
import Title from '../Title/Title';
import ReactSpinner from 'react-spinjs-fix';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        <div className="row">
          <div className="col">
            <div className="btn-toolbar justify-content-end mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon="search"/>
                </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.props.filterName}
                  onChange={(e) => this.props.setCardNameFilter(e.target.value)}
                  placeholder="Filter by name"
                />
              </div>
            </div>
          </div>
        </div>
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
    filterName: selectors.getCardFilterName(state),
  };
};

export default connect(mapStateToProps, actions)(Cards);
