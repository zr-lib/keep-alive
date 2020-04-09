# 组件 keep-alive

## 用法
```jsx
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
```

## 辅助函数
```jsx
// 辅助函数
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number;
  stateRestore?: () => any;
  deleteCache?: (key: string) => void;
}
```

## 组件使用
[list](./example/pages/list.tsx)
