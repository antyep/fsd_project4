import express, { Application } from "express";
import router from "./router";

const app: Application = express();

app.use(express.json());

app.use(router);

app.get('/api', (req, res) => {
    res.send('kd api')
  })

export default app;
