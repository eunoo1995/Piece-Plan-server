const express = require("express");

// 서버 모듈
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8090;

// static 요청이 들어오면 서버의 루트 폴더를 지정하고 거기서 찾는다.
app.use(express.static("public"));
app.use(express.json());

let { todos, a } = require("./mock.js");

// REST API
// callback에 인수로 req와 res가 온다.
// req는 클라이언트의 요청을 담고있고, res는 응답을 보낼 때 사용

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos = [newTodo, ...todos];
  console.log(todos);
  res.send(todos);
});

app.patch("/todos", (req, res) => {
  const { completed } = req.body;
  todos = todos.map((todo) => ({ ...todo, completed }));
  res.send(todos);
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  todos = todos.map((todo) => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== +id);
  res.send(todos);
});

app.delete("/todos", (req, res) => {
  const completed = JSON.parse(req.query.completed);
  todos = todos.filter((todo) => todo.completed !== completed);
  res.send(todos);
});

// listen (port번호, callback) - 언제올지 모르는 요청을 위해 무한루프를 돌며 켜져있어야 한다.
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
