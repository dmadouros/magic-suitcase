import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from "../../actions";
import * as selectors from 'src/reducer';
import Title from '../Title/Title';

class Decks extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    const decks = this.props.decks.map((deck) => (
      <tr key={deck.id}>
        <td>{deck.name}</td>
        <td>
          <Link
            className="btn btn-outline-primary btn-small"
            to={`/decks/${deck.id}`}
          >
            Show
          </Link>
          <button
            className="btn btn-outline-secondary btn-small"
            onClick={() => this.props.buildDeck(this.props.history, deck.id)}
          >
            Build
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <Title>Decks</Title>
        <div className="row">
          <p className="col">
            <Link
              className="btn btn-outline-dark"
              to="/decks/new">
              Add Deck
            </Link>
          </p>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-striped table-sm">
              <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
              {decks}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    decks: selectors.getDecks(state),
  };
};

export default connect(mapStateToProps, actions)(Decks);
