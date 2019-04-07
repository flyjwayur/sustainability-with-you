const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 5004;
const formRouter = require('./server/routes/formRoutes/formRoutes');

const app = express();
app.use(morgan('dev'));

// BodyParser decode data in different formats.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// REST API end points under '/'
app.use('/api/formData', formRouter);

//The catchall handler : if some request that does not match, send back React's index.html file
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
