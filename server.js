require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Проверка, что сервер жив
app.get("/", (req, res) => {
  res.send("Hello!");
});

const queryRoutes = require("./routes/queryRouter");
const procedureRoutes = require("./routes/procedureRouter");
const functionRoutes = require("./routes/functionRouter"); // камиль добавил

//работа с обычными запросами БД
app.use("/api/query", queryRoutes);

//работа с хранимыми процедурами БД
app.use("/api/procedure", procedureRoutes);

//камиль добавил
//работа с пользовательскими функциями БД
app.use("/api/function", functionRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен! http://localhost:${port}`);
});