import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as selectors from 'src/reducer';
import * as actions from '../../actions';
import Title from '../Title/Title';

class ShowDeck extends Component {
  render() {
    return (
      <div>
        <Title>Deck</Title>
        <form>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-control"
                type="text"
                value={this.props.name}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="contents">Contents</label>
              <textarea
                id="contents"
                className="form-control"
                value={this.props.contents}
                rows={15}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const deck = selectors.getDeck(state, ownProps.match.params.id);

  return {
    contents: deck.get('contents'),
    name: deck.get('name'),
  };
};

export default connect(mapStateToProps, actions)(ShowDeck);


