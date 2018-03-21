System.register(["./TaskHandlerBase", "../../Exceptions/ArgumentNullException", "../../Lazy", "../../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TaskHandlerBase_1, ArgumentNullException_1, Lazy_1, extends_1, __extends, Task;
    return {
        setters: [
            function (TaskHandlerBase_1_1) {
                TaskHandlerBase_1 = TaskHandlerBase_1_1;
            },
            function (ArgumentNullException_1_1) {
                ArgumentNullException_1 = ArgumentNullException_1_1;
            },
            function (Lazy_1_1) {
                Lazy_1 = Lazy_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            /**
             * A simplified synchronous (but deferrable) version of Task<T>
             * Asynchronous operations should use Promise<T>.
             */
            Task = (function (_super) {
                __extends(Task, _super);
                function Task(valueFactory) {
                    var _this = _super.call(this) || this;
                    if (!valueFactory)
                        throw new ArgumentNullException_1.ArgumentNullException('valueFactory');
                    _this._result = new Lazy_1.Lazy(valueFactory, false);
                    return _this;
                }
                Task.prototype._onExecute = function () {
                    this._result.getValue();
                };
                Task.prototype.getResult = function () {
                    return this._result.value; // This will detect any potential recursion.
                };
                Task.prototype.getState = function () {
                    var r = this._result;
                    return r && {
                        status: this.getStatus(),
                        result: r.isValueCreated ? r.value : void 0,
                        error: r.error
                    };
                };
                Task.prototype.start = function (defer) {
                    if (this.getStatus() == 0 /* Created */) {
                        _super.prototype.start.call(this, defer);
                    }
                };
                Task.prototype.runSynchronously = function () {
                    if (this.getStatus() == 0 /* Created */) {
                        _super.prototype.runSynchronously.call(this);
                    }
                };
                Object.defineProperty(Task.prototype, "state", {
                    get: function () {
                        return this.getState();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Task.prototype, "result", {
                    get: function () {
                        this.throwIfDisposed();
                        this.runSynchronously();
                        return this.getResult();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Task.prototype, "error", {
                    get: function () {
                        this.throwIfDisposed();
                        return this._result.error;
                    },
                    enumerable: true,
                    configurable: true
                });
                Task.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    var r = this._result;
                    if (r) {
                        this._result = null;
                        r.dispose();
                    }
                };
                return Task;
            }(TaskHandlerBase_1.TaskHandlerBase));
            exports_1("Task", Task);
            exports_1("default", Task);
        }
    };
});
//# sourceMappingURL=Task.js.map