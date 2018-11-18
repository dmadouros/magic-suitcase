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

  onFilterCardSet = (e) => {
    if (e.target.checked) {
      this.props.addCardSetFilter(e.target.value);
    } else {
      this.props.removeCardSetFilter(e.target.value);
    }
  }

  render() {
    if (this.props.isLoading) {
      return <ReactSpinner/>
    }

    return (
      <div>
        <Title>Cards</Title>
        <div className="row">
          <div className="col">
            <div className="btn-toolbar justify-content-end mb-3">
              <div className="mr-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                  >
                    Filter Card Sets
                  </button>
                  <div className="dropdown-menu">
                    <form className="px-4 py-3">
                      <div className="form-check">
                        <input
                          id="filter-DOM"
                          type="checkbox"
                          className="form-check-input"
                          onChange={this.onFilterCardSet}
                          value="2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filter-DOM"
                        >
                          DOM
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="filter-GRN"
                          type="checkbox"
                          className="form-check-input"
                          onChange={this.onFilterCardSet}
                          value="1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filter-GRN"
                        >
                          GRN
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="filter-M19"
                          type="checkbox"
                          className="form-check-input"
                          onChange={this.onFilterCardSet}
                          value="5"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filter-M19"
                        >
                          M19
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="filter-XLN"
                          type="checkbox"
                          className="form-check-input"
                          onChange={this.onFilterCardSet}
                          value="4"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filter-XLN"
                        >
                          XLN
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="filter-RIX"
                          type="checkbox"
                          className="form-check-input"
                          onChange={this.onFilterCardSet}
                          value="3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="filter-RIX"
                        >
                          RIX
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
          onUpdateQuantity={this.props.updateQuantity}
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
