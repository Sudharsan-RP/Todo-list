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
      todo,
      message: 'todo added successfully'
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

app.get('/todo', async(req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json({
      todo
    })
  } catch (error) {
    res.status(500).json({
      message: 'failed data fetching'
    })
  }
})

app.delete('/todo/:id', async (req, res) => {
  try {
    const removeItem = await Todo.findByIdAndDelete(req.params.id);
    if (!removeItem) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

app.put('/todo/:id', async (req, res) => {
  try {
    const { todoText, todoDate } = req.body
    const updateItem = await Todo.findByIdAndUpdate(req.params.id, { todoText, todoDate }, { new: true })
    if(!updateItem) {
      return res.status(404).json({ message: 'todo not found' })
    }
    res.status(200).json({ updateItem, message: 'updated successfully' })
  } catch (error) {
    res.status(500).json({
      message: 'update failed'
    })
  }
})


app.listen(3000, () => {
  console.log(`server running on port http://localhost:${3000}`)
});