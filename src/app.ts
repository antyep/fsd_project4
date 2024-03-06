import express, { Application } from "express";
import router from "./router";

const app: Application = express();

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', '*');
  res.header(
    'Accesss-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.get('/api', (req, res) => {
    res.send('kd api')
  })

export default app;
