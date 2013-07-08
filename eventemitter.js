(function (window, undefined) {
    'use strict';

    var log = function (arg) {
        console.log(arg);
    };

    var EventEmitter = function () {
        this.events = {};
        this.context = this;
    };

    EventEmitter.prototype.setContext = function (context) {
        this.context = context;
    };

    EventEmitter.prototype.on = function (type, callback) {
        if (!this.events.hasOwnProperty(type)) {
            this.events[type] = [];
            log('EventEmitter: [' + type + '] created.');
        }
        if (this.events[type].indexOf(callback) === -1) {
            this.events[type].push(callback);
            log('EventEmitter: [' + type + '] one callback registered.');
        }
    };

    EventEmitter.prototype.off = function (type, callback) {
        if (callback === null) {
            this.events[type] = [];
            log('EventEmitter: [' + type + '] cleared.');
        } else {
            var index = this.events[type].indexOf(callback);
            if (index !== -1) {
                this.events[type][index] = this.events[type][this.events[type].length - 1];
                this.events[type].pop();
                if (this.events[type].length === 0) {
                    delete this.events[type];
                    log('EventEmitter: [' + type + '] cleared by removing one callback.');
                } else {
                    log('EventEmitter: [' + type + '] removed one callback.');
                }
            }
        }
    };

    EventEmitter.prototype.emit = function (type, data1, data2, data3) {
        var count = 0,
            i;
        log('EventEmitter: [' + type + '] starting.');
        if (this.events.hasOwnProperty(type)) {
            try {
                for (i = this.events[type].length - 1; i >= 0; i -= 1) {
                    this.events[type][i].call(this.context, data1, data2, data3);
                    count += 1;
                }
                log('EventEmitter: [' + type + '] ' + count + ' callbacks executed synchronously.');
            } catch (ex) {
                log('EventEmitter: [' + type + '] failed.');
                log(ex);
                throw ex;
            }
            log('EventEmitter: [' + type + '] finished.');
        } else {
            log('EventEmitter: [' + type + '] no events registered.');
        }
    };


    // Export to module
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = EventEmitter;
    } else if (typeof define === "function" && define.amd) {
        define([], function () { return EventEmitter; });
    } else if (typeof window === "object" && typeof window.document === "object") {
        window.EventEmitter = EventEmitter;
    }

})(window);
