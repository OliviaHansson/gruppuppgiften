import express from 'express';
import bodyParser from 'body-parser';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});

export default app;
