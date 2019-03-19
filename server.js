const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 5007;
const formRouter = require('./server/routes/formRoutes/formRoutes');

app.use(morgan('dev'));

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

// REST API end points under '/'
app.use('/api/formData', formRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
