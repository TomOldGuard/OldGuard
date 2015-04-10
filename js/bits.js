/* ------------- Hiding email ------------------ */

/*
Copyright (c) 2012 Colin Rotherham, http://colinr.com
https://github.com/colinrotherham/email-obfuscator
*/

var CRD = CRD || {};

// helper methods
CRD.Helper =
{
	// unscramble obfuscated emails
	emailUnscramble: function(emailArrayScrambled)
	{
		var emailArray = [];
		var email = CRD.Helper.config.email;
	 
	 	// unscramble email intro array
		for (var i = 0, j = emailArrayScrambled.length; i < j; i++) 
		{
			var intChar = (emailArrayScrambled[i - 1])? emailArrayScrambled[i] - emailArrayScrambled[i - 1] : emailArrayScrambled[i];
			
			emailArrayScrambled[i] = intChar;			
			emailArray.push(String.fromCharCode(intChar));
		}
		
		// output email from array
		var strEmail = emailArray.join('');

		email.attr('href', 'mailto:' + strEmail).html(strEmail);
	},
	
	init: function(_config)
	{

		CRD.Helper.config = _config;
		CRD.Helper.emailUnscramble([104, 209, 169, 175, 219, 208, 203, 220, 214, 211, 214, 146, 145, 210, 157, 163, 224]);

	}
};

CRD.Helper.init(
{
	email: $('#email')
});

/* ------------- FitVids ------------------ */

$(document).ready(function(){
  // Target your .container, .wrapper, .post, etc.
  $("article").fitVids();
});