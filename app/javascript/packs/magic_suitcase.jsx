import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCopy } from '@fortawesome/free-solid-svg-icons'

import App from '../src/App'
import store from '../src/store'

library.add(faSearch);
library.add(faCopy);

const MagicSuitcase = class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MagicSuitcase />,
    document.body.appendChild(document.createElement('div')),
  )
});
