const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://upendra99bhanushali:upendra99bhanushali@cluster0.rga8mvy.mongodb.net/game-manager-api?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err,db)=>{
    if(err) throw err;
    console.log('connected');
})





 

