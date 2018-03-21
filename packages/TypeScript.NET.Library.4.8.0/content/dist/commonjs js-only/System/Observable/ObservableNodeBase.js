/*!
 * @author electricessence / https://github.com/electricessence/
 * Based upon .NET source.
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Source: http://referencesource.microsoft.com/#mscorlib/system/IObserver.cs
 */
"use strict";
// Can be used as a base class, mixin, or simply reference on how to implement the pattern.
var ObservableBase_1 = require("./ObservableBase");
var extends_1 = require("../../extends");
// noinspection JSUnusedLocalSymbols
var __extends = extends_1.default;
var ObservableNodeBase = (function (_super) {
    __extends(ObservableNodeBase, _super);
    function ObservableNodeBase() {
        _super.apply(this, arguments);
    }
    ObservableNodeBase.prototype.onNext = function (value) {
        this._onNext(value);
    };
    ObservableNodeBase.prototype.onError = function (error) {
        this._onError(error);
    };
    ObservableNodeBase.prototype.onCompleted = function () {
        this._onCompleted();
    };
    return ObservableNodeBase;
}(ObservableBase_1.default));
exports.ObservableNodeBase = ObservableNodeBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObservableNodeBase;