const { pool } = require('../../../db');

const getAllFormData = (req, res) => {
  const queryText = 'SELECT * FROM formData ORDER BY id ASC';
  //For Elephantsql UI,  SELECT id, CAST(words as TEXT), countrybirth, countryresidence FROM formData;
  pool.query(queryText, (error, results) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ title: 'Internal server error', name: error.name, message: error.message });
    }

    res.status(200).json(results.rows);
  });
};

const addFormData = (req, res) => {
  console.log('req.body', req.body);
  const { words, age, countryBirth, countryResidence } = req.body;

  pool.query(
    'INSERT INTO formData (words, age, countryBirth, countryResidence) VALUES ($1, $2, $3, $4) RETURNING *;',
    [JSON.stringify(words), age, countryBirth, countryResidence],
    (error, results) => {
      if (error) {
        return console.log('addFormData error: ', error);
      }
      console.log('results?:', results.rows[0]);
      return res.status(201).send(results.rows[0]);
    }
  );
};

module.exports = {
  getAllFormData,
  addFormData,
};
