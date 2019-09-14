import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConfiguratorPage from './ConfiguratorPage'
import SettingsTable from './SettingsTable'
class Routes extends React.Component {
  render() {
    return (

        <Switch>
          <Route path='/' exact component={SettingsTable} />
          <Route path="/configurator/:id" component={ConfiguratorPage} />

        </Switch>
     )
  }
}

export default Routes;