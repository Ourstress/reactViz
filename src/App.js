import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, MarkSeries, XAxis, YAxis, Hint} from 'react-vis';
import ResalePriceIndexHDB from './DataApi/ResalePriceIndexHDB'
import PrivateResidentialPriceIndexURA from './DataApi/PrivateResidentialPriceIndexURA'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResalePriceIndexHDB: [],
      PrivateResidentialPriceIndexURA: [],
      value: null
  }
  this._rememberValue = this._rememberValue.bind(this)
  this._forgetValue = this._forgetValue.bind(this)
}

  async componentDidMount(){
    try{
      const HDBrpiItems = await ResalePriceIndexHDB()
      this.setState({ResalePriceIndexHDB:HDBrpiItems})
      const PRPindexItems = await PrivateResidentialPriceIndexURA()
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
        <h2>HDB Resale Price Index</h2>
        <h4>Base 100% - 2009-Q1</h4>
        <XYPlot height={400} width={350} xType="ordinal">
          <MarkSeries data={PRPindex} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue}/>
          <MarkSeries data={HDBrpi} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue}/>
          <XAxis title="Quarterty Data" tickValues={(PRPindex.length > 15) ? PRPindex.filter((item, idx) => {
                  return ((idx % Math.floor(PRPindex.length / 5)) === 0)? item.x :""
                }).map(item => (item.x))
              : HDBrpi.map(item => (item.x))}/>
          <YAxis title="Price Index" />
          {value ? <Hint value={value} /> : null}
        </XYPlot>
      </div>
    );
  }
}

export default App;
