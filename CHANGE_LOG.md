# keep-alive-comp


## v0.1.2
- optimize: Only cache `state`/`scrollTop`, will not cache children；只缓存 `state`/`scrollTop`，不缓存子组件
- feat: `configKeepAlive`
- feat: Optional `useStorage` parameter ("sessionStorage"/"localStorage"), you can refresh the page and keep the cache (`beforeRouteLeave` has been called)；可选 `useStorage` 参数（"sessionStorage"/"localStorage"），可以刷新页面后，保持缓存（已调用`beforeRouteLeave`）


## v0.1.3
- fix: getKeepAlive types