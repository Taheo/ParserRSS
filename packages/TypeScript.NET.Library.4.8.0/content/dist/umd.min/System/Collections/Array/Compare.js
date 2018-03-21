!function(e){if("object"==typeof module&&"object"==typeof module.exports){var r=e(require,exports);void 0!==r&&(module.exports=r)}else"function"==typeof define&&define.amd&&define(["require","exports","../../Compare","../../Types"],e)}(function(e,r){"use strict";function n(e,r){if(e&&r&&e===r||!e&&!r)return!0;if(!e||!r)return!1;var n=e.length;return n===r.length&&(0===n||n)}function t(e,r,n){if(void 0===r&&(r=!0),void 0===n&&(n=a.areEqual),!e)throw new Error("ArgumentNullException: 'arrays' cannot be null.");if(e.length<2)throw new Error("Cannot compare a set of arrays less than 2.");f.Type.isFunction(r)&&(n=r,r=!0);for(var t=e[0],i=1,u=e.length;i<u;i++)if(!o(t,e[i],r,n))return!1;return!0}function o(e,r,t,o){void 0===t&&(t=!0),void 0===o&&(o=a.areEqual);var i=n(e,r);if(f.Type.isBoolean(i))return i;f.Type.isFunction(t)&&(o=t,t=!0);for(var u=0;u<i;u++)if(!o(e[u],r[u],t))return!1;return!0}function i(e,r){if(!e||e.length<2)return e;var n,t=e.length;t>65536?n=new Array(t):(n=[],n.length=t);for(var o=0;o<t;o++)n[o]=e[o];return n.sort(r),n}function u(e,r,t){void 0===t&&(t=a.compare);var o=n(e,r);if(f.Type.isBoolean(o))return o;e=i(e,t),r=i(r,t);for(var u=0;u<o;u++)if(0!==t(e[u],r[u]))return!1;return!0}Object.defineProperty(r,"__esModule",{value:!0});/*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     */
var a=e("../../Compare"),f=e("../../Types");r.areAllEqual=t,r.areEqual=o,r.areEquivalent=u});
//# sourceMappingURL=Compare.js.map