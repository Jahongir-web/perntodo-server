const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db")

// Middleware
app.use(cors())
app.use(express.json())  // req body

//  Routes

// Create a todo

app.post("/todos", async(req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query("insert into todo (description) values($1) returning *", [description]);
    res.json(newTodo.rows[0])

  } catch (err) {
    console.error(err.message)
  }
})

// Get all todos
app.get("/todos", async(req, res) => {
  try {
    const allTodos = await pool.query("select * from todo")
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message);
  }
})

// Get a todo
app.get("/todos/:id", async(req, res) => {
  try {
    const {id} = req.params
    const todo = await pool.query("select * from todo where todo_id = $1", [id])

    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message);
  }
})

// update a todo
app.put("/todos/:id", async(req, res) => {
  try {
    const {id} = req.params
    const { description } = req.body

    const updateTodo = await pool.query("update todo set description = $1 where todo_id = $2", [description, id])

    res.json("todo was update")
  } catch (err) {
    console.error(err.message);
  }
})

// Delete a todo
app.delete("/todos/:id", async(req, res) => {
  try {
    const {id} = req.params

    const deleteTodo = await pool.query("delete from todo where todo_id = $1", [id])

    res.json("todo was deleted!")
  } catch (err) {
    console.error(err.message);
  }
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))