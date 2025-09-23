const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const { getUserTaskModel } = require('./Models/DB');
const {setUnamefunc} = require('./utils.js')

app.use(cors())
app.use(express.json())

try{    
    mongoose.connect('mongodb+srv://root:root@cluster0.hetakbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
catch(err){
    console.error('Error connecting to MongoDB:', err);
}


const uri = 'mongodb+srv://root:root@cluster0.hetakbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new mongoose.mongo.MongoClient(uri)


app.get('/', (req,res)=>{
    res.send('This is the backend')
})



app.post('/login', async (req, res) => {
    const { uname, pwd } = req.body;
    const db = client.db('test');
    const collection = db.collection('users');
    
    try {
        const user = await collection.findOne({ username: uname, password: pwd });
        
        if (user) {
            const userCollections = await db.listCollections({name: uname}).toArray();
            
            if (userCollections.length === 0) {
                await db.createCollection(uname);
                console.log(`Created collection for user: ${uname}`);
            }
            return res.status(200).json({ 
                message: 'Login successful', 
                response: user 
            });
        } else {
            return res.status(401).json({ message: 'Login failed' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { uname, pass } = req.body;
        if (!uname || !pass) {
            return res.status(400).json({ 
                error: 'Username and password are required' 
            });
        }        
        const db = client.db('test');
        const collection = db.collection('users');        
        const user = await collection.findOne({ username: uname });        
        if (user) {
            return res.status(400).json({ 
                error: 'Username already exists'
            });
        } else {
            const insertResult = await collection.insertOne({ 
                username: uname, 
                password: pass 
            });
            
            return res.status(201).json({ 
                message: 'Signup successful', 
                response: insertResult 
            });
        }
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});


app.get('/gettasks/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const db = client.db('test');
        const TaskModel = getUserTaskModel(username);
    
        const tasks = await TaskModel.find();
        return res.json(tasks);
    } catch (err) {
        console.error('Get tasks error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/addtask/:username', async(req, res)=>{
    try {
        // Check if req.body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is empty' });
        }          
        const{username} = req.params
        const {task, s2, e2} = req.body;
        const TaskModel = getUserTaskModel(username);
         const newTask = new TaskModel({
            tname: task,
            start: s2,
            end: e2        
        });
        await newTask.save();
        
        res.json({ message: 'Task added successfully'});
        
    } catch(err) {
        res.status(500).json({ error: 'Internal server error' });
    }   
 
})



app.post('/deltask/:username', async (req, res)=>{
    try{
        var {selected} = req.body
        const {username} = req.params
        const TaskModel = getUserTaskModel(username)
        if (!selected || selected.length === 0) {
            return res.status(400).json({ error: 'No tasks selected for deletion' });
        }
    const objectIds = selected
      .filter(id => mongoose.Types.ObjectId.isValid(id))
      .map(id => mongoose.Types.ObjectId.createFromHexString(id));        
        //const result = await tschema.deleteMany({_id: {$in: objectIds}})
        //const result = await collection.deleteMany({_id: {$in: objectIds}})
        var i=0;
        while(i<objectIds.length){
            //await collection.deleteOne({_id: objectIds[i]})
            await TaskModel.findByIdAndDelete(objectIds[i])
            i++;
        }
        //await tschema.findByIdAndDelete(objectIds)
        res.json({message:'Tasks deleted successfully', deletedCount: result.deletedCount})    
    }
    catch(err){
        //return res.status(500).json({error: 'Internal server error'})
        return res.send(err)
    }
})

app.listen(5000,()=>{console.log('Ready for action,')})