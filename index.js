express = require("express")
port = 2000
fs = require("fs")
request = require("request")
let randomIdGenerator = require("random-id-generator");
bodyParser = require("body-parser")
app = express()
app.use(bodyParser.urlencoded({extended: false}))
function server(res,req){
  if(res.url == "/"){
    req.writeHead(200,{"Content-Type":"text/html"})
    fs.createReadStream("./index.html").pipe(req)
  }else if(res.url == "/script.js"){
    fs.createReadStream("./script.js").pipe(req)
  }else if(res.url == "/style.css"){
    req.writeHead(200,{"Content-Type":"text/css"})
    fs.createReadStream("./style.css").pipe(req)
  }else if(res.url == "/url" && res.method == "POST"){
    request.post("https://url.ashorturl.ml",{json:{website: res.body.url}},function(error,response,body){
      if(error){
        req.write("ERROR")
        req.end()
      }
      if(response == "error"){
        req.write("ERROR")
        req.end()
      }else{
        id = response
        req.write(`https://url.ashorturl.ml/${id.body}`)
        req.end()
      }
    })
  }else if(res.url == "/custom"){
    fs.createReadStream("./custom.html").pipe(req)
  }else if(res.url == "/login.css"){
    req.writeHead(200,{"Content-Type":"text/css"})
    fs.createReadStream("./login.css").pipe(req)
  }else if(res.url == "/login.js"){
    fs.createReadStream("./login.js").pipe(req)
  }else{
    fs.createReadStream("./notfound.html").pipe(req)
  }
}
app.use(bodyParser.urlencoded({extended:false}))
app.use(server)
app.listen(port)