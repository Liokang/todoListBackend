const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

mongoose.connect("mongodb+srv://atul2710rawat_db_user:Cx3ztk47lgUtd2le@cluster0.gcivuob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://todo-list-front-theta.vercel.app",
  "http://localhost:3000"   // for local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", async (req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todo", async (req, res)=>{
    const { task } = req.body;
    console.log("Task received:", task);
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json({ message: "Task created", task });
});

app.delete("/delete/:id", async (req, res)=>{
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
});

app.put("/update/:id", async (req, res)=>{
    const { id } = req.params;
    const { task } = req.body;
    await Todo.findByIdAndUpdate(id, { task });
    res.json({ message: "Task updated" });
});

app.listen(PORT, ()=>{
    console.log("Server is running on port :" + PORT);
});

