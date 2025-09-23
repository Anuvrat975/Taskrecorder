const mongoose = require('mongoose')

const tmodel = new mongoose.Schema({

    tname:{
        type: String,
        required: false
    },
    start:{
        type: Date,
        required: false
    },
    end:{
        type:Date,
        required: false
    }
})

module.exports.getUserTaskModel = (username)=>{
    const collectionName = username || 'def.0'
    return mongoose.model(collectionName, tmodel)//collection name will be same as username
}
//A model is a class that we use to create and read documents from the collection.
//The first argument is the name of the collection, and the second argument is the schema that 