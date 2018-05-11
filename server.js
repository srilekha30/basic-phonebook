var mysql=require('mysql');
var connec=mysql.createConnection({
    host:'localhost',
    database:'contacts',
    user:'root',
    password:'srilekha306'
});
connec.connect(function(err){

    if(err) throw err;
    console.log('connected');

var http = require('http');
var fs = require('fs');
var formidable = require("formidable");


var server = http.createServer(function (req, res) {
    if (req.url == '/html1') {
        processAllFieldsOfTheForm(req, res);
        
    } else if(req.url == '/html2'){
        processAllFieldsOfTheForm2(req, res);
    }
    else{
        displayForm(res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}



function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('received the data you have entered:\n\n');
        var name=fields.name;
        var number=fields.number;
        var ctr='insert into phonebook values("'+name+'","'+number+'");';
        connec.query(ctr,function(err,result){
            if(err) throw err;
        });
        res.end();
    });
}



function processAllFieldsOfTheForm2(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.write('<h1><center><font color="blue"><b><i>Phone Number is/are:</i></b></font></center></h1><br>');
        var name2=fields.name1;
        var que='select * from phonebook where name="'+name2+'";';
        connec.query(que,function(err,result){
            if(err) throw err;
            for(i=0;i<result.length;i++)
            res.write('<h2><center>'+result[i].number+'</center></h2> <br>');
            res.end();
        });
    });
}


server.listen(1155);
});