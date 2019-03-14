import React, { useState } from 'react';

const Form = () => {
  //destructured useState returns array (state, fn for updating state)
  const [text, setText] = useState({ age: '', birth: '', residence: '' });
  const [checked, setChecked] = useState(false);
  const [formData, submitFormData] = useState([]);

  const handleText = e => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = e => {
    e.preventDefault();
    window.alert(JSON.stringify({ id: Date.now(), content: { text, checked } }, null, 4));
    submitFormData(prevForm => [...prevForm, { id: Date.now(), content: { text, checked } }]);
    setText({ age: '', birth: '', residence: '' });
  };

  return (
    <section>
      <ul>
        {text.age && <li> text.age</li>}
        {text.birth && <li>{text.birth}</li>}
        {text.residence && <li>{text.residence}</li>}
        <li>{checked.toString()}</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <label>Words I associate with sustainability?</label>
        <input type="checkbox" value={checked} onChange={handleCheckbox} autoFocus />
        <label>My age</label>
        <input name="age" type="number" value={text.age} onChange={e => handleText(e)} />
        <label>My country of birth</label>
        <input name="birth" type="text" value={text.birth} onChange={e => handleText(e)} />
        <label>My country of residence</label>
        <input name="residence" type="text" value={text.residence} onChange={e => handleText(e)} />
        <button type="submit">I am done</button>
      </form>
    </section>
  );
};

export default Form;
