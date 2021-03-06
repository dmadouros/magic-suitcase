import {List} from 'immutable';
import PropTypes from "prop-types";
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as selectors from 'src/reducer';
import * as actions from '../../actions';
import CardTable from '../CardTable/CardTable';
import Title from '../Title/Title';
import ReactSpinner from 'react-spinjs-fix';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CardSetFilter from '../CardSetFilter/CardSetFilter';

class Cards extends Component {
  componentDidMount() {
    this.props.fetchCardSets();
    this.props.fetchCards();
  }

  onFilterCardSet = (e) => {
    if (e.target.checked) {
      this.props.addCardSetFilter(e.target.value);
    } else {
      this.props.removeCardSetFilter(e.target.value);
    }
  }

  onHideOwnedCards = (e) => {
    if (e.target.checked) {
      this.props.setHideOwnedCards(true);
    } else {
      this.props.setHideOwnedCards(false);
    }
  }

  onFocus = (e) => {
    e.target.select();
  };

  render() {
    if (this.props.isLoading) {
      return <ReactSpinner/>
    }

    return (
      <div>
        <div className="row">
          <div className="col">
            <Title>Cards</Title>
          </div>
        </div>

        <div className="row no-gutters justify-content-end pb-2">
          <div className="col-2 text-right pl-2">
            <CardSetFilter
              onFilterCardSet={this.onFilterCardSet}
              cardSets={this.props.cardSets}
            />
          </div>
          <div className="col-3 pl-2">
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
                onFocus={this.onFocus}
              />
            </div>
          </div>
          <div className="col-3 pl-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    id="hide-owned-cards"
                    type="checkbox"
                    onChange={this.onHideOwnedCards}
                    checked={this.props.hideOwnedCards}
                  />
                </div>
              </div>
              <label
                className="form-control"
                htmlFor="hide-owned-cards"
              >
                Hide Owned Cards?
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CardTable
              cards={this.props.cards}
              onIncrement={this.props.incrementQuantity}
              onDecrement={this.props.decrementQuantity}
              onUpdateQuantity={this.props.updateQuantity}
            />
          </div>
        </div>
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
    hideOwnedCards: state.cards.get('cards').get('filters').get('hideOwnedCards'),
    cardSets: selectors.getCardSets(state),
  };
};

export default connect(mapStateToProps, actions)(Cards);
