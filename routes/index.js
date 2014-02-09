
/*
 * GET home page.
 */

var apiAccess = require('./apiAccess');

exports.index = function(req, res){
  res.render('index', { title: 'Expraaaaess'});
};


exports.apiAccess = function(req, res){
	var hospital = req.param('hospital');
	console.log('hospital :' + hospital);
	var array;
	console.log('do apiAccess');
	apiAccess.getData(hospital,function(results){
		//array = JSON.parse(results);
		res.render('index', {
			datalist: results
			});
		if(Array.isArray(results)){
			console.log('配列です');
		}else{
			console.log('配列じゃない');
			console.log(results);
			//array = JSON.parse(results);


		}

	});
}

exports.bind = function(app) {

  //require('./b.hatena').bind(app);
	require('./apiAccess').getData(app);
};
