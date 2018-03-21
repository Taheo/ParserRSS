System.register(["../Compare", "./Array/Utility", "../Types", "../Integer", "./Enumeration/EnumeratorBase", "../Exceptions/NotImplementedException", "../Exceptions/InvalidOperationException", "../Exceptions/ArgumentOutOfRangeException", "./CollectionBase", "../../extends"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function assertZeroOrGreater(value, property) {
        if (value < 0)
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(property, value, "Must be greater than zero");
        return true;
    }
    function assertIntegerZeroOrGreater(value, property) {
        Integer_1.Integer.assert(value, property);
        return assertZeroOrGreater(value, property);
    }
    var Compare_1, AU, Types_1, Integer_1, EnumeratorBase_1, NotImplementedException_1, InvalidOperationException_1, ArgumentOutOfRangeException_1, CollectionBase_1, extends_1, __extends, VOID0, MINIMUM_GROW, SHRINK_THRESHOLD, GROW_FACTOR_HALF, DEFAULT_CAPACITY, emptyArray, Queue;
    return {
        setters: [
            function (Compare_1_1) {
                Compare_1 = Compare_1_1;
            },
            function (AU_1) {
                AU = AU_1;
            },
            function (Types_1_1) {
                Types_1 = Types_1_1;
            },
            function (Integer_1_1) {
                Integer_1 = Integer_1_1;
            },
            function (EnumeratorBase_1_1) {
                EnumeratorBase_1 = EnumeratorBase_1_1;
            },
            function (NotImplementedException_1_1) {
                NotImplementedException_1 = NotImplementedException_1_1;
            },
            function (InvalidOperationException_1_1) {
                InvalidOperationException_1 = InvalidOperationException_1_1;
            },
            function (ArgumentOutOfRangeException_1_1) {
                ArgumentOutOfRangeException_1 = ArgumentOutOfRangeException_1_1;
            },
            function (CollectionBase_1_1) {
                CollectionBase_1 = CollectionBase_1_1;
            },
            function (extends_1_1) {
                extends_1 = extends_1_1;
            }
        ],
        execute: function () {
            // noinspection JSUnusedLocalSymbols
            __extends = extends_1.default;
            VOID0 = void 0;
            MINIMUM_GROW = 4;
            SHRINK_THRESHOLD = 32; // Unused?
            // var GROW_FACTOR: number = 200;  // double each time
            GROW_FACTOR_HALF = 100;
            DEFAULT_CAPACITY = MINIMUM_GROW;
            emptyArray = Object.freeze([]);
            Queue = (function (_super) {
                __extends(Queue, _super);
                function Queue(source, equalityComparer) {
                    if (equalityComparer === void 0) { equalityComparer = Compare_1.areEqual; }
                    var _this = _super.call(this, VOID0, equalityComparer) || this;
                    var _ = _this;
                    _._head = 0;
                    _._tail = 0;
                    _._size = 0;
                    if (!source)
                        _._array = emptyArray;
                    else {
                        if (Types_1.Type.isNumber(source)) {
                            var capacity = source;
                            assertIntegerZeroOrGreater(capacity, "capacity");
                            _._array = capacity
                                ? AU.initialize(capacity)
                                : emptyArray;
                        }
                        else {
                            var se = source;
                            _._array = AU.initialize(Types_1.Type.isArrayLike(se)
                                ? se.length
                                : DEFAULT_CAPACITY);
                            _._importEntries(se);
                        }
                    }
                    _._capacity = _._array.length;
                    return _this;
                }
                Queue.prototype.getCount = function () {
                    return this._size;
                };
                Queue.prototype._addInternal = function (item) {
                    var _ = this;
                    var size = _._size;
                    var len = _._capacity;
                    if (size == len) {
                        var newCapacity = len * GROW_FACTOR_HALF;
                        if (newCapacity < len + MINIMUM_GROW)
                            newCapacity = len + MINIMUM_GROW;
                        _.setCapacity(newCapacity);
                        len = _._capacity;
                    }
                    var tail = _._tail;
                    _._array[tail] = item;
                    _._tail = (tail + 1) % len;
                    _._size = size + 1;
                    return true;
                };
                //noinspection JSUnusedLocalSymbols
                Queue.prototype._removeInternal = function (item, max) {
                    throw new NotImplementedException_1.NotImplementedException("ICollection\<T\>.remove is not implemented in Queue\<T\>" +
                        " since it would require destroying the underlying array to remove the item.");
                };
                Queue.prototype._clearInternal = function () {
                    var _ = this;
                    var array = _._array, head = _._head, tail = _._tail, size = _._size;
                    if (head < tail)
                        AU.clear(array, head, tail);
                    else {
                        AU.clear(array, head);
                        AU.clear(array, 0, tail);
                    }
                    _._head = 0;
                    _._tail = 0;
                    _._size = 0;
                    _.trimExcess();
                    return size;
                };
                Queue.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    var _ = this;
                    if (_._array != emptyArray) {
                        _._array.length = _._capacity = 0;
                        _._array = emptyArray;
                    }
                };
                /**
                 * Dequeues entries into an array.
                 */
                Queue.prototype.dump = function (max) {
                    if (max === void 0) { max = Infinity; }
                    var _ = this;
                    var result = [];
                    if (isFinite(max)) {
                        Integer_1.Integer.assertZeroOrGreater(max);
                        if (max !== 0) {
                            while (max-- && _._tryDequeueInternal(function (value) {
                                result.push(value);
                            })) { }
                        }
                    }
                    else {
                        while (_._tryDequeueInternal(function (value) {
                            result.push(value);
                        })) { }
                    }
                    _.trimExcess();
                    _._signalModification();
                    return result;
                };
                Queue.prototype.forEach = function (action) {
                    return _super.prototype.forEach.call(this, action, true);
                };
                Queue.prototype.setCapacity = function (capacity) {
                    var _ = this;
                    assertIntegerZeroOrGreater(capacity, "capacity");
                    var array = _._array, len = _._capacity;
                    if (capacity > len)
                        _.throwIfDisposed();
                    if (capacity == len)
                        return;
                    var head = _._head, tail = _._tail, size = _._size;
                    // Special case where we can simply extend the length of the array. (JavaScript only)
                    if (array != emptyArray && capacity > len && head < tail) {
                        array.length = _._capacity = capacity;
                        _._version++;
                        return;
                    }
                    // We create a new array because modifying an existing one could be slow.
                    var newArray = AU.initialize(capacity);
                    if (size > 0) {
                        if (head < tail) {
                            AU.copyTo(array, newArray, head, 0, size);
                        }
                        else {
                            AU.copyTo(array, newArray, head, 0, len - head);
                            AU.copyTo(array, newArray, 0, len - head, tail);
                        }
                    }
                    _._array = newArray;
                    _._capacity = capacity;
                    _._head = 0;
                    _._tail = (size == capacity) ? 0 : size;
                    _._signalModification(true);
                };
                Queue.prototype.enqueue = function (item) {
                    this.add(item);
                };
                Queue.prototype._tryDequeueInternal = function (out) {
                    var _ = this;
                    if (!_._size)
                        return false;
                    var array = _._array, head = _._head;
                    var removed = _._array[head];
                    array[head] = null;
                    _._head = (head + 1) % _._capacity;
                    _._size--;
                    _._incrementModified();
                    out(removed);
                    return true;
                };
                Queue.prototype.dequeue = function (throwIfEmpty) {
                    if (throwIfEmpty === void 0) { throwIfEmpty = false; }
                    var _ = this;
                    _.assertModifiable();
                    var result = VOID0;
                    if (!this.tryDequeue(function (value) { result = value; }) && throwIfEmpty)
                        throw new InvalidOperationException_1.InvalidOperationException("Cannot dequeue an empty queue.");
                    return result;
                };
                /**
                 * Checks to see if the queue has entries an pulls an entry from the head of the queue and passes it to the out handler.
                 * @param out The 'out' handler that receives the value if it exists.
                 * @returns {boolean} True if a value was retrieved.  False if not.
                 */
                Queue.prototype.tryDequeue = function (out) {
                    var _ = this;
                    if (!_._size)
                        return false;
                    _.assertModifiable();
                    // A single dequeue shouldn't need update recursion tracking...
                    if (this._tryDequeueInternal(out)) {
                        // This may preemptively trigger the _onModified.
                        if (_._size < _._capacity / 2)
                            _.trimExcess(SHRINK_THRESHOLD);
                        _._signalModification();
                        return true;
                    }
                    return false;
                };
                Queue.prototype._getElement = function (index) {
                    assertIntegerZeroOrGreater(index, "index");
                    var _ = this;
                    return _._array[(_._head + index) % _._capacity];
                };
                Queue.prototype.peek = function (throwIfEmpty) {
                    if (throwIfEmpty === void 0) { throwIfEmpty = false; }
                    if (this._size == 0) {
                        if (throwIfEmpty)
                            throw new InvalidOperationException_1.InvalidOperationException("Cannot call peek on an empty queue.");
                        return VOID0;
                    }
                    return this._array[this._head];
                };
                Queue.prototype.trimExcess = function (threshold) {
                    var _ = this;
                    var size = _._size;
                    if (size < Math.floor(_._capacity * 0.9) && (!threshold && threshold !== 0 || isNaN(threshold) || threshold < size))
                        _.setCapacity(size);
                };
                Queue.prototype.getEnumerator = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    var index, version, size;
                    return new EnumeratorBase_1.EnumeratorBase(function () {
                        version = _._version;
                        size = _._size;
                        index = 0;
                    }, function (yielder) {
                        _.throwIfDisposed();
                        _.assertVersion(version);
                        if (index == size)
                            return yielder.yieldBreak();
                        return yielder.yieldReturn(_._getElement(index++));
                    });
                };
                return Queue;
            }(CollectionBase_1.CollectionBase));
            exports_1("Queue", Queue);
            exports_1("default", Queue);
        }
    };
});
//# sourceMappingURL=Queue.js.map