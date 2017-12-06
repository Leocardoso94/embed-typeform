import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Respostas />
      </div>
    );
  }
}

class Respostas extends Component {
  constructor(props) {
    super(props);

    const url = 'https://api.typeform.com/v1/form/w0Rz15?key=d28cdc6a50c5eda4aa514f5086f35c2a34076728';

    this.state = { responses: [] };


    this.callApi(url);

    
  }

  callApi(url) {
    const vm = this;

    setInterval(() => {
      axios.get(url)
      .then(function (response) {

        vm.getResponse(response.data.responses);

      })
      .catch(function (error) {
        console.log(error);
      });

    }, 2000);
    
  }

  getResponse(responses = []) {
    const completedResponses = responses.filter(response => response.completed === '1');

    this.setState({ responses: completedResponses })
  }



  renderResponses() {
    return this.state.responses.map(response => {
      const answers = response.answers;

      return (
        <div key={response.token}>
          <hr />
          <p>Firstname: {answers.textfield_B3KGXLywn5IE}</p>
          <p>Lastname:  {answers.textfield_B3KGXLywn5IE}</p>
          <p>Country:   {answers.dropdown_mR4kddSYTmbE}</p>
          <p>Email:     {answers.email_uyoj6Xan5W1W}</p>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <h2>Respostas</h2>
        {this.renderResponses()}
      </div>
    )
  }
}


export default App;
