$.fn.confirm = function(message) {
	var term = $(this).terminal();
	var deferred = new $.Deferred();
	term.push(function(command) {
		if (command.match(/^Y(es)?$/i)) {
			deferred.resolve(true);
		} else if (command.match(/^N(o)?$/i)) {
			deferred.resolve(false);
		}
		if (command.match(/^(Y(es)?|N(o)?)$/i)) {
			term.pop();
		}
	}, {
		prompt: message
	});
	return deferred.promise();
};

