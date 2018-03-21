!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../Exceptions/ArgumentNullException","./ReadOnlyCollectionBase","./Enumeration/Enumerator","../Types","../../extends"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});/*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
var n=e("../Exceptions/ArgumentNullException"),o=e("./ReadOnlyCollectionBase"),r=e("./Enumeration/Enumerator"),u=e("../Types"),i=e("../../extends"),s=i["default"],l=function(e){function t(t){var o=e.call(this)||this;if(!t)throw new n.ArgumentNullException("collection");var i=o;return u.Type.isArrayLike(t)?(i._getCount=function(){return t.length},i._getEnumerator=function(){return r.from(t)}):(i._getCount=function(){return t.count},i._getEnumerator=function(){return t.getEnumerator()}),o}return s(t,e),t.prototype._getCount=function(){return this.throwIfDisposed(),this.__getCount()},t.prototype._getEnumerator=function(){return this.throwIfDisposed(),this.__getEnumerator()},t.prototype._onDispose=function(){e.prototype._onDispose.call(this),this.__getCount=null,this.__getEnumerator=null},t}(o.ReadOnlyCollectionBase);t["default"]=l});
//# sourceMappingURL=ReadOnlyCollectionWrapper.js.map