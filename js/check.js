function getMessage(a, b){
	
	if(typeof(a) === 'boolean'){
		if(a)
			return 'Я попал в ' + b;
		else
			return 'Я никуда не попал'; 
	}
	
	if(typeof(a) === 'number')
		return 'Я прыгнул на ' + a * 100 + ' сантиметров';

	if(Array.isArray(a)){
		if(Array.isArray(b)){
			var length = 0;
			for (var i = a.length - 1; i >= 0; i--) {
				length += a[i] * b[i];
			};
			return 'Я прошёл ' + [length] + ' метров';
		}
		else{
			var sum = 0;
			for (var i = a.length - 1; i >= 0; i--) {
				sum += a[i];
			};
			return 'Я прошёл ' + [sum] + ' шагов';
		}
	}
}