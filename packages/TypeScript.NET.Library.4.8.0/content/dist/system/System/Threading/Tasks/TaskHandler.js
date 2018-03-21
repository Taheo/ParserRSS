System.register(["./TaskHandlerBase", "../../Exceptions/ArgumentNullException", "../../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TaskHandlerBase_1, ArgumentNullException_1, extends_1, __extends, TaskHandler;
    return {
        setters: [
            function (TaskHandlerBase_1_1) {
                TaskHandlerBase_1 = TaskHandlerBase_1_1;
            },
            function (ArgumentNullException_1_1) {
                ArgumentNullException_1 = ArgumentNullException_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            TaskHandler = (function (_super) {
                __extends(TaskHandler, _super);
                function TaskHandler(_action) {
                    var _this = _super.call(this) || this;
                    _this._action = _action;
                    if (!_action)
                        throw new ArgumentNullException_1.ArgumentNullException('action');
                    return _this;
                }
                TaskHandler.prototype._onExecute = function () {
                    this._action();
                };
                TaskHandler.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    this._action = null;
                };
                return TaskHandler;
            }(TaskHandlerBase_1.TaskHandlerBase));
            exports_1("TaskHandler", TaskHandler);
            exports_1("default", TaskHandler);
        }
    };
});
//# sourceMappingURL=TaskHandler.js.map