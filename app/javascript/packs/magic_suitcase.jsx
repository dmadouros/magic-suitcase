import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import App from '../src/App'
import store from '../src/store'

const Hello = class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

Hello.defaultProps = {
  name: 'David',
}

Hello.propTypes = {
  name: PropTypes.string,
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
});
