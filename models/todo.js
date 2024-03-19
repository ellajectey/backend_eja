import { Schema, model } from "mongoose";

const todoSchema = new Schema({

    title: {type: String, required: true},
    description: {type:String, required: true},
    

});

export default model('todo', todoSchema,'todos');