const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// BodyParser decode data in different formats.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ info: ' Postgresql DB, Express & Nodejs App' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
