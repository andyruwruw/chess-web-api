'use strict';

module.exports = {
    queueSetup: function() {
        this._requests = [];
        this._running = false;
    },

    dispatch: function(method, callback, parameters, options, priority) {
        if (!method || typeof(callback) != 'function') throw "dispatch requires callback function";
        if (!callback || typeof(callback) != 'function') throw "dispatch requires callback function";
        let request = {
            method: method,
            callback: callback,
            parameters: parameters ? parameters : [], 
            options: options ? options : {}, 
            priority: priority ? priority : 1,
        };
        this.enqueue(request);
    },

    enqueue: function(request) {
        let contain = false;
        for (let i = 0; i < this._requests.length; i++) 
            if (this._requests[i].priority > request.priority) {
                this._requests.splice(i, 0, request);
                contain = true;
                break;
            }
        if (!contain) this._requests.push(request);
        if (!this._running) this.startRequests();
    },

    dequeue: function() {
        if (this._requests.length == 0)
            return null;
        return (this._requests.shift());
    },

    startRequests: async function() {
        try {
            while (this._requests.length > 0) {
                if (!this._running) this._running = true;
                let request = this.dequeue();
                let method = request.method;
                let callback = request.callback;
                let response = await method(...request.parameters, request.options);
                callback(response);
            }
            this._running = false;
        } catch(error) {
            throw error;
        }
    },

};