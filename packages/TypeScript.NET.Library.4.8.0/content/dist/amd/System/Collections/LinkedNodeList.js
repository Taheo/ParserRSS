define(["require","exports","../Text/Utility","../Exceptions/InvalidOperationException","../Exceptions/ArgumentException","../Exceptions/ArgumentNullException","./Enumeration/EnumeratorBase","../../extends"],function(t,e,n,r,o,i,s,u){"use strict";function l(t,e){if(void 0===e&&(e="node"),null==t)throw new i.ArgumentNullException(e);if(t.next||t.previous)throw new r.InvalidOperationException("Cannot add a node to a LinkedNodeList that is already linked.")}Object.defineProperty(e,"__esModule",{value:!0});var f=(u["default"],function(){function t(){this._first=null,this._last=null,this.unsafeCount=0,this._version=0}return t.prototype.assertVersion=function(t){if(t!==this._version)throw new r.InvalidOperationException("Collection was modified.");return!0},Object.defineProperty(t.prototype,"first",{get:function(){return this._first},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"last",{get:function(){return this._last},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"count",{get:function(){for(var t=this._first,e=0;t;)e++,t=t.next;return e},enumerable:!0,configurable:!0}),t.prototype.forEach=function(t,e){var n=this,r=null,o=n.first,i=n._version,s=0;do e||n.assertVersion(i),r=o,o=r&&r.next;while(r&&t(r,s++)!==!1);return s},t.prototype.map=function(t){if(!t)throw new i.ArgumentNullException("selector");var e=[];return this.forEach(function(n,r){e.push(t(n,r))}),e},t.prototype.clear=function(){var t,e=this,n=0,r=0;for(t=e._first,e._first=null;t;){n++;var o=t;t=t.next,o.next=null}for(t=e._last,e._last=null;t;){r++;var o=t;t=t.previous,o.previous=null}return n!==r&&console.warn("LinkedNodeList: Forward versus reverse count does not match when clearing. Forward: "+n+", Reverse: "+r),e._version++,e.unsafeCount=0,n},t.prototype.dispose=function(){this.clear()},t.prototype.contains=function(t){return this.indexOf(t)!=-1},t.prototype.getNodeAt=function(t){if(t<0)return null;for(var e=this._first,n=0;e&&n++<t;)e=e.next||null;return e},t.prototype.find=function(t){var e=null;return this.forEach(function(n,r){if(t(n,r))return e=n,!1}),e},t.prototype.indexOf=function(t){if(t&&(t.previous||t.next)){var e=0,n=void 0,r=this._first;do{if(n=r,n===t)return e;e++}while(r=n&&n.next)}return-1},t.prototype.removeFirst=function(){return!!this._first&&this.removeNode(this._first)},t.prototype.removeLast=function(){return!!this._last&&this.removeNode(this._last)},t.prototype.removeNode=function(t){if(null==t)throw new i.ArgumentNullException("node");var e=this,r=t.previous||null,s=t.next||null,u=!1,l=!1;if(r?r.next=s:e._first==t?e._first=s:u=!0,s?s.previous=r:e._last==t?e._last=r:l=!0,u!==l)throw new o.ArgumentException("node",n.format("Provided node is has no {0} reference but is not the {1} node!",u?"previous":"next",u?"first":"last"));var f=!u&&!l;return f&&(e._version++,e.unsafeCount--,t.previous=null,t.next=null),f},t.prototype.addNode=function(t){this.addNodeAfter(t)},t.prototype.addNodeBefore=function(t,e){void 0===e&&(e=null),l(t);var n=this;if(e||(e=n._first),e){var r=e.previous;t.previous=r,t.next=e,e.previous=t,r&&(r.next=t),e==n._first&&(n._first=t)}else n._first=n._last=t;n._version++,n.unsafeCount++},t.prototype.addNodeAfter=function(t,e){void 0===e&&(e=null),l(t);var n=this;if(e||(e=n._last),e){var r=e.next;t.next=r,t.previous=e,e.next=t,r&&(r.previous=t),e==n._last&&(n._last=t)}else n._first=n._last=t;n._version++,n.unsafeCount++},t.prototype.replace=function(t,e){if(null==t)throw new i.ArgumentNullException("node");if(t!=e){l(e,"replacement");var n=this;e.previous=t.previous,e.next=t.next,t.previous&&(t.previous.next=e),t.next&&(t.next.previous=e),t==n._first&&(n._first=e),t==n._last&&(n._last=e),n._version++}},t.valueEnumeratorFrom=function(t){if(!t)throw new i.ArgumentNullException("list");var e,n,r;return new s.EnumeratorBase(function(){e=null,n=t.first,r=t._version},function(o){return n?(t.assertVersion(r),e=n,n=e&&e.next,o.yieldReturn(e.value)):o.yieldBreak()})},t.copyValues=function(t,e,n){if(void 0===n&&(n=0),t&&t.first){if(!e)throw new i.ArgumentNullException("array");t.forEach(function(t,r){e[n+r]=t.value})}return e},t}());e.LinkedNodeList=f,e["default"]=f});
//# sourceMappingURL=LinkedNodeList.js.map