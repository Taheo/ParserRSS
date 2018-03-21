define(["require","exports","../../Disposable/dispose","../../Types","./ArrayEnumerator","./IndexEnumerator","./UnsupportedEnumerableException","./InfiniteEnumerator","./EmptyEnumerator","./IteratorEnumerator"],function(e,r,n,t,i,u,o,a,f,s){"use strict";function p(e){if(e)throw new o.UnsupportedEnumerableException(b);return!0}function c(e,r){if(void 0===r&&(r=1/0),t.Type.isArrayLike(e)){var n=Math.min(e.length,r);if(isFinite(n)){if(n>65535)return new Array(n);var i=[];return i.length=n,i}}return[]}function m(e){if(!e)return f.EmptyEnumerator;if(e instanceof Array)return new i.ArrayEnumerator(e);if(t.Type.isArrayLike(e))return new u.IndexEnumerator(function(){return{source:e,length:e.length,pointer:0,step:1}});if(!t.Type.isPrimitive(e)){if(E(e))return e.getEnumerator();if(t.Type.isFunction(e))return new a.InfiniteEnumerator(e);if(l(e))return e;if(d(e))return new s.IteratorEnumerator(e)}throw new o.UnsupportedEnumerableException}function E(e){return t.Type.hasMemberOfType(e,"getEnumerator",t.Type.FUNCTION)}function y(e){return t.Type.isArrayLike(e)||E(e)}function l(e){return t.Type.hasMemberOfType(e,"moveNext",t.Type.FUNCTION)}function d(e){return t.Type.hasMemberOfType(e,"next",t.Type.FUNCTION)}function h(e,r,i){if(void 0===i&&(i=1/0),e===w)return 0;if(e&&i>0){if(t.Type.isArrayLike(e)){p(!isFinite(i)&&!isFinite(e.length));for(var u=0;u<Math.min(e.length,i)&&r(e[u],u)!==!1;u++);return u}if(l(e)){p(!isFinite(i)&&e.isEndless);for(var u=0;i>u&&e.moveNext()&&r(e.current,u++)!==!1;);return u}if(E(e))return p(!isFinite(i)&&e.isEndless),n.using(e.getEnumerator(),function(e){return h(e,r,i)});if(d(e)){p(!isFinite(i));for(var u=0,o=void 0;i>u&&!(o=e.next()).done&&r(o.value,u++)!==!1;);return u}}return-1}function T(e,r){if(void 0===r&&(r=1/0),e===w)return[];if(!isFinite(r)&&e instanceof Array)return e.slice();var n=c(e,r);if(-1===h(e,function(e,r){n[r]=e},r))throw new o.UnsupportedEnumerableException;return n}function v(e,r,n){if(void 0===n&&(n=1/0),e===w)return[];if(!isFinite(n)&&e instanceof Array)return e.map(r);var t=c(e,n);if(-1===h(e,function(e,n){t[n]=r(e,n)},n))throw new o.UnsupportedEnumerableException;return t}Object.defineProperty(r,"__esModule",{value:!0});var w="",b="Cannot call forEach on an endless enumerable. Would result in an infinite loop that could hang the current process.";r.throwIfEndless=p,r.from=m,r.isEnumerable=E,r.isEnumerableOrArrayLike=y,r.isEnumerator=l,r.isIterator=d,r.forEach=h,r.toArray=T,r.map=v});
//# sourceMappingURL=Enumerator.js.map