!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../../Compare","./DictionaryBase","../../../extends"],t)}(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});/*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
var n=t("../../Compare"),r=t("./DictionaryBase"),o=t("../../../extends"),i=o["default"],u=void 0,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._count=0,e._map={},e}return i(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._map=null},e.prototype._getEntry=function(t){return this.containsKey(t)?{key:t,value:this.getAssuredValue(t)}:null},e.prototype.containsKey=function(t){return null!=t&&0!=this._count&&this._map[t]!==u},e.prototype.containsValue=function(t){if(!this._count)return!1;var e=this._map;for(var r in e)if(e.hasOwnProperty(r)&&n.areEqual(e[r],t))return!0;return!1},e.prototype.getValue=function(t){return null!=t&&this._count?this._map[t]:u},e.prototype._setValueInternal=function(t,e){var n=this,r=n._map,o=r[t];return o!==e&&(e===u?t in r&&(delete r[t],n._count--):(r.hasOwnProperty(t)||n._count++,r[t]=e),!0)},e.prototype.importMap=function(t){var e=this;return e.handleUpdate(function(){var n=!1;for(var r in t)t.hasOwnProperty(r)&&e.setValue(r,t[r])&&(n=!0);return n})},e.prototype.toMap=function(t){var e=this,n={};if(e._count)for(var r in e._map)if(e._map.hasOwnProperty(r)){var o=e._map[r];t&&(o=t(r,o)),o!==u&&(n[r]=o)}return n},e.prototype.getKeys=function(){return Object.keys(this._map)},e.prototype.getValues=function(){if(!this._count)return[];for(var t=Object.keys(this._map),e=0,n=t.length;e<n;e++)t[e]=this._map[t[e]];return t},e.prototype.getCount=function(){return this._count},e}(r.DictionaryBase);e.StringKeyDictionary=a,e["default"]=a});
//# sourceMappingURL=StringKeyDictionary.js.map