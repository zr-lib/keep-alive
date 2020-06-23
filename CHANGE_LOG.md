# keep-alive-comp

## v0.1.2
- optimize: only cache state/scrollTop, will not cache children；只缓存 state/scrollTop，不缓存子组件
- feat: configKeepAlive
- feat: optional "useStorage" param("sessionStorage"/"localStorage"): maintain cache after refresh("beforeRouteLeave" has been called)；可选 "useStorage" 参数（"sessionStorage"/"localStorage"），可以刷新页面后，保持缓存（已调用"beforeRouteLeave"）
