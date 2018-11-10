import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
          <div className="btn-toolbar justify-content-end">
            <Link
              className="btn btn-outline-primary btn-small mr-3"
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
          </div>
        </td>
      </tr>
    ));

    return (
      <div>
        <Title>Decks</Title>
        <div className="row">
          <div className="col">
            <div className="btn-toolbar justify-content-between mb-3">
              <Link
                className="btn btn-outline-dark"
                to="/decks/new">
                Add Deck
              </Link>
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
                  onChange={(e) => this.props.setDeckNameFilter(e.target.value)}
                  placeholder="Filter by name"
                />
              </div>
            </div>
          </div>
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
    filterName: selectors.getDeckFilterName(state),
  };
};

export default connect(mapStateToProps, actions)(Decks);
