# React Component keep-alive

English | [中文](./README_zh.md)


## dependencies
React: 16.8.0+


## Usage

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


## componet example

[list](./example/pages/list.tsx)
