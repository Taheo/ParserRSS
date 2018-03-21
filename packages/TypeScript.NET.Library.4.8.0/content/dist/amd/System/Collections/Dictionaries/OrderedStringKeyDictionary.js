define(["require","exports","./StringKeyDictionary","../../Exceptions/ArgumentOutOfRangeException","../Array/Utility","../../../extends","../../Integer"],function(e,t,r,n,o,i,u){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i["default"],s=void 0,d=function(e){function t(){var t=e.call(this)||this;return t._order=[],t}return a(t,e),t.prototype.indexOfKey=function(e){var t=this._order;return t.length?t.indexOf(e,0):-1},t.prototype.getValueByIndex=function(e){u.Integer.assertZeroOrGreater(e);var t=this._order;if(e<t.length)return this.getAssuredValue(t[e]);throw new n.ArgumentOutOfRangeException("index",e)},t.prototype.setValue=function(t,r,n){var i=this,u=i.indexOfKey(t)!=-1;return u||r===s&&!n?u&&r===s&&!n&&o.remove(i._order,t):i._order.push(t),e.prototype.setValue.call(this,t,r)},t.prototype.setByIndex=function(e,t){var r=this,o=r._order;if(e<0)throw new n.ArgumentOutOfRangeException("index",e,"Is less than zero.");if(e>=o.length)throw new n.ArgumentOutOfRangeException("index",e,"Is greater than the count.");return r.setValue(o[e],t)},t.prototype.importValues=function(e){var t=this;return t.handleUpdate(function(){for(var r=!1,n=0;n<e.length;n++)t.setByIndex(n,e[n])&&(r=!0);return r})},t.prototype.setValues=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this.importValues(e)},t.prototype.removeByIndex=function(e){return this.setByIndex(e,s)},t.prototype.getKeys=function(){var e=this,t=e._order;return t.length&&t.filter(function(t){return e.containsKey(t)})||[]},t}(r.StringKeyDictionary);t.OrderedStringKeyDictionary=d,t["default"]=d});
//# sourceMappingURL=OrderedStringKeyDictionary.js.map