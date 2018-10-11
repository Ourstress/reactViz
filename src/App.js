import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import XyPlots from './display/xyPlots'
import SimpleMenu from './display/menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      PRPI: true,
      HRPI: true,
      Sibor1mth: false,
      // CPI:false,
      markedSeries: false
  }
  this._rememberValue = this._rememberValue.bind(this)
  this._forgetValue = this._forgetValue.bind(this)
  this.toggleHRPI = this.toggleHRPI.bind(this)
  this.togglePRPI = this.togglePRPI.bind(this)
  this.toggleSibor1mth = this.toggleSibor1mth.bind(this)
  // this.toggleCPI = this.toggleCPI.bind(this)
  this.toggleMarkSeries = this.toggleMarkSeries.bind(this)
}
  _forgetValue() {
    this.setState({
      value: null
    });
  }

  _rememberValue(value) {
    this.setState({value});
  }
  toggleHRPI() {
    this.setState({
      HRPI: !this.state.HRPI
      })
  }
  togglePRPI() {
    this.setState({
      PRPI: !this.state.PRPI
      })
  }
  toggleSibor1mth() {
    this.setState({
      Sibor1mth: !this.state.Sibor1mth
      })
  }
  // toggleCPI() {
  //   this.setState({
  //     CPI: !this.state.CPI
  //     })
  // }
  toggleMarkSeries() {
    this.setState({
      markedSeries: !this.state.markedSeries
      })
  }
  render() {
    return (
      <div className="App">
        <h2>Property Market Indices</h2>
        <h4>Base 100% - 2009-Q1</h4>
        <SimpleMenu />
        {/* <table>
          <tbody>
           <tr>
             <td><input type="checkbox" checked={this.state.PRPI} onChange={this.togglePRPI}/>Private Residential Property Price Index</td>
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.HRPI} onChange={this.toggleHRPI}/>HDB Resale Price Index</td>  
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.Sibor1mth} onChange={this.toggleSibor1mth}/>Sibor 1-month</td>  
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.CPI} onChange={this.toggleCPI}/>Consumer Price Index</td>  
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.markedSeries} onChange={this.toggleMarkSeries}/>Show Data Points</td>  
            </tr>
          </tbody>
        </table> */}
        <XyPlots/>
      </div>
    );
  }
}

export default App;
