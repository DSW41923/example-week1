/**
 * @overview
 *
 * @author DSW
 * @version 2014/05/02
 */

var http = require("http");
var port = 1337;
var request = require("request");
var fs =require("fs")
var url = "http://graph.facebook.com/HornyDragonTW/photos?type=uploaded";
var template = "";

/*fs.readFile("./index.html", "UTF-8", function (err, result) {
            template = result;
            });*/

//same as/*~*/
template = fs.readFileSync("./index.html", "UTF-8");

http.createServer(function (req, res) {
  res.writeHeader(200, {"Content-Type": "text/html"});
  
  var data = "";
  request.get(url, function (err, body, response) {

    response = JSON.parse(response);
    response.data.forEach(function (val, idx) {
      data += "<img src='" + val.images[2].source + "'width=400 height=400 / >";
    });
    
    data = template.replace("{{context}}", data);
    res.end(data);
  });

}).listen(port);

console.log("start server port: " + port);

