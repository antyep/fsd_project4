import express, { Application } from "express";
import router from "./router";
import cors  from 'cors';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.get('/api', (req, res) => {
    res.send('kd api')
  })

export default app;
