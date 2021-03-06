import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReactSpinner from 'react-spinjs-fix';

import * as actions from "../../actions";
import * as selectors from 'src/reducer';
import Title from '../Title/Title';

class Decks extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    if (this.props.isLoading) {
      return <ReactSpinner/>
    }

    const decks = this.props.decks.map((deck) => (
      <tr key={deck.id}>
        <td>{deck.name}</td>
        <td>
          <div className="btn-toolbar justify-content-end">
            <Link
              className="btn btn-outline-primary btn-small mr-2"
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

    const onFocus = (e) => {
      e.target.select();
    };

    return (
      <div>
        <div className="row">
          <div className="col">
            <Title>Decks</Title>
          </div>
        </div>
        <div className="row no-gutters pb-2">
          <div className="col">
            <Link
              className="btn btn-outline-dark"
              to="/decks/new">
              Add Deck
            </Link>
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
                onChange={(e) => this.props.setDeckNameFilter(e.target.value)}
                placeholder="Filter by name"
                onFocus={onFocus}
              />
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
    isLoading: state.cards.get('isLoading'),
  };
};

export default connect(mapStateToProps, actions)(Decks);
