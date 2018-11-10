import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClipboardJS from 'clipboard';

import * as actions from "../../actions";
import Title from "../Title/Title";

class Order extends Component {
  componentDidMount() {
    this.clipboard = new ClipboardJS('#copy-to-clipboard');
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div>
        <Title>Order/Picklist</Title>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="order">Order</label>
            <textarea
              id="order"
              className="form-control"
              value={this.props.order}
              rows={15}
              readOnly
            />
          </div>
        </div>
        <button id="copy-to-clipboard" className="btn"
                data-clipboard-target="#order"
        >
          Cut to clipboard
        </button>
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
