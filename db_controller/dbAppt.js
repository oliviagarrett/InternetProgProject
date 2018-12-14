var server=require("../pServer.js")

function makeAppt(res,data)
{
  var db=server.getDb()
  console.log(data)
  info=data
  //var cart=info[0]
  var appInfo=info[0]
  var currentDate= new Date()
  var records=[]
  //console.log("cart:"+cart.toString())
  console.log("appInfo:"+appInfo.toString())
    for(i in cart)
    {
   //   item=cart[i]
     
     // tPrice=item.price *item.quantity
      var record={first:appInfo[0].first,
                  last:appInfo[1].last,
                  email:appInfo[2].email,
                  number:appInfo[3].number,
                  drop_off:appInfo[4].drop_off,
                  pick_up:appInfo[5].pick_up,
                  date: currentDate
                }
      records.push(record)
      console.log(record)
    }
  db.collection("appointments").insertMany(records, function (err, result) {
    if(err)
       console.log(err)
    else
    {
    console.log("insert: "+result.insertedCount)
    res.writeHead(200);
    res.end("Your appointment is booked!")
    }
  })
    
}