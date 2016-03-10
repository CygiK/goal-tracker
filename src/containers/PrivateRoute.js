// Enrobeur de route authentifiée
// ==============================
//
// Permet de définir des routes exigeant que l’utilisateur soit logué.
// En pratique, définit une route classique amenant sur un HOC connecté
// au *store* Redux et vérifiant l’état de l’authentification.  Si
// l’utilisateur est connecté, on *render* le composant normalement, sinon
// on utilise un `<Redirect />` pour ramener à l’écran de connexion.

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <PrivateComponent component={component} {...props} />}
  />
)

class PrivateInnerComponent extends Component {
  render () {
    // `loggedIn` est injecté par le connecteur Redux (`mapStateToProps`)
    const { component, loggedIn, ...props } = this.props
    // Si on résulte d’une nav interactive une fois l’appli rendue côté client,
    // `history.action` vaut `PUSH` : une interdiction devrait donc faire l’objet
    // d’un ajout d’URL dans l’historique (vers le login), et non un remplacement
    // de l’URL précédente.  En revanche, lors d’un rendu initial sur navigation
    // classique du browser, `history.action` sera autre (normalement `POP`), et
    // de fait, on devrait éviter une étape d’historique intermédiaire.
    const shouldPush = props.history.action === 'PUSH'

    if (loggedIn) {
      return React.createElement(component, props)
    }

    return <Redirect push={shouldPush} to={{ pathname: '/', state: { from: props.location } }} />
  }
}

const mapStateToProps = ({ currentUser: { loginState } }) => ({ loggedIn: loginState === 'success' })
const PrivateComponent = connect(mapStateToProps)(PrivateInnerComponent)

export default PrivateRoute
