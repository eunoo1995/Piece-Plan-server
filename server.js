const express = require("express");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8090;

// session 설정
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  logErrors: true,
});

app.use(
  session({
    store: new RedisStore({ client }),
    secret: "SADG1348FSDAf3fSadf31as",
    resave: false,
    saveUninitialized: true,
  })
);

// cors 해결을 위한 미들웨어 사용
const ALLOW_LIST = ["http://localhost:5500", "https://piece-plan-server.herokuapp.com"];

app.use(cors({ origin: ALLOW_LIST }));
app.use(express.json());

// mock 데이터 사용
let { todos } = require("./mock.js");

// REST API
// callback에 인수로 req와 res가 온다.
// req는 클라이언트의 요청을 담고있고, res는 응답을 보낼 때 사용

app.get("/", (req, res) => {
  const session = req.session;

  if (session.user) res.send("로그인 했음");
  else res.send("로그인 안했음");
});

// 세션 테스트

app.get("/login", (req, res) => {
  const session = req.session;
  if (session && session.user) {
    res.send("이미 로그인중");
  } else {
    session.user = "홍길동";
    res.send("홍길동님 환영합니다.");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Session Destroyed!");
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
