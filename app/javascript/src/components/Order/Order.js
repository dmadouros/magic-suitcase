import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from "../../actions";
import * as selectors from 'src/reducer';
import Title from "../Title/Title";

class Order extends Component {
  render() {
    return (
      <div>
        <Title>Order/Picklist</Title>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="picklist">Order</label>
            <textarea
              id="order"
              className="form-control"
              value={this.props.order}
              rows={15}
              readOnly
            />
          </div>
        </div>
          <div className="form-group row">
            <div className="col">
              <label htmlFor="picklist">Picklist</label>
              <textarea
                id="picklist"
                className="form-control"
                value={this.props.picklist}
                rows={15}
                readOnly
              />
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.cards.get('order'),
    picklist: state.cards.get('picklist'),
  };
};

export default connect(mapStateToProps, actions)(Order);
