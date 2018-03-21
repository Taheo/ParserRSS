/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../Environment"], function (require, exports) {
    "use strict";
    var Environment_1 = require("../Environment");
    exports.Worker = Environment_1.isNodeJS ? require('./NodeJSWorker').default : self.Worker;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports.Worker;
});
//# sourceMappingURL=Worker.js.map