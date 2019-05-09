import express from 'express';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});