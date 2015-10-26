JSONP = (function(document){
    // Using JSONP to request data from the BestBuy API due to CORS restrictions on the API
    var jsonp = {};

 	var requests = 0,
        head = document.getElementsByTagName('head')[0];

	jsonp.get = function(src, data, callback) {
        if (!arguments[2]) {
            callback = arguments[1];
            data = {};
        }
		
        src += (src.indexOf('?')+1 ? '&' : '?');

        var script = document.createElement('script'),
            params = [],
            requestId = requests,
            param;
        
        requests++;

        data.callback = 'callback_request_' + requestId;
        
        window['callback_request_' + requestId] = function (data) {
            head.removeChild(script);
            delete window['callback_request_' + requestId];

            callback(data); 
        };
        
        for (param in data) {
            params.push(param + '=' + encodeURIComponent(data[param]));
        }

        src += params.join('&');

        script.type = 'text/javascript';
        script.src = src;

        head.appendChild(script); 
	}

    return jsonp;
})(document);