import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// DEV NOTE: only required until Material UI 0.16+, as it won't use
// `onTouchTap` unduly anymore.
injectTapEventPlugin()

import HistoryScreen from './containers/HistoryScreen'
import HomeScreen from './containers/HomeScreen'
import PrivateRoute from './containers/PrivateRoute'
import SettingsScreen from './containers/SettingsScreen'
import store from './store'

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <div>
          <Route exact path='/' component={HomeScreen} />
          <PrivateRoute exact path='/settings' component={SettingsScreen} />
          <PrivateRoute exact path='/history' component={HistoryScreen} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
