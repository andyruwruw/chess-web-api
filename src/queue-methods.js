'use strict';

module.exports = {
    queueSetup: function() {
        this._requests = [];
        this._running = false;
    },

    dispatch: function(method, callback, parameters, options, callbackParameters, priority) {
        if (!method || typeof(method) != 'function') throw "dispatch requires request function";
        if (!callback || typeof(callback) != 'function') throw "dispatch requires callback function";
        var actualParameters = null;
        var actualOptions = null;
        var actualPriority = null; 
        var actualCallbackParameters = null;
        var items = [parameters, options, priority, callbackParameters];
        for (let i = 0; i < items.length; i++) {
          if (!items[i]) continue;
          if (items[i] instanceof Array && actualParameters == null) actualParameters = items[i];
          else if (items[i] instanceof Array && actualParameters != null) actualCallbackParameters = items[i];
          else if (typeof items[i] == 'object') actualOptions = items[i];
          else if (typeof items[i] == 'integer') actualPriority = items[i];
        }
        let request = {
            method: method,
            callback: callback,
            parameters: actualParameters ? actualParameters : [], 
            options: actualOptions ? actualOptions : {}, 
            priority: actualPriority ? actualPriority : 1,
            callbackParamerters: actualCallbackParameters ? actualCallbackParameters : [],
        };
        try {
            this.enqueue(request);
        } catch(error) {
            throw error;
        }
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
        try {
            if (!this._running) this.startRequests();
        } catch(error) {
            throw error;
        }
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
				let error = null;
				let response = await method(...request.parameters, request.options)
					.catch((e) => error = e);
                callback(response, error, ...request.callbackParameters);
            }
            this._running = false;
        } catch(error) {
            throw error;
        }
    },

};