import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClipboardJS from 'clipboard';
import ReactSpinner from 'react-spinjs-fix';

import * as actions from "../../actions";
import Title from "../Title/Title";

class Order extends Component {
  componentDidMount() {
    this.clipboard = new ClipboardJS('#copy-to-clipboard');
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderOrder() {
    if (this.props.order.trim() === '') {
      return null;
    }

    return (
      <div className="form-group row">
        <div className="col">
          <div className="btn-toolbar justify-content-between">
            <h2>
              <label htmlFor="order">Order</label>
            </h2>
            <div>
              <button
                id="copy-to-clipboard"
                className="btn btn-outline-secondary"
                data-clipboard-target="#order"
              >
                Copy to clipboard
              </button>
            </div>
          </div>
          <textarea
            id="order"
            className="form-control"
            value={this.props.order}
            rows={15}
            readOnly
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <ReactSpinner/>
    }

    return (
      <div>
        <Title>Order/Picklist</Title>
        {this.renderOrder()}
        <div className="form-group row">
          <div className="col">
            <h2>
              <label htmlFor="picklist">Picklist</label>
            </h2>
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
