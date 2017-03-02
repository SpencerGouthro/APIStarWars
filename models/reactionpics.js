var mongoose    =   require("mongoose");
mongoose.createConnection('mongodb://localhost:27017/swJokes');

var mongoSchema =   mongoose.Schema;
var reactionSchema  = {
    "character" : String,
    "emotion" : String,
    "title" : String,    
    "file" : String
};

module.exports = mongoose.model('reactionpics', reactionSchema);