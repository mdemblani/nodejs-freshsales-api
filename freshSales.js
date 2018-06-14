"use strict";

var Promise = require("bluebird");
var _ = require("lodash");
var request = require("request");

function FreshSales(domain, authentication) {
	if(!domain || !_.isString(domain)) {
		throw new Error("Domain name required for FreshSales API. Syntax: https://domain.freshsales.io");
	}

	this.authorization;
	this.base_url = 'https://'+ domain +'.freshsales.io';

	if(authentication.api_key) {
		this.authorization = 'Token token='+authentication.api_key;
	} else if(authentication.email && authentication.password) {
		var encode = new Buffer(authentication.email + ':' + authentication.password).toString('base64');
		this.authorization ='Basic ' + encode;
	} else {
		throw new Error("API Key or UserCredentials not provided");
	}
}

FreshSales.prototype.request = function(method, options) {
	var freshsales = this;
	var promise = new Promise(function(resolve, reject) {
		if(!options) {
			return reject(new Error("Request Options not provided"));
		}
		
		request({
			baseUrl: freshsales.base_url,
			uri: options.endpoint || '',
			headers: {
				'User-Agent' : 'localmachine',
				'Authorization' : freshsales.authorization
			},
			method: method,
			json: true, 	//For sending and accepting a JSON request and reponse
			body: options.payload,
			qs: options.query
		}, function(err, response) {

			if(err) {
				return reject(new Error(err));
			}

			//Check the HTTP response status Code and see it is a success
			if(response.statusCode < 200 || response.statusCode > 299) {
				return reject(new Error(JSON.stringify(response.body)));
			}

			return resolve(response);
		});
	});

	return promise;
};

/**
* Convenience method for search
* @param query: name-value pairs to search
* @return array of results
*/
FreshSales.prototype.search = function(query) {
	var freshsales = this;
	var options = {
		endpoint: 'api/search',
		query: query
	};
	return this.request('GET', options);
};


/**
* Search for Leads by email address
* @param email address
* @return array of results
*/
FreshSales.prototype.searchLeadsByEmail = function(emailAddress) {
	var freshsales = this;
	var query = {
		f : 'email',
		include: 'lead',
		q: emailAddress
	};
	return this.search(query);
};

/**
* Search for Contacts by email address
* @param email address
* @return array of results
*/
FreshSales.prototype.searchContactsByEmail = function(emailAddress) {
	var freshsales = this;
	var query = {
		f : 'email',
		include: 'contact',
		q: emailAddress
	};
	return this.search(query);
};

/**
* Create a Note
* @param the note
* @param ID of entity to add the Note to
* @param entity:"Lead" or "Contact" or "SalesAccount" or "Deal"
* @return Note
*/
FreshSales.prototype.createANote = function(description, targetable_id, targetable_type){
	var freshsales = this;
	var params = {
		description: description, 
		targetable_id: targetable_id,
		targetable_type: targetable_type
	};
	var options = {
		endpoint: 'api/notes',
		payload: params
	};
	return this.request('POST', options);
};

module.exports = exports = FreshSales;
