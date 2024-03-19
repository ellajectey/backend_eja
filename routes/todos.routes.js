import { Router } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Todo from "../models/todo";

dotenv.config({path:['.env.local']});

const router = Router();

const url = process.env.MONGO_URI;

                                    
const client = new MongoClient(url);
const todoDb = 'todo-db';
const todoCollection ='todos';


//define routes 
router.post('/todos', async (req,res) => {
    //connect mongodb client
    await client.connect();

    // Get access to todo database
    const db = client.db(todoDb);

    // Get access to todos collection
    const collection = db.collection(todoCollection);

    // Add to do document to todos collection
    const result = await collection.insertOne({
        ...req.body,
        isCompleted: false,
        createdAt: new Date()
    
    });

    // Disconnect mongodb client
    await client.close();

    // Return response
    res.json(result);
});

router.get('/todos', async (req,res) => {
    //connect mongodb client
    await client.connect();
    
  
    // Get access to todo database
    const db = client.db(todoDb);

    // Get access to todos collection
    const collection = db.collection(todoCollection);

    // Find all todos collection
    const limit = parseInt(req.query.limit) || 10;
    const result = await collection.find({}).limit(limit).toArray();
    
    // Disconnect mongodb client
    await client.close();

    // Return response
    res.send(result);
});

// delete todos
router.delete('/todos', async (req,res) => {
    //connect mongodb client
    await client.connect();

    // Get access to todo database
    const db = client.db(todoDb);

    // Get access to todos collection
    const collection = db.collection(todoCollection);

    // Add to do document to todos collection
    const deleteResult = await collection.deleteMany({});

    // Disconnect mongodb client
    await client.close();

    // Return response
    res.json(deleteResult);
});


// Define routes
router.post('/todos', (req, res) => {
    res.json(req.body);
});

router.get('/todos', (req, res) => {
    res.send('Get all todos!');
});

router.delete('/todos', (req, res) => {
    res.send('Delete all todos!');
});

router.get('/todos/:id', (req,res) => {
    res.send (`Get todo with id: ${req.params.id}`);
});

router.patch('/todos/:id', (req,res) => {
    res.send (`Update todo with id: ${req.params.id}`);
});

router.delete('/todos/:id', (req,res) => {
    res.send (`Delete todo with id: ${req.params.id}`);
});

// Export router
export default router;