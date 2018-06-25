# nodejs-freshsales

[![Known Vulnerabilities](https://snyk.io/test/github/mdemblani/nodejs-freshsales-api/badge.svg)](https://snyk.io/test/github/mdemblani/nodejs-freshsales-api) 

FreshSales api wrapper for the freshsales api. Has Promise handling. See [https://www.freshsales.io/api/](https://www.freshsales.io/api/)

```javascript
var FreshSales = require('freshsales-api')

//Using API-KEY
var authentication = {
    api_key: "FRESH SALES API KEY"
};

//Using email and password
var authentication = {
    email: "FRESH SALES Email",
    password: "FRESH SALES PASSWORD"
};

/**
 * Initiate FreshSales Constructor, to setup the API
 * authentication - THe authentication object
 * domain - Your FreshSales URL : Syntax = https://subdomain.freshsales.io
 *
 * Throws the following possible errors:
 * 1. If domain is missing: "Domain name required for FreshSales API. Syntax: https://domain.freshsales.io"
 * 2. If authentication object does not contain API key or UserCredentials - "API Key or UserCredentials not provided"
 */
var freshsales = new FreshSales(domain, authentication);

//Promise style
var options = {
    endpoint: 'API Endpoint',
    payload: payload
};
var method = "POST|GET|PUT|DELETE"
freshsales.request(method, options).then(function (result) {
  ...
}).catch(function (err) {
  ...
});
```

## Installation
NPM package is available for the repository. You can either install it from the NPM package directory or via the git url as:
```
npm install freshsales-api

        [OR]

npm install GIT_REMOTE_URL
```

## Usage
For information on the possible endpoints, refer to the FreshSales Api documentation: [https://www.freshsales.io/api](https://www.freshsales.io/api)

## Steps

### Initialization

```javascript
var FreshSales = require('freshsales-api')
```

### API Setup
```javascript
/**
 * Initiate FreshSales Constructor, to setup the API
 * authentication - THe authentication object
 * domain - Your FreshSales URL : Syntax = https://subdomain.freshsales.io
 *
 * Throws the following possible errors:
 * 1. If domain is missing: "Domain name required for FreshSales API. Syntax: https://domain.freshsales.io"
 * 2. If authentication object does not contain API key or UserCredentials - "API Key or UserCredentials not provided"
 */
var freshsales = new FreshSales(domain, authentication);
```

Authentication Object can be any one of the following
Using API-KEY
```javascript
var authentication = {
    api_key: "FRESH SALES API KEY"
};
```
Using email and password
```javascript
var authentication = {
    email: "FRESH SALES Email",
    password: "FRESH SALES PASSWORD"
};
```
### Standard Calls

```javascript
var options = {
    endpoint: 'API Endpoint',
    payload: 'Th object containing payload to be sent if a POST or PUT request is made',
    query: 'The object containing key-value pair of parameters to be attached to the request url'
};
var method = "POST|GET|PUT|DELETE";

//Response would be a json response at all times
freshsales.request(method, options).then(function (result) {
  ...
}).catch(function (err) {
  ...
});
```

## Future Updates
Support for the following will be added over time:
  1. Callback Support for the available methods
  2. Support for PathParams as a separate key in the available method
  3. Helper methods - Convenience methods such as FreshSales.get, FreshSales.put, FreshSales.push, FreshSales.delete

---------------------------------------------------------------------------------

__*Suggestion and Bugs and Problems and Fixes in the Source Code are welcome.*__
