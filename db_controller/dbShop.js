var server=require("../pServer.js")


function updateShop(res,query,update)
{
  var db=server.getDb()

  db.collection("shop").update(query,update, function(err, results) {
    if (err) throw err;
    console.log(results.result.n +" document updated!");
    
  });
  res.writeHead(200);
  res.end(JSON.stringify("Update is done!"))
  }


module.exports.updateShop=updateShop