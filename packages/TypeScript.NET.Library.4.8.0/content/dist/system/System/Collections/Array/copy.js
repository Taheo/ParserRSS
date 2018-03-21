System.register(["./initialize", "../../Exceptions/ArgumentNullException", "../../Exceptions/ArgumentOutOfRangeException"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     *
     * @param source
     * @param sourceIndex
     * @param length
     * @returns {any}
     */
    function copy(source, sourceIndex, length) {
        if (sourceIndex === void 0) { sourceIndex = 0; }
        if (length === void 0) { length = Infinity; }
        if (!source)
            return source; // may have passed zero? undefined? or null?
        return copyTo(source, initialize_1.initialize(Math.min(length, Math.max(source.length - sourceIndex, 0))), sourceIndex, 0, length);
    }
    exports_1("copy", copy);
    /**
     * Copies one array to another.
     * @param source
     * @param destination
     * @param sourceIndex
     * @param destinationIndex
     * @param length An optional limit to stop copying.
     * @returns The destination array.
     */
    function copyTo(source, destination, sourceIndex, destinationIndex, length) {
        if (sourceIndex === void 0) { sourceIndex = 0; }
        if (destinationIndex === void 0) { destinationIndex = 0; }
        if (length === void 0) { length = Infinity; }
        if (!source)
            throw new ArgumentNullException_1.ArgumentNullException('source', CBN);
        if (!destination)
            throw new ArgumentNullException_1.ArgumentNullException('destination', CBN);
        if (sourceIndex < 0)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('sourceIndex', sourceIndex, CBL0);
        var sourceLength = source.length;
        if (!sourceLength)
            return destination;
        if (sourceIndex >= sourceLength)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('sourceIndex', sourceIndex, 'Must be less than the length of the source array.');
        if (destination.length < 0)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('destinationIndex', destinationIndex, CBL0);
        var maxLength = source.length - sourceIndex;
        if (isFinite(length) && length > maxLength)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException('sourceIndex', sourceIndex, 'Source index + length cannot exceed the length of the source array.');
        length = Math.min(length, maxLength);
        var newLength = destinationIndex + length;
        if (newLength > destination.length)
            destination.length = newLength;
        for (var i = 0; i < length; i++) {
            destination[destinationIndex + i] = source[sourceIndex + i];
        }
        return destination;
    }
    exports_1("copyTo", copyTo);
    var initialize_1, ArgumentNullException_1, ArgumentOutOfRangeException_1, CBN, CBL0;
    return {
        setters: [
            function (initialize_1_1) {
                initialize_1 = initialize_1_1;
            },
            function (ArgumentNullException_1_1) {
                ArgumentNullException_1 = ArgumentNullException_1_1;
            },
            function (ArgumentOutOfRangeException_1_1) {
                ArgumentOutOfRangeException_1 = ArgumentOutOfRangeException_1_1;
            }
        ],
        execute: function () {
            CBN = 'Cannot be null.', CBL0 = 'Cannot be less than zero.';
        }
    };
});
//# sourceMappingURL=copy.js.map