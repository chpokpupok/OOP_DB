require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Проверка, что сервер жив
app.get("/", (req, res) => {
  res.send("API по факультетам. Используйте /api/faculty");
});

const queryRoutes = require("./routes/queryRouter");

//работа с хранимыми процедурами БД
app.use("/api/query", queryRoutes);

const procedureRoutes = require("./routes/procedureRouter");

//работа с хранимыми процедурами БД
app.use("/api/procedure", procedureRoutes);


app.listen(port, () => {
  console.log(`Сервер запущен! http://localhost:${port}`);
});
