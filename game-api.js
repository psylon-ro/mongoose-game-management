const path= require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('./src/db/mongoose.js')
const Game =require('./src/models/game.js')

const app = express();
const port = 3000;



app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/public/new-game.html');                                                                       
})

app.get('/games', (req, res) => {
    Game.find({}).then((games)=>{
        res.send(games)
    }).catch((e)=>{
        res.status(500).send()  
    })
});

app.get('/topgames', (req, res) => {
    Game.find({}).sort({Rating:-1}).limit(3).then((games)=>{
        res.send(games)
    }).catch((e)=>{
        res.status(500).send()  
    })
});

app.get('/achievementgames', (req, res) => {
    Game.find({Achievements: ['Game master', 'Speed Demon']}).then((games)=>{
        res.send(games)
    }).catch((e)=>{
        res.status(500).send()  
    })
});

app.get('/gamelist', (req, res) => {
    res.sendFile(__dirname+'/public/game-list.html');
});

app.post('/game', (req, res) => {
    // We will be coding here
    const game= new Game(req.body)
    game.save().then(()=>{
        res.status(201).sendFile(__dirname+'/public/game-submitted.html'); 
    }).catch((e)=>{
        res.status(400).send(e)
    })
    // Output the game to the console for debugging
});

app.get('/gamelist/:name', (req, res) => {
    // Reading isbn from the URL
    const name= req.params.name;
    // Searching games for the isbn
    Game.findOne({Title: name}).then((game)=>{
        if(!game){
            return res.status(404).send('game not found')
        }
         res.json(game)
    }).catch((e)=>{
        res.status(500).send()
    })
   
});

app.delete('/gamelist/:id', (req, res) => {
    // Reading isbn from the URL
    const _id = req.params.id;

    // Remove item from the games array
    Game.findByIdAndRemove(_id).then((game)=>{
        res.send('Game is deleted');
    }).catch((e)=>{
        console.log(e)
    })
});

app.post('/gamelist/:id', (req, res) => {
    // Reading isbn from the URL
    const _id = req.params.id;
    const newGame = req.body;
    console.log(newGame)
    // edit item from the games array
     Game.findByIdAndUpdate(_id,newGame).then((newgamee)=>{
        res.sendFile(__dirname+'/public/game-edited.html');
    }).catch((e)=>{
        console.log('e: ',e)
    })  
});


app.post('/gamelistupdate/:id', (req, res) => {
    // Reading isbn from the URL
    const _id = req.params.id;
    const newarray = req.body;
    console.log(newarray)
    // edit item from the games array
     Game.updateOne({_id},{Achievements:newarray}).then((newgamee)=>{
    console.log(newgamee)
        res.send('achievements added by update method');
    }).catch((e)=>{
        console.log('e: ',e)
    })
});

app.post('/gamelistsave/:id', async (req, res) => {
    // Reading isbn from the URL
    const _id = req.params.id;
    const newarray = req.body;
     const game = await Game.findOne({_id});
     game.Achievements=newarray
     game.save().then((newgamee)=>{
        res.send('achievements added by save method');
        }).catch((e)=>{
        console.log('e: ',e)
    }) 
});

app.listen(port, () => console.log(`listening on port ${port}!`));