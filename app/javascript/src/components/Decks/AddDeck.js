import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as selectors from 'src/reducer';
import * as actions from '../../actions';
import Title from '../Title/Title';
import {Link} from "react-router-dom";

class AddDeck extends Component {
  onContentsInput = (e) => {
    this.props.setDeckContents(e.target.value);
  }

  onNameInput = (e) => {
    this.props.setDeckName(e.target.value);
  }

  render() {
    return (
      <div>
        <Title>Add Deck</Title>
        <form>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-control"
                type="text"
                value={this.props.name}
                onInput={this.onNameInput}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="contents">Contents</label>
              <textarea
                id="contents"
                className="form-control"
                onInput={this.onContentsInput}
                value={this.props.contents}
                rows={15}
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-right">
              <Link
                className="btn btn-link"
                to="/decks">
                Cancel
              </Link>
              <button
                className="btn btn-outline-dark"
                onClick={() => this.props.saveDeck(this.props.history)}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contents: selectors.getDeckContents(state),
    name: selectors.getDeckName(state),
  };
};

export default connect(mapStateToProps, actions)(AddDeck);


