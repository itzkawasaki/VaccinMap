exports.bind = function(app) {

  app.get("/b.hatena/:keyword.json", function(req, res){

      console.log("keyword " + req.params.keyword);

      hatenaB.request(req.params.keyword, function(error, xml){
        hatenaB.toJsonArray(xml, function(error, data){
           res.send(data);
        });
      });

  });

  app.get("/b.hatena/:keyword.xml", function(req, res){

      console.log("keyword " + req.params.keyword);

      hatenaB.request(req.params.keyword, function(error, xml){
        res.send(xml);
      });

  });

  app.get("/b.hatena/vaccination.json", function(req, res){

      console.log("do: get vaccination list");

      hatenaB.request(req.params.keyword, function(error, xml){
        hatenaB.toJsonArray(xml, function(error, data){
           res.send(data);
        });
      });

  });

};

var request = require('request');
var querystring = require("querystring");
var to_json = require('xmljson').to_json;

var hatenaB = {};
hatenaB.request = function(keyword, callback) {

    var api = 'http://b.hatena.ne.jp/search/tag?'+ querystring.stringify({
       users: 3,
       sort: "recent",
       mode: 'rss',
       q : keyword
     });

    request(api, function (error, response, body) {
      console.log("remeote " +  api );

      if (!error && response.statusCode == 200) {
        callback(null, body);
      }else {
        callback(error || response.statusCode, {});
      }
    });
};

hatenaB.toJsonArray = function(xml, callback) {
  //console.log(xml);
  to_json(xml, function (error, data) {
console.log(data);
    if(error) {
      callback(error, data);
    }else {
      var res = [];
      var items = data["rdf:RDF"].item;
      for( i in  items ) {
        res.push(items[i]);
      }

      callback(null, res);
    }

  });

};
