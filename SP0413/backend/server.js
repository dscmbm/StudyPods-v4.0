const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Todo = require("./models/Todo");
const Transaction = require("./models/Transaction");

const cors = require("cors");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Connect to MongoDB
const mongoURI =
  "mongodb+srv://yuvvrajsinghhrathore:D74rajpcdARqiuTJ@cluster0.owsctzu.mongodb.net/studypods";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Signin endpoint
app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token, redirectTo: "/home" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing in");
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const tokenWithoutPrefix = token.split(" ")[1];
    const decoded = jwt.verify(tokenWithoutPrefix, "your_secret_key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid Token");
  }
};

// Todo List endpoints
app.post("/api/todos", verifyToken, async (req, res) => {
  try {
    const { taskInput, date } = req.body;
    const newTodo = new Todo({
      taskInput,
      date,
      userId: req.userId,
    });
    await newTodo.save();
    res.status(201).send("Todo created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating todo");
  }
});

app.get("/api/todos", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching todos");
  }
});

// Marking a task as done or pending endpoint
app.post("/api/todos/:id/done", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send("Task not found");
    }

    // Toggle the status between "Done" and "Pending"
    todo.status = todo.status === "Pending" ? "Done" : "Pending";
    await todo.save();
    res.status(200).send(`Task status toggled to ${todo.status} successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error toggling task status");
  }
});

// Deleting a specific task endpoint
app.delete("/api/todos/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send("Task not found");
    }
    await Todo.deleteOne({ _id: id });
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting task");
  }
});

// Deleting all tasks endpoint
app.delete("/api/todos", verifyToken, async (req, res) => {
  try {
    await Todo.deleteMany({ userId: req.userId });
    res.status(200).send("All tasks deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting all tasks");
  }
});

// Update a specific task endpoint
app.put("/api/todos/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { taskInput, date } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send("Task not found");
    }

    // Update task properties if provided in request body
    if (taskInput) {
      todo.taskInput = taskInput;
    }
    if (date) {
      todo.date = date;
    }

    await todo.save();
    res.status(200).send("Task updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating task");
  }
});

// Create Transaction
app.post("/api/transactions", verifyToken, async (req, res) => {
  try {
    const { description, amount, date, incomeOrExpense } = req.body;
    const newTransaction = new Transaction({
      description,
      amount,
      date,
      incomeOrExpense,
      userId: req.userId,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating transaction");
  }
});

// Read Transactions
app.get("/api/transactions", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching transactions");
  }
});

// Delete Transaction
app.delete("/api/transactions/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).send("Transaction not found");
    }
    res.json(deletedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting transaction");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
