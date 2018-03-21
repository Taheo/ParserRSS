System.register(["../Exceptions/InvalidOperationException", "../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InvalidOperationException_1, extends_1, __extends, NAME, ObjectDisposedException;
    return {
        setters: [
            function (InvalidOperationException_1_1) {
                InvalidOperationException_1 = InvalidOperationException_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            NAME = 'ObjectDisposedException';
            ObjectDisposedException = (function (_super) {
                __extends(ObjectDisposedException, _super);
                // For simplicity and consistency, lets stick with 1 signature.
                function ObjectDisposedException(objectName, message, innerException) {
                    return _super.call(this, message || '', innerException, function (_) {
                        _.objectName = objectName;
                    }) || this;
                }
                ObjectDisposedException.prototype.getName = function () {
                    return NAME;
                };
                ObjectDisposedException.prototype.toString = function () {
                    var _ = this;
                    var oName = _.objectName;
                    oName = oName ? ('{' + oName + '} ') : '';
                    return '[' + _.name + ': ' + oName + _.message + ']';
                };
                ObjectDisposedException.throwIfDisposed = function (disposable, objectName, message) {
                    if (disposable.wasDisposed)
                        throw new ObjectDisposedException(objectName, message);
                    return true;
                };
                return ObjectDisposedException;
            }(InvalidOperationException_1.InvalidOperationException));
            exports_1("ObjectDisposedException", ObjectDisposedException);
            exports_1("default", ObjectDisposedException);
        }
    };
});
//# sourceMappingURL=ObjectDisposedException.js.map