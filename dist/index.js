/*!
 * keep-alive
 * version: 0.1.4
 * build: 2020-07-07 16:12:51
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.KeepAlive=t(require("react")):e.KeepAlive=t(e.React)}(window,(function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p=".",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t),r.d(t,"configKeepAlive",(function(){return l}));var n=r(0);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u="__keep_alive_cache__",a={store:window,maxLength:5,useStorage:void 0},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=function(){var t,r=a=c(c({},a),e),n=r.store,o=r.maxLength,i=r.useStorage;n[u]={maxLength:o,useStorage:i,cacheList:(null===(t=n[u])||void 0===t?void 0:t.cacheList)||[]}};return t(),c({cacheName:u},a)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var v=function(){var e=l(),t=e.cacheName,r=e.maxLength,o=e.store,c=e.useStorage,i='useStorage只能为："sessionStorage","localStorage"';Object(n.useEffect)((function(){c?a():u()}),[]);var u=function(){var e,r;null===(e=o.sessionStorage)||void 0===e||e.removeItem(t),null===(r=o.localStorage)||void 0===r||r.removeItem(t)},a=function(){var e=p();e&&(o[t]=e)},f=function(){return!1!==Boolean(c)&&"sessionStorage"!==c&&"localStorage"!==c},p=function(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{_store:o,_cacheName:t},n=r._store,a=r._cacheName;if(f())return console.warn(i);var l="",s=null===(e=n[c])||void 0===e?void 0:e.getItem(a);if(s)try{l=JSON.parse(s)}catch(e){u(),console.error("从storage中恢复缓存出错，已删除storage缓存！",e)}return l},v=function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{_store:o,_cacheName:t},u=n._store,a=n._cacheName;if(f())return console.warn(i);null===(e=u[c])||void 0===e||e.setItem(a,JSON.stringify(s(s({},u[a]),{},{maxLength:r,useStorage:c})))},d=function(){return o[t].cacheList};return{getItem:function(e){return d().find((function(t){return t.name===e}))||null},updateCache:function(e){var t=e.name,n=e.scrollTop,o=e.state,i=d(),u=i.findIndex((function(e){return e.name===t}));-1!==u?i.splice(u,1,{name:t,state:o,scrollTop:n}):i.unshift({name:t,state:o,scrollTop:n}),i.length>r&&i.pop(),c&&v()},deleteCache:function(e){var t=d(),r=t.findIndex((function(t){return t.name===e}));-1!==r&&(t.splice(r,1),c&&v())},getStorageCache:p}},d=function(e){var t=e.name,r=e.children,o="function"==typeof r,c=v(),i=c.getItem,u=c.updateCache,a=c.deleteCache;Object(n.useEffect)((function(){o||console.warn('children传递函数，如:\n <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>')}),[]);return o?r({beforeRouteLeave:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1?arguments[1]:void 0;u({name:t,state:r,scrollTop:e})},scrollRestore:function(){var e=i(t);return(null==e?void 0:e.scrollTop)||null},stateRestore:function(){var e=i(t);return(null==e?void 0:e.state)||null},deleteCache:function(){return a(t)},getKeepAlive:function(){return i(t)}}):null};t.default=d}])}));