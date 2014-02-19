
/*
 * GET home page.
 */

exports.index = function(req, res){
	parrotClient.takeoff();
	parrotClient
	  .after(3000, function() {
		      this.stop();
			  this.land();
			    });
	res.render('index', { title: 'Express' });
};

/*
 * GET stream
 */

exports.stream = function(req, res){
	res.render('stream', { title: 'Camera' });
};

