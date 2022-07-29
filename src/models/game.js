const mongoose = require('mongoose')


const Game= mongoose.model('Game',{
    Title:{
       type: String,
       required:true,
       trim:true
    }, 
    Genre:{
        type: String,
        required:true,
        trim:true,
    },
    
    Rating:{
        type: Number,
        default:0,
        trim:true,
        min: 0, 
        max: 100,
        validate(value){
            if(value<0 || value>100){
                throw new Error('please enter a number between 0 and 100')
            }
        }
    },

    Achievements:{
        type: Array,
        trim:true,
        default: ['No achievements']
    }
})

module.exports= Game