import autobind from 'autobind-decorator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Logout from 'material-ui/svg-icons/action/exit-to-app'
import RaisedButton from 'material-ui/RaisedButton'

import { addGoal, logOut, removeGoal, updateGoal } from '../action-creators'

class SettingsScreen extends Component {
  render () {
    return (
      <h1>Settings coming soon</h1>
    )
  }
}

const mapStateToProps = ({ goals, currentUser }) => ({ goals, currentUser })

export default connect(
  mapStateToProps,
  { addGoal, logOut, removeGoal, updateGoal }
)(SettingsScreen)
