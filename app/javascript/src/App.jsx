import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as Cards from 'src/reducer';
import * as actions from './actions';

export const App = class extends React.Component {
  constructor(props) {
    super(props);

    props.fetchCardSets();
    props.fetchCards();
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement(e) {
    const cardId = e.target.getAttribute('data-id');
    this.props.incrementQuantity(cardId);
  }

  onDecrement(e) {
    const cardId = e.target.getAttribute('data-id');
    this.props.decrementQuantity(cardId);
  }

  renderRow(card) {
    return (
      <tr key={card.get('id')}>
        <td>{card.get('card_set_name')}</td>
        <td>{card.get('name')}</td>
        <td>
          <div className="input-group">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary"
                      disabled={card.get('quantity') <= 0}
                      type="button"
                      onClick={this.onDecrement}
                      data-id={card.get('id')}
              >
                -
              </button>
            </div>
            <input className="text-center border border-secondary"
                   type="text"
                   value={card.get('quantity')}
                   style={{ display: 'inline-block', width: 40 }}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.onIncrement}
                      data-id={card.get('id')}
              >
                +
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  renderRows() {
    return this.props.cards.valueSeq().map(card => {
      return this.renderRow(card);
    });
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Magic Suitcase</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Cards</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Decks</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <h1 className="mt-4">Cards</h1>
        </div>
        <div className="row">
          <table className="table table-striped table-sm">
            <thead className="thead-dark">
            <tr>
              <th>Set</th>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {this.renderRows()}
            </tbody>
          </table>
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
