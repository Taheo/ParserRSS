!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports"],e)}(function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var NAME="Exception",Exception=function(){function Exception(message,innerException,beforeSealing){this.message=message;var _=this;this.name=_.getName(),this.data={},innerException&&(_.data.innerException=innerException),beforeSealing&&beforeSealing(_);try{var stack=eval("new Error()").stack;stack=stack&&stack.replace(/^Error\n/,"").replace(/(.|\n)+\s+at new.+/,"")||"",this.stack=_.toStringWithoutBrackets()+stack}catch(ex){}Object.freeze(_)}return Exception.prototype.getName=function(){return NAME},Exception.prototype.toString=function(){return"["+this.toStringWithoutBrackets()+"]"},Exception.prototype.toStringWithoutBrackets=function(){var e=this,t=e.message;return e.name+(t?": "+t:"")},Exception.prototype.dispose=function(){var e=this.data;for(var t in e)e.hasOwnProperty(t)&&delete e[t]},Exception}();exports.Exception=Exception,exports["default"]=Exception});
//# sourceMappingURL=Exception.js.map