QUnit.test('Config setup', function (assert) {
	expect(2);

	assert.strictEqual(CONFIG.domain, 'http://www.bestbuy.ca/', 'Base domain');
	assert.strictEqual(CONFIG.apiUrl, 'http://www.bestbuy.ca/api/v2/json/', 'API URL');
});

QUnit.test('Products', function (assert) {
	expect(3);
	
	var complete = assert.async();
	API.getProducts(null, 
	  function(data) {
		assert.strictEqual(data.length, 32, 'Correct number of products');
		complete();
	  }
	);

	var complete2 = assert.async();
	API.getProducts(20001, 
	  function(data) {
		assert.ok(data.length > 0, 'Products by category');
		complete2();
	  }
	);

	var complete3 = assert.async();
	API.getProductDetails(10392133, 
	  function(data) {
		assert.strictEqual(data.name, 'Google Chromecast');
		complete3();
	  }
	);
});

QUnit.test('Categories', function (assert) {
	expect(1);
	
	var complete = assert.async();
	API.getCategories(function(data) {
		assert.ok(data.length > 0, 'Categories are returned');
		complete();
	  }
	);
});