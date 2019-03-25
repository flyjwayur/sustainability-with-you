const { client } = require('../../../db');

const getAllFormData = (req, res) => {
  const queryText = 'SELECT * FROM public.form_table ORDER BY id ASC';
  //For cloud DB,
  // SELECT id, CAST(words as TEXT), age, gender, country_birth, country_residence FROM public.form_table;
  // SELECT id, json_each(words), age, gender, country_birth, country_residence
  // FROM public.form_table;
  client.query(queryText, (error, results) => {
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
  const { words, age, gender, countryBirth, countryResidence } = req.body;
  //Create each columns for each word in words;
  const { word0, word1, word2, word3, word4, word5, word6, word7, word8, word9 } = words;

  client.query(
    'INSERT INTO public.form_table (word0, word1, word2, word3, word4, word5, word6, word7, word8, word9, age, gender, country_birth, country_residence) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;',
    [
      word0,
      word1,
      word2,
      word3,
      word4,
      word5,
      word6,
      word7,
      word8,
      word9,
      age,
      gender,
      countryBirth,
      countryResidence,
    ],
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
