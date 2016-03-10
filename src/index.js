// Point d’entrée de l’application
// ===============================

// Imports de modules tiers
// ------------------------

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { install as installOfflineHandling } from 'offline-plugin/runtime'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Assure que les composants
// [Material UI](http://www.material-ui.com/)
// basés “touch” (événements
// `onTouchTap`, du genre de `<IconMenu/>`, répondront aussi aux clics)
// (cette dépendance disparaîtra avec Material UI 0.16).
injectTapEventPlugin()

// Installe la gestion offline par
// [ServiceWorker](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers) ou
// [ApplicationCache](https://developer.mozilla.org/fr/docs/Utiliser_Application_Cache).
// En pratique, examine les technologies prises en charge par le
// navigateur courant et, suivant le cas, enregistre le ServiceWorker
// généré ou incruste un `iframe` chargeant la page vide qui référence
// le manifeste ApplicationCache.
installOfflineHandling()

// Imports de modules à nous
// -------------------------

import HistoryScreen from './containers/HistoryScreen'
import HomeScreen from './containers/HomeScreen'
import PrivateRoute from './containers/PrivateRoute'
import SettingsScreen from './containers/SettingsScreen'
import store from './store'

// Initialise la gestion périodique de l’historisation/réinitialisation
import './lib/clock'

// Rendu principal
// ---------------

render(
  // On enrobe le tout par le
  // [`Provider`](http://redux.js.org/docs/basics/UsageWithReact.html#passing-the-store)
  // de Redux, pour que l’état
  // central et sa méthode `dispatch` puissent être accessibles à travers
  // toute l’arborescence de rendu.
  //
  // Ensuite on décrit les routes (imbriquées) de l’application, avec leurs
  // composants associés.  L’implémentation d’historique fournie explicitement
  // permet d’utiliser un historique basé `pushState` plutôt que celui, par
  // défaut, basé hash (parties `#…` des URLs).  Cela suppose toutefois une
  // capacité du serveur à retourner notre appli client correctement
  // configurée pour toutes ces “URLs profondes”.
  //
  // Les autres routes de l’application étant situées “en dessous” de la route
  // principale (`/`), il faut indiquer quel contenu afficher pour cette route
  // racine (puisqu’il y en a un).  C’est le rôle de `IndexRoute`, qui revient
  // à dire “la route parent, sans rien derrière”.
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
  // Le deuxième argument passé à `ReactDOM.render(…)` est l’élément du DOM dans
  // lequel injecter l’appli.  On évite absolument d’injecter directement dans
  // la racine de `body`, car ça viendrait interférer avec plein de mécanismes
  // qui ont besoin d'y injecter des choses (ex. `iframe` du
  // [Offline-Plugin](https://github.com/NekR/offline-plugin),
  // `script`s du
  // [*Hot Module Replacement*](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)…).
  // Par convention, on y a toujours placé un `<div id="root"></div>`.
  document.getElementById('root')
)

// Lorsque le module est chargé par
// [Webpack](http://webpack.github.io/docs/)
// avec le *Hot Module Replacement*,
// l’objet prédéfini `module` se voit doter d'une propriété `hot`, qui nous
// permet de le détecter.  On peut alors indiquer que le module courant est
// apte à être remplacé à la volée (le HMR est "opt-in" : si un module change
// alors que ni lui, ni aucun module plus haut dans chaîne de `require`/`import`,
// n’a signifié son acceptation, alors le HMR n’a pas lieu).
if (module.hot) {
  module.hot.accept()
}
