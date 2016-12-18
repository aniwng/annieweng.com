$(document).ready(function(){  
	$('#carousel').carousel();
	
	
	var page = window.location.hash;
	
	$('#navbar a').click(function(){
		switchPage(page);
	});

});