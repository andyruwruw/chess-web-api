const Request = function (builder) {
  if (!builder) {
    throw new Error('No builder supplied to constructor');
  }

  this.host = builder.host;
  this.port = builder.port;
  this.scheme = builder.scheme;
  this.queryParameters = builder.queryParameters;
  this.bodyParameters = builder.bodyParameters;
  this.headers = builder.headers;
  this.path = builder.path;

  if (this.headers === undefined) {
    this.headers = { 'User-Agent': 'chess-web-api/1.1.3' };
  } else if ((typeof this.headers === 'object') && !Object.prototype.hasOwnProperty.call(this.headers, 'User-Agent')) {
    this.headers['User-Agent'] = 'chess-web-api/1.1.3';
  }
};

Request.prototype._getter = function (key) {
  return function () {
    return this[key];
  };
};

Request.prototype.getHost = Request.prototype._getter('host');

Request.prototype.getPort = Request.prototype._getter('port');

Request.prototype.getScheme = Request.prototype._getter('scheme');

Request.prototype.getPath = Request.prototype._getter('path');

Request.prototype.getQueryParameters = Request.prototype._getter(
  'queryParameters',
);

Request.prototype.getBodyParameters = Request.prototype._getter(
  'bodyParameters',
);

Request.prototype.getHeaders = Request.prototype._getter('headers');

Request.prototype.getURI = function () {
  if (!this.scheme || !this.host || !this.port) {
    throw new Error('Missing components necessary to construct URI');
  }
  let uri = `${this.scheme}://${this.host}`;
  if ((this.scheme === 'http' && this.port !== 80)
    || (this.scheme === 'https' && this.port !== 443)) {
    uri += `:${this.port}`;
  }
  if (this.path) {
    uri += this.path;
  }
  return uri;
};

Request.prototype.getURL = function () {
  const uri = this.getURI();
  if (this.getQueryParameters()) {
    return uri + this.getQueryParameterString(this.getQueryParameters());
  }
  return uri;
};

Request.prototype.getQueryParameterString = function () {
  const queryParameters = this.getQueryParameters();
  if (queryParameters) {
    return (
      `?${
        Object.keys(queryParameters)
          .filter((key) => queryParameters[key] !== undefined)
          .map((key) => `${key}=${queryParameters[key]}`)
          .join('&')}`
    );
  }
  return '';
};

Request.prototype.execute = function (method, callback) {
  if (callback) {
    method(this, callback);
    return null;
  }
  const _self = this;

  return new Promise(((resolve, reject) => {
    method(_self, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));
};

const Builder = function () {};

Builder.prototype._setter = function (key) {
  return function (value) {
    this[key] = value;
    return this;
  };
};

Builder.prototype.withHost = Builder.prototype._setter('host');

Builder.prototype.withPort = Builder.prototype._setter('port');

Builder.prototype.withScheme = Builder.prototype._setter('scheme');

Builder.prototype.withPath = Builder.prototype._setter('path');

Builder.prototype._assigner = function (key) {
  return function () {
    for (let i = 0; i < arguments.length; i += 1) {
      // eslint-disable-next-line prefer-rest-params
      this[key] = this._assign(this[key], arguments[i]);
    }
    return this;
  };
};

Builder.prototype.withQueryParameters = Builder.prototype._assigner(
  'queryParameters',
);

Builder.prototype.withBodyParameters = Builder.prototype._assigner(
  'bodyParameters',
);

Builder.prototype.withHeaders = Builder.prototype._assigner('headers');

Builder.prototype._assign = function (src, obj) {
  if (obj && Array.isArray(obj)) {
    return obj;
  }
  if (obj && Object.keys(obj).length > 0) {
    return Object.assign(src || {}, obj);
  }
  return src;
};

Builder.prototype.build = function () {
  return new Request(this);
};

module.exports.builder = function () {
  return new Builder();
};
