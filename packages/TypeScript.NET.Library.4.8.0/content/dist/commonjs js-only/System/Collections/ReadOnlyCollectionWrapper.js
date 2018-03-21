/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
"use strict";
var ArgumentNullException_1 = require("../Exceptions/ArgumentNullException");
var ReadOnlyCollectionBase_1 = require("./ReadOnlyCollectionBase");
var extends_1 = require("../../extends");
// noinspection JSUnusedLocalSymbols
var __extends = extends_1.default;
var ReadOnlyCollectionWrapper = (function (_super) {
    __extends(ReadOnlyCollectionWrapper, _super);
    function ReadOnlyCollectionWrapper(c) {
        _super.call(this);
        if (!c)
            throw new ArgumentNullException_1.ArgumentNullException('collection');
        var _ = this;
        _._getCount = function () { return c.count; };
        _.getEnumerator = function () { return c.getEnumerator(); };
    }
    return ReadOnlyCollectionWrapper;
}(ReadOnlyCollectionBase_1.ReadOnlyCollectionBase));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReadOnlyCollectionWrapper;