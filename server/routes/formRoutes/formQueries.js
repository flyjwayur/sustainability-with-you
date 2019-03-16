const { pool } = require('../../config/keys');

const getAllFormData = (req, res) => {
  pool.query('SELECT * FROM formData ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ title: 'Internal server error', name: err.name, message: err.message });
    }
    res.status(200).json(results.rows);
  });
};

const addFormData = (req, res) => {
  console.log('req.body', req.body);
  // const { content } = req.body;
  // const { age, birth, residence } = content.text;
  // const country_birth = birth;
  // const country_residence = residence;
  // const words = content.checked;
  const { id, words, age, country_birth, country_residence } = req.body;
  console.log('add -variable', id, words, age, country_birth, country_residence);
  pool.query(
    'INSERT INTO formData (words, age, country_birth, country_residence) VALUES ($1 $2)',
    [words, age, country_birth, country_residence],
    (error, results) => {
      if (error) {
        console.log('addFormData error');
      }
      res.status(201).send(`id,${id}`);
      console.log('added');
    }
  );
};

module.exports = {
  getAllFormData,
  addFormData,
};
