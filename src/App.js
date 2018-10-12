import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import Chart from './display/Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Property Market Indices</h2>
        <h4>Base 100% - 2009-Q1</h4>
        <Chart/>
      </div>
    );
  }
}
export default App;
