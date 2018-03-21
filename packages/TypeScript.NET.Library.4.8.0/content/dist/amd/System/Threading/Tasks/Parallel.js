define(["require","exports","../../Promises/Promise","../../Types","../Worker","../deferImmediate","../../Environment","../../Disposable/ObjectPool","../../../extends"],function(e,r,n,t,o,i,s,u,a){"use strict";function c(e,r){r||(r={});for(var n=0,t=Object.keys(e);n<t.length;n++){var o=t[n];r[o]===d&&(r[o]=e[o])}return r}function l(e,r,n,t){r&&(e.onmessage=r),n&&(e.onerror=n),t!==d&&e.postMessage(t)}Object.defineProperty(r,"__esModule",{value:!0});var f,p=a["default"],h=16,d=void 0,y=typeof self!==t.Type.UNDEFINED?self.URL?self.URL:self.webkitURL:null,v=!(!s.isNodeJS&&!self.Worker),w={evalPath:s.isNodeJS?__dirname+"/eval.js":d,maxConcurrency:s.isNodeJS?e("os").cpus().length:navigator.hardwareConcurrency||4,allowSynchronous:!0,env:{},envNamespace:"env"},m=function(e){function r(r,n){return e.call(this,function(e,t){l(r,function(r){e(r.data)},function(e){t(e)},n)},!0)||this}return p(r,e),r}(n.Promise);!function(e){function r(e){var r=a[e];return r||(a[e]=r=new u.ObjectPool(8),r.autoClearTimeout=3e3),r}function n(e){if(e){e.onerror=null,e.onmessage=null;var n=e.__key;n?r(n).add(e):i.deferImmediate(function(){return e.terminate()})}return null}function t(e){return r(e).tryTake()}function s(e,r){var n=new o["default"](r);return n.__key=e,n.dispose||(n.dispose=function(){n.onmessage=null,n.onerror=null,n.dispose=null,n.terminate()}),n}var a={};e.recycle=n,e.tryGet=t,e.getNew=s}(f||(f={}));var g=function(){function e(e){this.options=c(w,e),this._requiredScripts=[],this._requiredFunctions=[],this.ensureClampedMaxConcurrency()}return e.maxConcurrency=function(r){return new e({maxConcurrency:r})},e.prototype._getWorkerSource=function(e,r){var n=this._requiredScripts,t=this._requiredFunctions,o="";!s.isNodeJS&&n.length&&(o+='importScripts("'+n.join('","')+'");\r\n');for(var i=0,u=t;i<u.length;i++){var a=u[i],c=a.name,l=a.fn,f=l.toString();o+=c?"var "+c+" = "+f+";":f}r=JSON.stringify(r||{});var p=this.options.envNamespace;return o+(s.isNodeJS?'process.on("message", function(e) {global.'+p+" = "+r+";process.send(JSON.stringify(("+e.toString()+")(JSON.parse(e).data)))})":"self.onmessage = function(e) {var global = {}; global."+p+" = "+r+";self.postMessage(("+e.toString()+")(e.data))}")},e.prototype.require=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return this.requireThese(e)},e.prototype.requireThese=function(e){for(var r=0,n=e;r<n.length;r++){var o=n[r];switch(typeof o){case t.Type.STRING:this._requiredScripts.push(o);break;case t.Type.FUNCTION:this._requiredFunctions.push({fn:o});break;case t.Type.OBJECT:this._requiredFunctions.push(o);break;default:throw new TypeError("Invalid type.")}}return this},e.prototype._spawnWorker=function(e,r){var n=this._getWorkerSource(e,r);if(o["default"]===d)return d;var t=f.tryGet(n);if(t)return t;var i=this._requiredScripts,u=this.options.evalPath;if(!u){if(s.isNodeJS)throw new Error("Can't use NodeJS without eval.js!");if(i.length)throw new Error("Can't use required scripts without eval.js!");if(!y)throw new Error("Can't create a blob URL in this browser!")}if(s.isNodeJS||i.length||!y)t=f.getNew(n,u),t.postMessage(n);else if(y){var a=new Blob([n],{type:"text/javascript"}),c=y.createObjectURL(a);t=f.getNew(n,c)}return t},e.prototype.startNew=function(e,r,n){var t=this,o=this.ensureClampedMaxConcurrency(),i=o?t._spawnWorker(r,c(t.options.env,n||{})):null;if(i)return new m(i,e).finallyThis(function(){return f.recycle(i)});if(t.options.allowSynchronous)return this.startLocal(e,r);throw new Error(o?"Workers do not exist and synchronous operation not allowed!":"'maxConcurrency' set to 0 but 'allowSynchronous' is false.")},e.prototype.startLocal=function(e,r){return new n.Promise(function(n,t){try{n(r(e))}catch(o){t(o)}})},e.prototype.pipe=function(e,r,t){var o;if(e&&e.length)for(var i,s=e.length,u=r.toString(),a=this.ensureClampedMaxConcurrency(),c=0,l=function(l){var h=a?p._spawnWorker(u,t):null;if(!h){if(!p.options.allowSynchronous)throw new Error(a?"Workers do not exist and synchronous operation not allowed!":"'maxConcurrency' set to 0 but 'allowSynchronous' is false.");return{value:n.Promise.map(e,r)}}o||(o=e.map(function(e){return new n.Promise}));var d=function(){if(i&&(h=f.recycle(h)),h)if(c<s){var r=c++,n=o[r],t=new m(h,e[r]);t.thenSynchronous(function(e){n.resolve(e),d()},function(e){i||(i=e,n.reject(e),h=f.recycle(h))}).finallyThis(function(){return t.dispose()})}else h=f.recycle(h)};d()},p=this,h=0;!i&&c<Math.min(s,a);h++){var d=l(h);if("object"==typeof d)return d.value}return new n.PromiseCollection(o)},e.prototype.ensureClampedMaxConcurrency=function(){var e=this.options.maxConcurrency;return e&&e>h&&(this.options.maxConcurrency=e=h,console.warn("More than "+h+" workers can reach worker limits and cause unexpected results.  maxConcurrency reduced to "+h+".")),e||0===e?e:h},e.prototype.map=function(e,r,t){var o=this;return e&&e.length?(e=e.slice(),new n.ArrayPromise(function(i,s){var u=[],a=e.length;u.length=a;for(var c,l=r.toString(),p=o.ensureClampedMaxConcurrency(),h=0,d=0,y=function(p){var y=o._spawnWorker(l,t);if(!y){if(!o.options.allowSynchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");return i(n.Promise.map(e,r).all()),{value:void 0}}var v=function(){if(c&&(y=f.recycle(y)),y)if(h<a){var r=h++,n=new m(y,e[r]);n.thenSynchronous(function(e){u[r]=e,v()},function(e){c||(c=e,s(e),y=f.recycle(y))}).thenThis(function(){if(d++,d>a)throw Error("Resolved count exceeds data length.");d===a&&i(u)}).finallyThis(function(){return n.dispose()})}else y=f.recycle(y)};v()},v=0;!c&&h<Math.min(a,p);v++){var w=y(v);if("object"==typeof w)return w.value}})):n.ArrayPromise.fulfilled(e&&[])},Object.defineProperty(e,"isSupported",{get:function(){return v},enumerable:!0,configurable:!0}),e.options=function(r){return new e(r)},e.require=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return(new e).requireThese(r)},e.requireThese=function(r){return(new e).requireThese(r)},e.startNew=function(r,n,t){return(new e).startNew(r,n,t)},e.map=function(r,n,t){return(new e).map(r,n,t)},e}();r.Parallel=g,r["default"]=g});
//# sourceMappingURL=Parallel.js.map