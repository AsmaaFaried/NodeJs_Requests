var http =require('http');
var fs=require('fs');

////////   Run HTML Files//////////

// res.writeHead(200,{'content-type':'text/html'});
// var login=fs.readFileSync("login.html");
// //recomended
// res.write(login)
// res.end();
// console.log(req.url);
http.createServer(function(req,res){

    console.log("Request Method: ",req.method);
    console.log("Server Loading....")

    //// load home page ////

    if(req.url==='/' && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'});
        var home=fs.readFileSync("home.html");
        //recomended
        res.write(home)
        res.end();
        
    }
    //// load login page ////
    else if(req.url ==='/login' && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'});
        var login=fs.readFileSync("login.html");
        //recomended
        res.write(login)
        res.end();  
    }
     //// load sign up page ////
     else if(req.url ==='/signup' && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'});
        var signup=fs.readFileSync("signup.html");
        //recomended
        res.write(signup)
        res.end();  
    }
    //// load profile page ////
    else if(req.url ==='/profile' && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'});
        var profile=fs.readFileSync("profile.html");
        //recomended
        res.write(profile)
        res.end();  
    }
    else{
        res.writeHead(404);
        res.write("Error page not found");
        res.end();
    }
   
}).listen(3000);

