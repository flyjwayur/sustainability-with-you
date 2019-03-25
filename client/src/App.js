import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.scss';

class App extends Component {
  state = {
    formData: [],
  };

  componentDidMount() {
    axios
      .get('/api/formData')
      .then(res => {
        const formData = res.data;
        this.setState({ formData });
        console.log('allfectchedData', formData);
      })
      .catch(err => console.log('get response error'));

    M.updateTextFields();
  }

  render() {
    const countAnswers = this.state.formData.length;

    return (
      <div className="app">
        <Header />
        <Main />
        <Footer countAnswers={countAnswers} />
      </div>
    );
  }
}

export default App;
