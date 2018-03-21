"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var Types_1 = require("../Types");
function clone(source, depth) {
    if (depth === void 0) { depth = 0; }
    if (depth < 0)
        return source;
    // return primitives as is.
    if (!Types_1.Type.isObject(source))
        return source;
    var result;
    if (Array.isArray(source)) {
        result = source.slice();
        if (depth > 0) {
            for (var i = 0; i < result.length; i++) {
                result[i] = clone(result[i], depth - 1);
            }
        }
    }
    else {
        result = {};
        if (depth > 0)
            for (var k in source) {
                //noinspection JSUnfilteredForInLoop
                result[k] = clone(source[k], depth - 1);
            }
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clone;