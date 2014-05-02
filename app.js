/**
 * @overview
 *
 * @author DSW
 * @version 2014/05/02
 */

var http = require("http");
var port = 1337;
var request = require("request");
var target = prompt("Please Enter the Name of Target Page(for example: HornyDragonTW):");
var url = "http://graph.facebook.com/" + target + "/photos?type=uploaded";

http.createServer(function (req, res) {
  res.writeHeader(200, {"Content-Type": "text/html"});
  
  var data = "<html><head><style>div{background-color:#3366FF;}h1{text-align:center;color:#FFFFFF;}</style><title>FB PHOTO GET TESTING</title></head><body><div><h1>Here are Photos</h1></div>"
  request.get(url, function (err, body, response) {

    response = JSON.parse(response);
    response.data.forEach(function (val, idx) {
      data += "<img src='" + val.images[2].source + "'width="300" height="300"" + "'>";
    });
    
    data += "</body></html>";
    res.end(data);
  });

}).listen(port);

console.log("start server port: " + port);


