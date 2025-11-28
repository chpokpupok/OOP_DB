require("dotenv").config();

const express = require("express");
const pool = require("./db.js");
const {
  get_faculty,
  get_faculty_by_id,
  add_faculty,
  update_faculty,
  delete_faculty,
} = require("./queries.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Проверка, что сервер жив
app.get("/", (req, res) => {
  res.send("API по факультетам. Используйте /api/faculty");
});

// ---------- GET: все факультеты ----------
app.get("/api/faculty", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(get_faculty);
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/faculty error:", err);
    res.status(500).json({ error: "Ошибка сервера", details: err.message });
  }
});

// ---------- GET: факультет по ID ----------
app.get("/api/faculty/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await pool.connect();
    const result = await client.query(get_faculty_by_id, [id]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Факультет не найден" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/faculty/:id error:", err);
    res.status(500).json({ error: "Ошибка сервера", details: err.message });
  }
});

// ---------- POST: создать факультет ----------
app.post("/api/faculty", async (req, res) => {
  try {
    const { name, dean, phone_number } = req.body;
    const client = await pool.connect();
    const result = await client.query(add_faculty, [
      name,
      dean,
      phone_number,
    ]);
    client.release();

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/faculty error:", err);
    res.status(500).json({ error: "Ошибка сервера", details: err.message });
  }
});

// ---------- PUT: обновить факультет ----------
app.put("/api/faculty/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, dean, phone_number } = req.body;

    const client = await pool.connect();
    const result = await client.query(update_faculty, [
      name,
      dean,
      phone_number,
      id,
    ]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Факультет не найден" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/faculty/:id error:", err);
    res.status(500).json({ error: "Ошибка сервера", details: err.message });
  }
});

// ---------- DELETE: удалить факультет ----------
app.delete("/api/faculty/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const client = await pool.connect();
    const result = await client.query(delete_faculty, [id]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Факультет не найден" });
    }

    res.json({ message: "Факультет удален", deleted: result.rows[0] });
  } catch (err) {
    console.error("DELETE /api/faculty/:id error:", err);
    res.status(500).json({ error: "Ошибка сервера", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен! http://localhost:${port}`);
  console.log("GET    /api/faculty");
  console.log("GET    /api/faculty/:id");
  console.log("POST   /api/faculty");
  console.log("PUT    /api/faculty/:id");
  console.log("DELETE /api/faculty/:id");
});
