var cookie = (function(){
	var defaults = {}

	function encode(s){
		return encodeURIComponent(s);
	}

	function decode(s){
		return decodeURIComponent(s);
	}

	var setCookie = function(key, value, options){
		options = Object.assign({}, defaults, options);

		//如果设置了expires，计算过期时间
		if(typeof options.expires === 'number'){
			var days = options.expires,
				t = options.expires = new Date();

			t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
		}

		document.cookie = [
			encode(key), '=', encode(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '',
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join('');
	}

	var getCookie = function(key){
		var result = key ? undefined : {},
			cookies = document.cookie ? document.cookie.split("; ") : [],
			len = cookies.length;

		for(var i = 0; i < len; i++){
			var parts = cookies[i].split('='),    //取出每部分的cookie,用 = 分割成数组
				name = decode(parts.shift()),     //取出数组的第一个值
				cookie = parts.join('=');         //如果value中有=号，需要拼接回去
			
			if(key && key === name){
				result = decode(cookie);
				break;
			}
			//没有参数
			if(!key){
				result[name] = cookie;
			}
		}

		return result;
	}

	var removeCookie = function(key, options){
		setCookie(key, '', Object.assign({}, options, {expires: -1}));
		return !getCookie(key);
	}

	return {
		setCookie: setCookie,
		getCookie: getCookie,
		removeCookie: removeCookie
	}
})();