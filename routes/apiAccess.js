
var http = require('http');
var fs = require('fs');


exports.getData = function(app){

	app.get("/b.hatena/:keyword.json", function(req, res){

    	console.log("keyword " + req.params.keyword);

    	//クエリファイルの読み込み
        var query = fs.readFileSync('./sparql/hospital.txt', 'utf8');

        //検索パラメタの置換
        query = query.replace("PARAM",req.params.keyword)

        //APIの取得
    	getApi(query ,function(err,resdata){
    		console.log(resdata);
    		res.send(resdata);
    	});
  	});


	app.get("/b.hatena/:keyword.xml", function(req, res){

    	console.log("vaccination " + req.params.keyword);

    	//クエリファイルの読み込み
        var query = fs.readFileSync('./sparql/vaccin.txt', 'utf8');

        //検索パラメタの置換
        query = query.replace("PARAM",req.params.keyword)

        //APIの取得
    	getApi(query ,function(err,resdata){
    		res.send(resdata);
    	});
  	});
};



function getApi(query ,callback){

    //query = query.replace('PARAM',req.params.keyword);
    console.log("query: " + query);
    //URLエンコード
    var queryEnc = encodeURIComponent(query);

    var options = {
                   	hostname:'svjrrkweb01.cloudapp.net',
  					port:80,
  					path:'/data/sparql?query=' + queryEnc,
  					headers:{'accept':'application/sparql-results+json'}
    				};
	http.get(options, function(res2) {
	    var body = '';
	    var ret ;
	    var resultList=[];

	    res2.setEncoding('utf8');
	    res2.on('data', function(chunk) {
	        body += chunk;
	    });

	    res2.on('end', function() {
	        ret = JSON.parse(body);
	        //console.log('body :' + body);
	        //console.log('ret.results.bindings: '+ret.results.bindings);

	        var items = ret.results.bindings;
            for( i in  items ) {
            	resultList.push(items[i]);
            	//console.log('items[i]: '+items[i]);
             }
	    	callback(null,resultList);
	    	 //res.send(resultList);

	    });

	}).on('error', function(e) {
	    console.log(e.message);
	    callback(e,{});

	    }
	    )
	}
