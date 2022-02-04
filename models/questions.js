var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({ 
        id: String,
        question: String,
        options: [String],
        attachment: String,
        answer: String,
        level: Number
});
questionSchema.methods.getOptions = function(){
return this.options;
}
var Question = mongoose.model('questions', questionSchema); 
module.exports = Question;