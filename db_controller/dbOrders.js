var server=require("../pServer.js")

function insertOrders(res,data)
{
  var db=server.getDb()
  console.log(data)
  info=data
  var cart=info[0]
  var customerInfo=info[1]
  var currentDate= new Date()
  var records=[]
  console.log("cart:"+cart.toString())
  console.log("cInfo:"+customerInfo.toString())
    for(i in cart)
    {
      item=cart[i]
     
      tPrice=item.price *item.quantity
      var record={customerID:customerInfo[0].customerID,
                  itemName:item.itemName,
                  totalPrice:tPrice,
                  quantity:item.quantity,
                  date: currentDate
                }
      records.push(record)
      console.log(record)
    }
  db.collection("orders").insertMany(records, function (err, result) {
    if(err)
       console.log(err)
    else
    {
    console.log("insert: "+result.insertedCount)
    res.writeHead(200);
    res.end("Thank you for your order!")
    }
  })
    
}

function findOrderItems(res,query)
{
 var db=server.getDb()
  db.collection("orders").find(query).toArray(function (err,results) {
 
    console.log(results)
    
    res.writeHead(200);
    res.end(JSON.stringify(results))
  })
}

function deleteOrders(res,query)
{
  var db=server.getDb()

  db.collection("orders").remove(query,function(err, results) {
    if (err) throw err;
    console.log(results.result.n +" document deleted");
    
  });
  res.writeHead(200);
  res.end(JSON.stringify("Done!"))
  }


module.exports.insertOrders=insertOrders
module.exports.deleteOrders=deleteOrders
module.exports.findOrderItems=findOrderItems