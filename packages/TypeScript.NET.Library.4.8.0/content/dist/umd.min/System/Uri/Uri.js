!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../Types","./Scheme","./QueryParams","../Text/Utility","../Exceptions/ArgumentException","../Exceptions/ArgumentOutOfRangeException"],t)}(function(t,e){"use strict";function r(t,e){var r,n=0;for(e||(e={});r=x[n++];){var i=t[r];i&&(e[r]=i)}return e}function n(t){var e=t;if(h.Type.isString(e)){if(!e)return null;if(e=m.trim(e).toLowerCase().replace(/[^a-z0-9+.-]+$/g,E),!e)return null;if(c.Scheme.isValid(e))return e}else if(null==e)return e;throw new y.ArgumentOutOfRangeException("scheme",t,"Invalid scheme.")}function i(t){if(0===t)return t;if(!t)return null;var e;if(h.Type.isNumber(t)){if(e=t,e>=0&&isFinite(e))return e}else if(h.Type.isString(t)&&(e=parseInt(t))&&!isNaN(e))return i(e);throw new g.ArgumentException("port","invalid value")}function u(t){if(!t.host){if(t.userInfo)throw new g.ArgumentException("host","Cannot include user info when there is no host.");if(h.Type.isNumber(t.port,!0))throw new g.ArgumentException("host","Cannot include a port when there is no host.")}var e=t.host||E;return e&&(t.userInfo&&(e=t.userInfo+q+e),isNaN(t.port)||(e+=":"+t.port),e=w+e),e}function o(t){return t&&(0!==t.indexOf(O)?O:E)+t}function s(t){return t&&(0!==t.indexOf(A)?A:E)+t}function f(t){var e=t.path,r=t.query;return E+(e||E)+(o(r)||E)}function a(t){var e=n(t.scheme),r=u(t),i=f(t),o=s(t.fragment),a=E+(e&&e+":"||E)+(r||E),p=E+(i||E)+(o||E);if(a&&p&&e&&!r)throw new g.ArgumentException("authority","Cannot format schemed Uri with missing authority.");return a&&i&&0!==i.indexOf(v)&&(p=v+p),a+p}function p(t,e){if(!t)return new g.ArgumentException("url","Nothing to parse.");var i,u={};if(i=t.indexOf(A),i!=-1&&(u.fragment=t.substring(i+1)||d,t=t.substring(0,i)),i=t.indexOf(O),i!=-1&&(u.query=t.substring(i+1)||d,t=t.substring(0,i)),i=t.indexOf(w),i!=-1){var o=m.trim(t.substring(0,i)),s=/:$/;if(!s.test(o))return new g.ArgumentException("url","Scheme was improperly formatted");o=m.trim(o.replace(s,E));try{u.scheme=n(o)||d}catch(f){return f}t=t.substring(i+2)}if(i=t.indexOf(v),i!=-1&&(u.path=t.substring(i),t=t.substring(0,i)),i=t.indexOf(q),i!=-1&&(u.userInfo=t.substring(0,i)||d,t=t.substring(i+1)),i=t.indexOf(":"),i!=-1){var a=parseInt(m.trim(t.substring(i+1)));if(isNaN(a))return new g.ArgumentException("url","Port was invalid.");u.port=a,t=t.substring(0,i)}return t=m.trim(t),t&&(u.host=t),e(r(u)),null}Object.defineProperty(e,"__esModule",{value:!0});/*!
     * @author electricessence / https://github.com/electricessence/
     * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
     * Based on: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
     */
var h=t("../Types"),c=t("./Scheme"),l=t("./QueryParams"),m=t("../Text/Utility"),g=t("../Exceptions/ArgumentException"),y=t("../Exceptions/ArgumentOutOfRangeException"),d=void 0,b=function(){function t(t,e,r,u,f,a,p){var c=this;this.scheme=n(t)||null,this.userInfo=e||null,this.host=r||null,this.port=i(u),this.authority=c.getAuthority()||null,this.path=f||null,h.Type.isString(a)||(a=l.encode(a)),this.query=o(a)||null,Object.freeze(this.queryParams=c.query?l.parseToMap(c.query):{}),this.pathAndQuery=c.getPathAndQuery()||null,this.fragment=s(p)||null,this.absoluteUri=c.getAbsoluteUri(),this.baseUri=c.absoluteUri.replace(/[?#].*/,""),Object.freeze(this)}return t.prototype.equals=function(e){return this===e||this.absoluteUri==t.toString(e)},t.from=function(e,r){var n=h.Type.isString(e)?t.parse(e):e;return new t(n&&n.scheme||r&&r.scheme,n&&n.userInfo||r&&r.userInfo,n&&n.host||r&&r.host,n&&h.Type.isNumber(n.port,!0)?n.port:r&&r.port,n&&n.path||r&&r.path,n&&n.query||r&&r.query,n&&n.fragment||r&&r.fragment)},t.parse=function(t,e){void 0===e&&(e=!0);var r=null,n=p(t,function(t){r=t});if(e&&n)throw n;return r},t.tryParse=function(t,e){return!p(t,e)},t.copyOf=function(t){return r(t)},t.prototype.copyTo=function(t){return r(this,t)},t.prototype.updateQuery=function(e){var r=this.toMap();return r.query=e,t.from(r)},t.prototype.getAbsoluteUri=function(){return a(this)},t.prototype.getAuthority=function(){return u(this)},t.prototype.getPathAndQuery=function(){return f(this)},Object.defineProperty(t.prototype,"pathSegments",{get:function(){return this.path&&this.path.match(/^[\/]|[^\/]*[\/]|[^\/]+$/g)||[]},enumerable:!0,configurable:!0}),t.prototype.toMap=function(){return this.copyTo({})},t.prototype.toString=function(){return this.absoluteUri},t.toString=function(e){return e instanceof t?e.absoluteUri:a(e)},t.getAuthority=function(t){return u(t)},t}();e.Uri=b;var x;!function(t){t[t.scheme=0]="scheme",t[t.userInfo=1]="userInfo",t[t.host=2]="host",t[t.port=3]="port",t[t.path=4]="path",t[t.query=5]="query",t[t.fragment=6]="fragment"}(x=e.Fields||(e.Fields={})),Object.freeze(x);var v="/",w="//",O=l.Separator.Query,A="#",E="",q="@";e["default"]=b});
//# sourceMappingURL=Uri.js.map