!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./TimeSpan","./ClockTime","./TimeStamp","../Exceptions/ArgumentNullException"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("./TimeSpan"),r=e("./ClockTime"),i=e("./TimeStamp"),o=e("../Exceptions/ArgumentNullException"),a=void 0,u=function(){function e(t,n){void 0===t&&(t=new Date),void 0===n&&(n=1),this._kind=n,t instanceof e?(this._value=t.toJsDate(),n===a&&(this._kind=t._kind)):t instanceof Date?this._value=new Date(t.getTime()):this._value=t===a?new Date:new Date(t)}return e.prototype.toJsDate=function(){return new Date(this._value.getTime())},Object.defineProperty(e.prototype,"kind",{get:function(){return this._kind},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"year",{get:function(){return this._value.getFullYear()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"month",{get:function(){return this._value.getMonth()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"calendarMonth",{get:function(){return this._value.getMonth()+1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"calendar",{get:function(){return{year:this.year,month:this.calendarMonth,day:this.day}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"day",{get:function(){return this._value.getDate()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dayIndex",{get:function(){return this._value.getDate()-1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dayOfWeek",{get:function(){return this._value.getDay()},enumerable:!0,configurable:!0}),e.prototype.addMilliseconds=function(t){return t=t||0,new e(this._value.getTime()+t,this._kind)},e.prototype.addSeconds=function(e){return e=e||0,this.addMilliseconds(1e3*e)},e.prototype.addMinutes=function(e){return e=e||0,this.addMilliseconds(6e4*e)},e.prototype.addHours=function(e){return e=e||0,this.addMilliseconds(36e5*e)},e.prototype.addDays=function(e){return e=e||0,this.addMilliseconds(864e5*e)},e.prototype.addMonths=function(t){t=t||0;var n=this.toJsDate();return n.setMonth(n.getMonth()+t),new e(n,this._kind)},e.prototype.addYears=function(t){t=t||0;var n=this.toJsDate();return n.setFullYear(n.getFullYear()+t),new e(n,this._kind)},e.prototype.add=function(e){return this.addMilliseconds(e.getTotalMilliseconds())},e.prototype.subtract=function(e){return this.addMilliseconds(-e.getTotalMilliseconds())},e.prototype.timePassedSince=function(t){return e.between(t,this)},Object.defineProperty(e.prototype,"date",{get:function(){var t=this;return new e(new Date(t.year,t.month,t.day),t._kind)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"timeOfDay",{get:function(){var e=this,t=e._time;if(!t){var n=this._value;e._time=t=new r.ClockTime(n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds())}return t},enumerable:!0,configurable:!0}),e.prototype.toTimeStamp=function(){return i.TimeStamp.from(this)},Object.defineProperty(e,"now",{get:function(){return new e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"toUniversalTime",{get:function(){var t=this;if(1!=t._kind)return new e(t,t._kind);var n=t._value;return new e(new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds(),n.getUTCMilliseconds()),2)},enumerable:!0,configurable:!0}),e.prototype.equals=function(t,n){if(void 0===n&&(n=!1),!t)return!1;if(t==this)return!0;if(t instanceof Date){var r=this._value;return t==r||t.getTime()==r.getTime()}if(t instanceof e){if(n){var i=t._kind;if(!i&&this._kind||i!=this._kind)return!1}return this.equals(t._value)}return!n&&this.equals(t.toJsDate())},e.prototype.compareTo=function(t){if(!t)throw new o.ArgumentNullException("other");if(t==this)return 0;t instanceof e&&(t=t._value);var n=this._value.getTime();return t instanceof Date?n-t.getTime():n-t.toJsDate().getTime()},e.prototype.equivalent=function(t){if(!t)return!1;if(t==this)return!0;if(t instanceof Date){var n=this._value;return n.toUTCString()==t.toUTCString()}return!!(t instanceof e&&this.equals(t,!0))||this.equivalent(t.toJsDate())},Object.defineProperty(e,"today",{get:function(){return e.now.date},enumerable:!0,configurable:!0}),Object.defineProperty(e,"tomorrow",{get:function(){var t=e.today;return t.addDays(1)},enumerable:!0,configurable:!0}),e.between=function(t,r){var i=t instanceof e?t._value:t,o=r instanceof e?r._value:r;return new n.TimeSpan(o.getTime()-i.getTime())},e.isLeapYear=function(e){return e%4==0&&e%100!=0||e%400==0},e.daysInMonth=function(e,t){return new Date(e,t+1,0).getDate()},e.from=function(t,n,r){void 0===n&&(n=0),void 0===r&&(r=1);var i;return"object"==typeof t?(r=t.day,n=t.month,i=t.year):i=t,new e(new Date(i,n,r))},e.fromCalendarDate=function(t,n,r){void 0===n&&(n=1),void 0===r&&(r=1);var i;return"object"==typeof t?(r=t.day,n=t.month,i=t.year):i=t,new e(new Date(i,n-1,r))},e}();t.DateTime=u,Object.freeze(u),t["default"]=u});
//# sourceMappingURL=DateTime.js.map