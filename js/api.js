API = (function(CONFIG, JSONP) {
	// Local API abstraction + cache; looks in cache for requested items, sends request if not found.
	var api = {};
	var apiUrl = CONFIG.apiUrl;
	var _params = {};
	var _products = [];
	var _product = [];
	var _categories = undefined;
	var _result = undefined;

	// Looks in cache for existing results, otherwise query BestBuy API
	api.getProducts = function(categoryId, successCallback) {
		var queryString = _params,
			key = 'all';
		
		if (categoryId) {
			queryString.categoryId = categoryId;
			key = categoryId;
		}

		if (_products[key]) { 
			if (typeof(successCallback) === 'function') {
				successCallback(_products[key]);
			}	
		} else {
			JSONP.get(apiUrl + 'search', queryString, function(data) {			
				_products[key] = data.products;
				if (typeof(successCallback) === 'function') {
					successCallback(data.products);
				}
			});			
		}
	}

	// Looks in cache for existing categories, otherwise query BestBuy API
	api.getCategories = function(successCallback) {
		if (_categories) { 
			if (typeof(successCallback) === 'function') {
				successCallback(_categories);
			}
		} else {
			JSONP.get(apiUrl + 'category/departments', {}, function(data) {			
				_categories = data.subCategories;
				if (typeof(successCallback) === 'function') {
					successCallback(_categories);
				}
			});		
		}
	}

	// Looks in cache for existing product details, otherwise query BestBuy API
	api.getProductDetails = function(productId, successCallback) {
		if(_product[productId]) {
			if(typeof(successCallback) === 'function') {
				successCallback(_product[productId]);
			}
		} else {
			JSONP.get(apiUrl + 'product/' + productId, _params, function(data) {
				_product[productId] = data;
				if(typeof(successCallback) === 'function') {
					successCallback(_product[productId]);
				}
			});
		}
	}

	api.testRequests = function() {
		var callback = function(data) {
			console.log(data);
		}
		api.getProducts(null, callback);
		api.getCategories(callback);
		api.getProductDetails(10392133, callback);
	}

	return api;
})(CONFIG, JSONP);