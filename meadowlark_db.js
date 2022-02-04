var app = require('express')();

var credentials = require('./credentials');

var handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.set('env', 'development');


var Question = require('./models/questions');

var mongoose = require('mongoose'); 
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString);
        console.log(app.get('env'));
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString);
        console.log(app.get('env'));
        break; 
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

console.log("at line 29");
Question.find({}, function(err, questions){ 
    if(err){
        console.log(err);
    }
    console.log("Inside find function");
    if(questions.length > 0) 
        return;
    new Question({
        id: "dnjkbgjbvdsbvhd",
        attachment: "",
        level: 3,
       question: "Capital of India is:",
       options: ["Delhi", "Mumbai", "Kolkata", "Chandigarh"],
       answer: "Delhi",

    }).save();
    new Question({
        id: "dnjkbgjbvdsbvhd",
        attachment: "",
        level: 3,
       question: "Capital of Haryana is:",
       options: ["Delhi", "Mumbai", "Kolkata", "Chandigarh"],
       answer: "Chandigarh",

    }).save();
    new Question({
        id: "dnjkbgjbvdsbvhd",
        attachment: "",
        level: 3,
       question: "Capital of Punjab is:",
       options: ["Delhi", "Mumbai", "Kolkata", "Chandigarh"],
       answer: "Chandigarh",

    }).save();
    
    
   });
   app.get('/questions', function(req, res){
       console.log('Insilde get function /questions');
    Question.find({},
         function(err, questions){
            if(err){
                console.log(err);
             }
            console.log(questions);
            var context = {
            questions: questions.map(function(question){
                return {
                    question : question.question,
                    answer: question.answer,
                    options: question.options,
                }
             })
            };
            console.log(context);
             res.render('questions', context);
 
         });
             
    console.log("route working");
            });
           
app.listen(3000, function(){
    console.log('listening on 3000');
});
