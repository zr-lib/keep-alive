import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { lazy } from '@loadable/component';
import KeepAlive from 'keep-alive-comp';

const List = lazy(() => import('./pages/list'));
const Detail = lazy(() => import('./pages/detail'));

const Router: React.FC = ({ children }) => (
  <HashRouter>
    {children}
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <Suspense fallback={<div>loading...</div>}>
            <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>
          </Suspense>
        )}
      />
      <Route
        exact
        path="/detail/:id"
        component={() => (
          <Suspense fallback={<div>loading...</div>}>
            <Detail />
          </Suspense>
        )}
      />
      <Route path="*" render={() => <h3>404</h3>} />
    </Switch>
  </HashRouter>
);

export default Router;
