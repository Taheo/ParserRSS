define(["require","exports","./SimpleEnumerableBase","../../../extends"],function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n["default"],i=function(e){function t(t){var r=e.call(this)||this;return r._factory=t,r}return o(t,e),t.prototype._canMoveNext=function(){return null!=this._factory},t.prototype.moveNext=function(){var e=this,t=e._factory;return!!t&&(e._current=t(e._current,e.incrementIndex()),!0)},t.prototype.dispose=function(){e.prototype.dispose.call(this),this._factory=null},t}(r.SimpleEnumerableBase);t.InfiniteEnumerator=i,t["default"]=i});
//# sourceMappingURL=InfiniteEnumerator.js.map