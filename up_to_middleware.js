
var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();




var handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine); 
app.use(require('body-parser')());
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);




app.use(express.static(__dirname + '/public'));

console.log(__dirname + '/public');

var fortunes = [
    "Conquer your fears or they will conquer you.", "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.", "Whenever possible, keep it simple.",
    ];
    

app.get('/newsletter', function(req, res){
// we will learn about CSRF later...for now, we just
// provide a dummy value
res.render('newsletter', { csrf: 'CSRF token goes here' });
});
app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
     console.log('CSRF token (from hidden form field): ' + req.body._csrf);
      console.log('Name (from visible form field): ' + req.body.name); 
      console.log('Email (from visible form field): ' + req.body.email); 
      res.redirect(303, '/thank-you');
});
app.get('/thank-you', function(req, res) { res.render('home');
});

app.get('/', function(req, res) { res.render('home');
});

    app.get('/about', function(req, res){ var randomFortune =
   
   fortunes[Math.floor(Math.random() * fortunes.length)];
   console.log(randomFortune);
    res.render('about', { fortune: randomFortune });
});

app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s='';
    for(var name in req.headers) 
        s += name + ': ' + req.headers[name] + '\n';
    res.render('home', {body: s});
    });


// 404 catch-all handler (middleware)
app.use(function(req, res, next){ res.status(404);
res.render('404');
});
    // 500 error handler (middleware)
app.use(function(err, req, res, next){ console.error(err.stack);
res.status(500); res.render('500');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' ); });