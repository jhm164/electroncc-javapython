$(document).ready(function() {
	$(document).keydown(function(event) {
		if(event.keyCode === 67 && event.altKey) {
			$(".entry").val('');
			console.log('You cleared (ALT + C)')
		} else {
			console.log('ok')
		}
	});
});