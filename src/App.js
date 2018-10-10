import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, Hint, LineMarkSeries} from 'react-vis';
import resalePriceIndexHDB from './DataApi/resalePriceIndexHDB'
import privateResidentialPriceIndexURA from './DataApi/privateResidentialPriceIndexURA'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResalePriceIndexHDB: [],
      PrivateResidentialPriceIndexURA: [],
      value: null,
      PRPI: true,
      HRPI: true
  }
  this._rememberValue = this._rememberValue.bind(this)
  this._forgetValue = this._forgetValue.bind(this)
  this.toggleHRPI = this.toggleHRPI.bind(this)
  this.togglePRPI = this.togglePRPI.bind(this)
}

  async componentDidMount(){
    try{
      const HDBrpiItems = await resalePriceIndexHDB()
      this.setState({ResalePriceIndexHDB:HDBrpiItems})
      const PRPindexItems = await privateResidentialPriceIndexURA()
      this.setState({PrivateResidentialPriceIndexURA:PRPindexItems})
    } catch (error) {throw error}
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
  render() {
    const {value} = this.state
    const HDBrpi = this.state.ResalePriceIndexHDB.map((item)=> {
      return {x: item.quarter, y: parseFloat(item.index)}
    })
    const PRPindex = this.state.PrivateResidentialPriceIndexURA.map((item)=> {
      return {x: item.quarter, y: parseFloat(item.value)}
    });
    return (
      <div className="App">
        <h2>Property Price Indices</h2>
        <h4>Base 100% - 2009-Q1</h4>
        <XYPlot height={400} width={350} xType="ordinal">
          <LineSeries data={PRPindex} onNearestXY={this._rememberValue} />        
          <LineSeries data={HDBrpi} onNearestXY={this._rememberValue} />        
          <XAxis title="Quarterty Data" tickValues={(PRPindex.length > 15) ? PRPindex.filter((item, idx) => {
                  return ((idx % Math.floor(PRPindex.length / 5)) === 0)? item.x :""
                }).map(item => (item.x))
              : HDBrpi.map(item => (item.x))}/>
          <YAxis title="Price Index" />
          {value ? <Hint value={value} /> : null}
        </XYPlot>
        <table>
          <tbody>
           <tr>
             <td><input type="checkbox" checked={this.state.PRPI} onChange={this.togglePRPI}/>Private Residential Price Index</td>
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.HRPI} onChange={this.toggleHRPI}/>HDB Resale Price Index</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
