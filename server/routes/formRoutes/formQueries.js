const { client } = require('../../../db');

const getAllFormData = (req, res) => {
  const queryText = 'SELECT * FROM public.form_table2 ORDER BY id ASC';
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
  const {
    climate,
    human,
    equality,
    change,
    future,
    global,
    local,
    cancer,
    economy,
    knowledge,
    energy,
    internet,
    system,
    food,
    question,
  } = words;

  client.query(
    'INSERT INTO public.form_table2 (climate,human, equality, change, future, global,local, cancer, economy, knowledge, energy,internet, system, food, question, age, gender, country_birth, country_residence) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15, $16, $17, $18, $19) RETURNING *;',
    [
      climate,
      human,
      equality,
      change,
      future,
      global,
      local,
      cancer,
      economy,
      knowledge,
      energy,
      internet,
      system,
      food,
      question,
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
