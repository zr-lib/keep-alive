import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from '@loadable/component';
import KeepAlive from 'keep-alive-comp';
// import List from './pages/list';
import Detail from './pages/detail';
import Detail2 from './pages/detail2';
import './styles.css';

const List = Loadable(() => import('./pages/list'));

export default function App() {
  return (
    <div className="App">
      <h1>keep-alive example</h1>

      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => KeepAlive({ key: 'list', Component: List })}
          />
          <Route
            exact
            path="/detail/:id"
            component={() => KeepAlive({ key: 'detail', Component: Detail })}
          />
          <Route exact path="/detail2/:id" component={Detail2} />
        </Switch>
      </Router>
    </div>
  );
}
