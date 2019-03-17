const { pool } = require('../../../db');

const getAllFormData = (req, res) => {
  const queryText = 'SELECT * FROM formData ORDER BY id ASC';
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
  const { id, words, age, countryBirth, countryResidence } = req.body;

  const country_birth = countryBirth;
  const country_residence = countryResidence;
  console.log('type of words', typeof words);
  console.log(id, words, age, country_birth, country_residence);
  pool.query(
    'INSERT INTO formData (words, age, country_birth, country_residence) VALUES ($1, $2, $3, $4) RETURNING *;',
    [JSON.stringify(words), age, country_birth, country_residence],
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
