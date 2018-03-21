!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../../Compare","../../Types","../Enumeration/EnumeratorBase","../LinkedNodeList","../../Disposable/ObjectPool","./getIdentifier","./DictionaryBase","../../../extends"],e)}(function(e,t){"use strict";function r(e){return n||(n=new a.ObjectPool(20,function(){return new s.LinkedNodeList},function(e){return e.clear()})),e?void n.add(e):n.take()}Object.defineProperty(t,"__esModule",{value:!0});/*!
     * @author electricessence / https://github.com/electricessence/
     * Original: http://linqjs.codeplex.com/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
var n,o=e("../../Compare"),i=e("../../Types"),u=e("../Enumeration/EnumeratorBase"),s=e("../LinkedNodeList"),a=e("../../Disposable/ObjectPool"),l=e("./getIdentifier"),f=e("./DictionaryBase"),c=e("../../../extends"),d=c["default"],p=void 0,y=function(){function e(e,t,r,n){this.key=e,this.value=t,this.previous=r,this.next=n}return e}(),v=function(e){function t(t){var n=e.call(this)||this;return n._keyGenerator=t,n._entries=r(),n._buckets={},n}return d(t,e),t.prototype._onDispose=function(){e.prototype._onDispose.call(this);var t=this;t._entries=null,t._buckets=null,t._hashGenerator=null},t.prototype.getCount=function(){return this._entries&&this._entries.unsafeCount||0},t.prototype._getBucket=function(e,t){if(null==e||!t&&!this.getCount())return null;i.Type.isPrimitiveOrSymbol(e)||console.warn("Key type not indexable and could cause Dictionary to be extremely slow.");var n=this._buckets,o=n[e];return t&&!o&&(n[e]=o=r()),o||null},t.prototype._getBucketEntry=function(e,t,r){if(null==e||!this.getCount())return null;var n=this,o=n._keyGenerator,i=o?o(e):e;return r||(r=n._getBucket(t||l.getIdentifier(i))),r&&(o?r.find(function(e){return o(e.key)===i}):r.find(function(e){return e.key===i}))},t.prototype._getEntry=function(e){var t=this._getBucketEntry(e);return t&&t.value},t.prototype.getValue=function(e){var t=this._getEntry(e);return t?t.value:p},t.prototype._setValueInternal=function(e,t){var n=this,i=n._buckets,u=n._entries,s=n._keyGenerator?n._keyGenerator(e):e,a=l.getIdentifier(s),f=n._getBucket(a),c=f&&n._getBucketEntry(e,a,f);if(c){var d=f;if(t!==p){var v=c.value.value;return c.value.value=t,!o.areEqual(t,v)}var _=d.removeNode(c),h=u.removeNode(c.value);if(_&&!d.count&&(delete i[a],r(d),f=null),_!==h)throw"Entries and buckets are out of sync.";if(_)return!0}else if(t!==p){if(f||(f=n._getBucket(a,!0)),!f)throw new Error('"'+a+'" cannot be added to lookup table.');var k=new y(e,t);return u.addNode(k),f.addNode(new y(e,k)),!0}return!1},t.prototype._clearInternal=function(){var e=this,t=e._buckets;for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];delete t[n],r(o)}return e._entries.clear()},t.prototype.getEnumerator=function(){var e=this;e.throwIfDisposed();var t,r;return new u.EnumeratorBase(function(){e.throwIfDisposed(),t=e._version,r=e._entries.first},function(n){if(r){e.throwIfDisposed(),e.assertVersion(t);var o={key:r.key,value:r.value};return r=r.next||null,n.yieldReturn(o)}return n.yieldBreak()})},t.prototype.getKeys=function(){for(var e=this,t=[],r=e._entries&&e._entries.first;r;)t.push(r.key),r=r.next;return t},t.prototype.getValues=function(){for(var e=this,t=[],r=e._entries&&e._entries.first;r;)t.push(r.value),r=r.next;return t},t}(f["default"]);t.Dictionary=v,t["default"]=v});
//# sourceMappingURL=Dictionary.js.map