var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var User     	=   require("./models/user");
var Joke        =   require("./models/joke");
var Reaction    =   require("./models/reactionpics");
var router      =   express.Router();
var multer = require('multer'),
    path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var newFileName = Date.now();
        if (file.mimetype == "image/gif"){
            newFileName += ".gif";
        }  
        else if (file.mimetype == "image/png"){
            newFileName += ".png";
        }
        else if (file.mimetype == "image/jpg"){
            newFileName += ".jpg";
        }
        cb(null, newFileName);
  }
});

// Rendering the view
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/reactions/add",function(req,res){
    res.render('index.html');
});
 
app.post('/reactions/add', multer({storage: storage}).single('upl'), function(req,res){
    console.log(req.body); 
    console.log(req.file);
    res.status(204).end();
});


router.route("/reactions")
    .get(function(req, res){
        // Display all reactions pics
        var response = {};
        Reaction.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(multer({storage: storage}).single('upl'), function(req, res){
        // Submit a reaction
        var newReactionModel = new Reaction();
        var response = {};
        newReactionModel.title = req.body.title;
        newReactionModel.character = req.body.character;
        newReactionModel.emotion = req.body.emotion;      
        newReactionModel.file = req.file.path;     
        newReactionModel.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
// 

router.route("/reactions/:id")
    .get(function(req, res){
        // Display individual reaction pic
        var response = {};
        Reaction.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })

    // .put(function(req, res){
    //     // Update reaction
    //     var response = {};
    //     Reaction.findById(req.params.id,function(err,data){
    //         if(err) {
    //             response = {"error" : true,"message" : "Error fetching data"};
    //         } else {
    //             if(req.body.character !== undefined) {
    //                 data.character = req.body.character;
    //             }  
    //             if(req.body.emotion !== undefined) {
    //                 data.emotion = req.body.emotion;
    //             }                            
    //             if(req.body.title !== undefined) {
    //                 data.title = req.body.title;
    //             }     
    //             // if(req.body.file !== undefined) {
    //             //     data.file = req.body.file;
    //             // }   
    //             data.save(function(err){
    //                 if(err) {
    //                     response = {"error" : true,"message" : "Error updating data"};
    //                 } else {
    //                     response = {"error" : false,"message" : "Data is updated for "+req.params.id};
    //                 }
    //                 res.json(response);
    //             })
    //         }
    //     });
    // })

    .delete(function(req, res){
        // Delete Reaction
        var response = {};
        Reaction.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                Reaction.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
// 



















router.route("/jokes")
    .get(function(req, res){
        // Display all jokes
        var response = {};
        Joke.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })

    .post(function(req, res){
        // Create a joke
        var newJokeModel = new Joke();
        var response = {};
        newJokeModel.setup = req.body.setup;
        newJokeModel.punchline = req.body.punchline;        
        newJokeModel.rating = req.body.rating;        
        newJokeModel.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
// 

router.route("/jokes/:id")
    .get(function(req, res){
        // Display individual joke
        var response = {};
        Joke.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req, res){
        // Update joke
        var response = {};
        Joke.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.setup !== undefined) {
                    data.setup = req.body.setup;
                }  
                if(req.body.punchline !== undefined) {
                    data.punchline = req.body.punchline;
                }                            
                if(req.body.rating !== undefined) {
                    data.rating = req.body.rating;
                }     
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req, res){
        // Delete Joke
        var response = {};
        Joke.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                Joke.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
// 





















router.route("/users")
    .get(function(req,res){
        var response = {};
        User.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var newUserModel = new User();
        var response = {};
        newUserModel.name = req.body.name;
        newUserModel.email = req.body.email;
        newUserModel.favmovie = req.body.favmovie;        
        newUserModel.password = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
        newUserModel.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
// 

router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.email !== undefined) {
                    data.email = req.body.email;
                }
                if(req.body.password !== undefined) {
                    data.password = req.body.password;
                }
                if (req.body.name !== undefined) {
                	data.name = req.body.name;
                }
                if (req.body.favmovie !== undefined) {
                    data.name = req.body.favmovie;
                }                
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                User.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })
// 

app.use('/', router);

app.listen(8080);
console.log("Listening to port 8080");