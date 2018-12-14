var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "static/";
var MongoClient = require('mongodb').MongoClient;
var db;
var dbURL="mongodb://pets1:pets1@localhost:27017/pamperedpetsdb"
var server=http.createServer(function (req, res) {
   var urlObj = url.parse(req.url, true, false);
  console.log(urlObj.pathname)
  if(req.method=="GET")
    {
     fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
  if (err) {
    res.writeHead(404);
    res.end("<h1>Page does not exist!</h1>");
    return;
  }
  res.writeHead(200);
  res.end(data);
})
}
})

MongoClient.connect(dbURL, 
          function(err, database) {
  if(err) throw err;

  db=database.db("pamperedpetsdb")
  console.log("Connected to DB Server!")
  server.listen(8000);
  console.log("Web server listening on port 8000");
});