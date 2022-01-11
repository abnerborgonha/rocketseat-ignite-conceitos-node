const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  if (!username) {
    return response.status(400).json({error: 'Username is required on header'})
  }

  const userAccount = users.filter(user => user.username === username)

  if (!userAccount.length) {
    return response.status(400).json({error: 'User account if not exists'})
  }

  request.userAccount = userAccount

  next()
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const isExistsUsername = users.some((user) => user.username === username);

  if (isExistsUsername) {
    return response.status(400).json({error: 'Username always exists'})
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { userAccount } = request

  const { username } = userAccount
  
  const todos = users.filter(user => user.username === username && user.todos)

  return response.json(todos)
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
