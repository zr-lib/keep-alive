# React 组件 keep-alive
中文 | [English](./README.md)

## 依赖
React: 16.8+

## 用法

```jsx
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

[list](./example/pages/list.tsx)
