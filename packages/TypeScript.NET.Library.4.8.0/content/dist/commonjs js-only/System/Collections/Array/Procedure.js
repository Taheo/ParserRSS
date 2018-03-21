/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
"use strict";
function sum(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    if (!source || !source.length)
        return 0;
    var result = 0;
    if (ignoreNaN)
        source.forEach(function (n) {
            if (!isNaN(n))
                result += n;
        });
    else
        source.every(function (n) {
            result += n;
            return !isNaN(result);
        });
    return result;
}
exports.sum = sum;
function average(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    if (!source || !source.length)
        return NaN;
    var result = 0, count;
    if (ignoreNaN) {
        count = 0;
        source.forEach(function (n) {
            if (!isNaN(n)) {
                result += n;
                count++;
            }
        });
    }
    else {
        count = source.length;
        source.every(function (n) {
            result += n;
            return !isNaN(result);
        });
    }
    return (!count || isNaN(result)) ? NaN : (result / count);
}
exports.average = average;
function product(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    if (!source || !source.length)
        return NaN;
    var result = 1;
    if (ignoreNaN) {
        var found_1 = false;
        source.forEach(function (n) {
            if (!isNaN(n)) {
                result *= n;
                if (!found_1)
                    found_1 = true;
            }
        });
        if (!found_1)
            result = NaN;
    }
    else {
        source.every(function (n) {
            if (isNaN(n)) {
                result = NaN;
                return false;
            }
            result *= n;
            return true;
        });
    }
    return result;
}
exports.product = product;
/**
 * Takes the first number and divides it by all following.
 * @param source
 * @param ignoreNaN Will cause this skip any NaN values.
 * @returns {number}
 */
function quotient(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    if (!source || source.length < 2)
        return NaN;
    var result = source[0];
    var found = false;
    source.every(function (n, i) {
        if (i) {
            if (n === 0) {
                result = NaN;
                return false;
            }
            if (isNaN(n)) {
                if (!ignoreNaN) {
                    result = NaN;
                    return false;
                }
            }
            else {
                result /= n;
                if (!found)
                    found = true;
            }
        }
        return true;
    });
    if (!found)
        result = NaN;
    return result;
}
exports.quotient = quotient;
function ifSet(source, start, ignoreNaN, predicate) {
    if (!source || !source.length)
        return NaN;
    var result = start;
    if (ignoreNaN) {
        var found_2 = false;
        source.forEach(function (n) {
            if (!isNaN(n)) {
                if (predicate(n, result))
                    result = n;
                if (!found_2)
                    found_2 = true;
            }
        });
        if (!found_2)
            result = NaN;
    }
    else {
        source.every(function (n) {
            if (isNaN(n)) {
                result = NaN;
                return false;
            }
            if (predicate(n, result))
                result = n;
            return true;
        });
    }
    return result;
}
function min(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    return ifSet(source, +Infinity, ignoreNaN, function (n, result) { return n < result; });
}
exports.min = min;
function max(source, ignoreNaN) {
    if (ignoreNaN === void 0) { ignoreNaN = false; }
    return ifSet(source, -Infinity, ignoreNaN, function (n, result) { return n > result; });
}
exports.max = max;