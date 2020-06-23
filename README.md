# React Component keep-alive

English | [中文](./README_zh.md)


## dependencies
React: 16.8.0+


## Install

```
npm i keep-alive-comp
```


## Usage
optional "useStorage" param("sessionStorage"/"localStorage"): maintain cache after refresh("beforeRouteLeave" has been called)

```jsx
// example\index.tsx
import configKeepAlive from 'keep-alive-comp';

// optional
configKeepAlive({ maxLength: 2, useStorage: 'sessionStorage' });
```

```jsx
// example\Router.tsx
import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
```


## KeepAliveAssist 

```jsx
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number | null;
  stateRestore?: () => any;
  deleteCache?: () => void;
  getKeepAlive?: () => void;
}
```


## component example

[list](./example/pages/list.tsx)
