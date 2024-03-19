import  express  from "express";
import todosRoutes from "./routes/todos.routes.js"
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";

// create express app
const app = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

await mongoose.connect(process.env.MONGO_URI);
// Use routes
app.use(todosRoutes);

// Listen for incoming requests
app.listen(4000, () => {
    console.log("Express app is running!")
});