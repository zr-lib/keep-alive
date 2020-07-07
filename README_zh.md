# React 组件 keep-alive
[English](./README.md) | 中文


## 依赖
React: 16.8+


## 下载
```
npm i keep-alive-comp
```


## 用法
可选 `useStorage` 参数（"sessionStorage"/"localStorage"），可以在刷新页面后，保持缓存（已调用"beforeRouteLeave"）

> 如果使用 `useStorage`，组件需要与 `Suspense` 配合使用

```jsx
// example\index.tsx
import configKeepAlive from 'keep-alive-comp';

// 可以不写
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


## 辅助函数
```jsx
// 辅助函数
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number | null;
  stateRestore?: () => any;
  deleteCache?: () => void;
  getKeepAlive?: () => void;
}
```


## 组件使用
组件：[list](./example/pages/list.tsx)
