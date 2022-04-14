var http = require('http');
var fs = require('fs');

var InsertedData = "";
var server = http.createServer(function (req, res) {
    console.log("Server is running....");
    console.log("Request Method: "+req.method);
    if (req.method === "GET" && req.url==='/signup') {
        res.writeHead(200, { "Content-Type": "text/html" });
        var signup=fs.readFileSync("signup.html");
       res.end(signup);
    }
    else if(req.method === "GET" && req.url==='/'){
        res.writeHead(200, { "Content-Type": "text/html" });
        var home=fs.readFileSync("home.html");
       res.end(home);
    }
    else if(req.method === "GET" && req.url==='/login'){
        res.writeHead(200, { "Content-Type": "text/html" });
        var login=fs.readFileSync("login.html");
       res.end(login);
    }
    else if(req.method === "GET" && req.url==='/profile'){
        res.writeHead(200, { "Content-Type": "text/html" });
        var profile=fs.readFileSync("profile.html");
       res.end(profile);
    }
    else if (req.method === "POST" && req.url==='/signup') {
        req.on('data', (chunk)=>{
            InsertedData+=chunk;
        });
        req.on('end', ()=>{
           fs.readFile('data.json', function (err, fileData) {

                var jsonOfFile = JSON.parse(fileData);
                var InsertedEmail =JSON.parse(InsertedData).email;
                const validEmail = hasValueDeep(jsonOfFile,InsertedEmail);
                console.log("Email: "+validEmail);
                console.log("Json file: "+jsonOfFile);
                if(validEmail)
                {
                  res.write("Email already exists");
                  res.end();
                }else{
                    res.write("Data inserted successfuly");
                 jsonOfFile.push(JSON.parse(InsertedData))
                  res.end();
                }
                fs.writeFile("data.json", JSON.stringify(jsonOfFile),(err)=>{})
           
            });
           
        });
        InsertedData="";
    }
    else if (req.method === "POST" && req.url==='/login') {
    
        
        req.on('data', (chunk)=>{
            InsertedData+=chunk;
        });
        var IsValideEmail=false;
        var IsValidePassword=false;
        req.on('end', ()=>{
           fs.readFile('data.json', function (err, fileData) {

                var jsonOfFile = JSON.parse(fileData);
                var InsertedEmail =JSON.parse(InsertedData).email;
                var InsertedPassword =JSON.parse(InsertedData).password;
                IsValideEmail=hasValueDeep(jsonOfFile,InsertedEmail);
                IsValidePassword=hasValueDeep(jsonOfFile,InsertedPassword);
                if(IsValideEmail && IsValidePassword){
                    res.writeHead(200, { "Content-Type": "text/html" });
                    var profile=fs.readFileSync("profile.html");
                    console.log("User data is correct");
                    res.write(profile);
                    res.end();
                }
                if(!IsValidePassword){
                    res.writeHead(400, { "Content-Type": "text/html" });
                    res.write("You entered wrong password");
                    res.end();
                }
                if(!IsValideEmail){
                    res.writeHead(400, { "Content-Type": "text/html" });
                    res.write("You entered wrong email");
                    res.end();
                }
            });
           
        });
        InsertedData="";
    }else{
        
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("This page not found");
        res.end();
    
    }

}).listen(3000);




/// function implementation /////

function hasValueDeep(json, findValue) {
    const values = Object.values(json);
    let hasValue = values.includes(findValue);
    values.forEach(function(value) {
        if (typeof value === "object") {
            hasValue = hasValue || hasValueDeep(value, findValue);
        }
    })
    return hasValue;
  }