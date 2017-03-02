var mongoose    =   require("mongoose");
mongoose.createConnection('mongodb://localhost:27017/swJokes');

var mongoSchema =   mongoose.Schema;
var jokeSchema  = {
    "setup" : String,
    "punchline": String,
    "rating": String
};

module.exports = mongoose.model('jokes', jokeSchema);