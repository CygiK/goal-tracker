import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
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
import Subheader from 'material-ui/Subheader'

import { addGoal, logOut, removeGoal, updateGoal } from '../action-creators'
import AddSettingDialog from '../components/AddSettingDialog'
import DeleteSettingDialog from '../components/DeleteSettingDialog'
import GoalSetting from '../components/GoalSetting'

const DEFAULT_STATE = { goal: {}, dialog: null }

class SettingsScreen extends Component {
  constructor (...args) {
    super(...args)
    this.state = DEFAULT_STATE
  }

  @autobind
  closeDialogs () {
    this.setState(DEFAULT_STATE)
  }

  componentWillReceiveProps ({ currentUser: { loginState } }) {
    if (loginState !== 'success') {
      history.push('/')
    }
  }

  @autobind
  deleteSelectedGoal () {
    this.props.removeGoal(this.state.goal.id)
    this.closeDialogs()
  }

  openGoalDeleter (goal) {
    this.setState({ goal, dialog: 'delete' })
  }

  render () {
    const { currentUser, goals, logOut } = this.props
    const logoutButton = (
      <IconButton onClick={logOut}>
        <Logout />
      </IconButton>
    )

    return (
      <DocumentTitle title='Mes paramètres'>
        <div>
          <FlatButton label='Retour'
            icon={<ArrowBack />} containerElement={<Link to='/' />}
          />
          <Card className='settings'>
            <CardTitle title='Paramètres' />
            <CardText>
              <List>
                <ListItem
                  primaryText='Vous êtes connecté-e en tant que'
                  secondaryText={(currentUser || {}).email}
                  rightIconButton={logoutButton}
                />
              </List>
              <Divider />
              <List>
                <Subheader>Mes objectifs</Subheader>
                {goals.map((goal) =>
                  <GoalSetting key={goal.id} goal={goal}
                    onDeleteClick={() => this.openGoalDeleter(goal)}
                  />
                )}
                {goals.length === 0 && (
                  <ListItem secondaryText='Aucun objectif pour le moment' />
                )}
              </List>
            </CardText>
            <CardActions>
              <RaisedButton label='Ajouter un objectif' primary
                icon={<ContentAdd />}
              />
            </CardActions>
          </Card>
          <DeleteSettingDialog
            goal={this.state.goal}
            open={this.state.dialog === 'delete'}
            onCancel={this.closeDialogs}
            onDelete={this.deleteSelectedGoal}
          />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ goals, currentUser }) => ({ goals, currentUser })

export default connect(
  mapStateToProps,
  { addGoal, logOut, removeGoal, updateGoal }
)(SettingsScreen)