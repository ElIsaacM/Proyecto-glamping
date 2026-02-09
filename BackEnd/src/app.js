import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send("API de SQL Server corriendo");
});

export default app