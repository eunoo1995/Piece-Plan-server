const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8090;

// cors 해결을 위한 미들웨어 사용
// const ALLOW_LIST = ["http://localhost:5500"];

// const corsOptions = {
//   origin(origin, callback) {
//     if (ALLOW_LIST.includes(origin)) callback(null, true);
//     else callback(new Error("Not Allowed Origin!"));
//   },
// };

app.use(cors());
app.use(express.json());

let todos = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];

// REST API
// callback에 인수로 req와 res가 온다.
// req는 클라이언트의 요청을 담고있고, res는 응답을 보낼 때 사용

app.get("/", (req, res) => {
  res.send("asdfas");
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos = [newTodo, ...todos];

  res.send(todos);
});

// listen (port번호, callback) - 언제올지 모르는 요청을 위해 무한루프를 돌며 켜져있어야 한다.
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
