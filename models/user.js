var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/swJokes');

var mongoSchema =   mongoose.Schema;
var userSchema  = {
	"userid" : Number,
    "name" : String,
    "email" : String,
    "password" : String,
    "favmovie": String
};

module.exports = mongoose.model('users', userSchema);