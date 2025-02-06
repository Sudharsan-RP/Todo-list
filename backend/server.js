const  express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

//db connection
mongoose.connect('mongodb://localhost:27017/todo')
  .then(() => console.log('db connected successfully'))
  .catch((err) => console.log('db connection error :' + err));

//schema creation
const todoSchema = new mongoose.Schema({
  todoText: {
    type: String,
    required: true
  },
  todoDate: {
    type: String,
    required: true
  }
})

//model creation
const Todo = mongoose.model('Todo', todoSchema)

//post request
app.post('/todo', async(req, res) => {
  const { todoText, todoDate } = req.body;
  try {
    const todo = new Todo({ todoText, todoDate });
    await todo.save();

    res.status(201).json({
      message: 'todo added successfully'
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.listen(3000, () => {
  console.log(`server running on port http://localhost:${3000}`)
})