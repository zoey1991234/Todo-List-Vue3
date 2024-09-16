const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors 中間件

const app = express();
const port = 3000;

// 連接到 MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(bodyParser.json());
app.use(cors()); // 啟用 cors

// 根路由
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Todo API!</h1>');
});

// 取得所有的待辦事項
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// 新增待辦事項
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      name: req.body.name,
      completed: false
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error adding todo' });
  }
});

// 刪除待辦事項
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

// 更新待辦事項
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
