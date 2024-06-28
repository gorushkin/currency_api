import express from 'express';
import { config } from './config';
import { router } from './routes';

const app = express();

const message = `Server is running on port ${config.PORT}`;

app.get('/', function (req, res) {
  res.send({ message });
});

app.use('/api', router);

app.listen(config.PORT, () => {
  console.log(message);
});
