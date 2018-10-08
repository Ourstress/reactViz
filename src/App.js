import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, MarkSeries, XAxis, YAxis, Hint} from 'react-vis';
import ResalePriceIndexHDB from './DataApi/ResalePriceIndexHDB.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResalePriceIndexHDB: [],
      value: null
  }
  this._rememberValue = this._rememberValue.bind(this)
  this._forgetValue = this._forgetValue.bind(this)
}

  async componentDidMount(){
    try{
      const HDBrpiItems = await ResalePriceIndexHDB()
      this.setState({ResalePriceIndexHDB:HDBrpiItems})
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
    });
    return (
      <div className="App">
        <XYPlot height={500} width={500} xType="ordinal">
          <MarkSeries data={HDBrpi} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue}/>
          <XAxis tickValues={(HDBrpi.length > 15) ? HDBrpi.filter((item, idx) => {
                  if ((idx % Math.floor(HDBrpi.length / 7)) === 0) {
                    return item.x}
                }).map(item => (item.x))
              : HDBrpi.map(item => (item.x))}/>
          <YAxis />
          {value ? <Hint value={value} /> : null}
        </XYPlot>
      </div>
    );
  }
}

export default App;
