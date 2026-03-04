<<<<<<< HEAD
import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send("API de SQL Server corriendo");
});

export default app
=======
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de PostgreSQL corriendo");
});

export default app;
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)
