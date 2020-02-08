/* global module */
'use strict';

var ChessWebAPI = (function() {
    var _baseUri = 'https://api.chess.com';

    var WrapPromiseWithAbort = function(promise, onAbort) {
        promise.abort = onAbort;
        return promise;
    };

    var _promiseProvider = function(promiseFunction, onAbort) {
        var returnedPromise;
        if (_promiseImplementation !== null) {
            var deferred = _promiseImplementation.defer();
            promiseFunction(
                function(resolvedResult) {
                    deferred.resolve(resolvedResult);
                },
                function(rejectedResult) {
                    deferred.reject(rejectedResult);
                }
            );
            returnedPromise = deferred.promise;
        } else {
            if (window.Promise) {
                returnedPromise = new window.Promise(promiseFunction);
            }
        }
    
        if (returnedPromise) {
            return new WrapPromiseWithAbort(returnedPromise, onAbort);
        } else {
            return null;
        }
    };

    var _extend = function() {
        var args = Array.prototype.slice.call(arguments);
        var target = args[0];
        var objects = args.slice(1);
        target = target || {};
        objects.forEach(function(object) {
            for (var j in object) {
                if (object.hasOwnProperty(j)) {
                    target[j] = object[j];
                }
            }
        });
        return target;
    };

    var _buildUrl = function(url, parameters) {
        var qs = '';
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                var value = parameters[key];
                qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        }
        if (qs.length > 0) {
            // chop off last '&'
            qs = qs.substring(0, qs.length - 1);
            url = url + '?' + qs;
        }
        return url;
    };

    var _performRequest = function(requestData, callback) {
        var req = new XMLHttpRequest();
    
        var promiseFunction = function(resolve, reject) {
        function success(data) {
            if (resolve) {
                resolve(data);
            }
            if (callback) {
                callback(null, data);
            }
        }
    
        function failure() {
            if (reject) {
                reject(req);
            }
            if (callback) {
                callback(req, null);
            }
        }
    
        var type = requestData.type || 'GET';
        req.open(type, _buildUrl(requestData.url, requestData.params));
        if (_accessToken) {
            req.setRequestHeader('Authorization', 'Bearer ' + _accessToken);
        }
        if (requestData.contentType) {
            req.setRequestHeader('Content-Type', requestData.contentType)
        }
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    var data = null;
                    try {
                        data = req.responseText ? JSON.parse(req.responseText) : '';
                    } catch (e) {
                        console.error(e);
                    }
            
                    if (req.status >= 200 && req.status < 300) {
                        success(data);
                    } else {
                        failure();
                    }
                }
            };
        
            if (type === 'GET') {
                req.send(null);
            } else {
                var postData = null
                if (requestData.postData) {
                    postData = requestData.contentType === 'image/jpeg' ? requestData.postData : JSON.stringify(requestData.postData)
                }
                req.send(postData);
            }
        };
    
        if (callback) {
            promiseFunction();
            return null;
        } else {
            return _promiseProvider(promiseFunction, function() {
                req.abort();
            });
        }
    };

    var _checkParamsAndPerformRequest = function(requestData, options, callback, optionsAlwaysExtendParams) {
        var opt = {};
        var cb = null;
    
        if (typeof options === 'object') {
            opt = options;
            cb = callback;
        } else if (typeof options === 'function') {
            cb = options;
        }
    
        // options extend postData, if any. Otherwise they extend parameters sent in the url
        var type = requestData.type || 'GET';
        if (type !== 'GET' && requestData.postData && !optionsAlwaysExtendParams) {
            requestData.postData = _extend(requestData.postData, opt);
        } else {
            requestData.params = _extend(requestData.params, opt);
        }
        return _performRequest(requestData, cb);
    };

    /**
     * Creates an instance of the wrapper
     * @constructor
     */
    var Constr = function() {};

    Constr.prototype = {
        constructor: ChessWebAPI
    };

    /**
     * Fetches a resource through a generic GET request.
     *
     * @param {string} url The URL to be fetched
     * @param {function(Object,Object)} callback An optional callback
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    Constr.prototype.getGeneric = function(url, callback) {
        var requestData = {
            url: url
        };
        return _checkParamsAndPerformRequest(requestData, callback);
    };

    /**
     * Fetches information about the current user.
     * See [Get Current User's Profile](https://developer.spotify.com/web-api/get-current-users-profile/) on
     * the Spotify Developer site for more information about the endpoint.
     *
     * @param {Object} options A JSON object with options that can be passed
     * @param {function(Object,Object)} callback An optional callback that receives 2 parameters. The first
     * one is the error object (null if no error), and the second is the value if the request succeeded.
     * @return {Object} Null if a callback is provided, a `Promise` object otherwise
     */
    Constr.prototype.playerProfile = function(options, callback) {
        var requestData = {
            url: _baseUri + '/pub/player/'
        };
        return _checkParamsAndPerformRequest(requestData, options, callback);
    };
})

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = ChessWebAPI;
  }