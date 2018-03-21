define(["require","exports","./SubscribableBase","../../extends"],function(e,r,o,t){"use strict";function n(e,r){if(e){for(var o=null,t=0,n=e;t<n.length;t++){var s=n[t];try{r(s)}catch(i){o=o||[],o.push({observer:s,ex:i})}}if(e.length=0,o&&o.length){if(!console||!console.error)throw{message:u,errors:o};console.error(u,o)}}}Object.defineProperty(r,"__esModule",{value:!0});var s=t["default"],i=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return s(r,e),r.prototype._onNext=function(e){n(this._getSubscribers(),function(r){r.onNext&&r.onNext(e)})},r.prototype._onError=function(e){n(this._getSubscribers(),function(r){r.onError&&r.onError(e)})},r.prototype._onCompleted=function(){n(this._unsubscribeAll(!0),function(e){e.onCompleted&&e.onCompleted()})},r.prototype.subscribe=function(r,o,t){var n,s="function"==typeof r;if(o||t||s){if(r&&!s)throw"Invalid subscriber type.";n={onNext:r,onError:o,onCompleted:t}}else n=r;return e.prototype.subscribe.call(this,n)},r}(o.SubscribableBase);r.ObservableBase=i;var u="One or more observers had errors when attempting to pass information.";r["default"]=i});
//# sourceMappingURL=ObservableBase.js.map