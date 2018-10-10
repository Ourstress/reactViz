import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, Hint, LineMarkSeries} from 'react-vis';
import resalePriceIndexHDB from './DataApi/resalePriceIndexHDB'
import privateResidentialPriceIndexURA from './DataApi/privateResidentialPriceIndexURA'
import sibor from './DataApi/consumerPriceIndex'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ResalePriceIndexHDB: [],
      PrivateResidentialPriceIndexURA: [],
      sibor: [],
      value: null,
      PRPI: true,
      HRPI: true,
      markedSeries: false
  }
  this._rememberValue = this._rememberValue.bind(this)
  this._forgetValue = this._forgetValue.bind(this)
  this.toggleHRPI = this.toggleHRPI.bind(this)
  this.togglePRPI = this.togglePRPI.bind(this)
  this.toggleMarkSeries = this.toggleMarkSeries.bind(this)
}

  async componentDidMount(){
    try{
      const HDBrpiItems = await resalePriceIndexHDB()
      this.setState({ResalePriceIndexHDB:HDBrpiItems})
      const PRPindexItems = await privateResidentialPriceIndexURA()
      this.setState({PrivateResidentialPriceIndexURA:PRPindexItems})
      const Siboritems = await sibor()
      this.setState({sibor: Siboritems})
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
  toggleMarkSeries() {
    this.setState({
      markedSeries: !this.state.markedSeries
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
    const SIBORindex = this.state.sibor.filter((item)=>{
      return item.end_of_month.endsWith("1") || item.end_of_month.endsWith("4") || item.end_of_month.endsWith("7") || item.end_of_month.endsWith("10")
    })
    .map((item)=> {
      return {x: `${item.end_of_month.slice(0,4)}-${item.end_of_month.endsWith("1")?"Q1":item.end_of_month.endsWith("4")?"Q2":item.end_of_month.endsWith("7")?"Q3":"Q4"}`, y:item.sgs_repo_overnight_rate}
    });
    return (
      <div className="App">
        <h2>Property Price Indices</h2>
        <h4>Base 100% - 2009-Q1</h4>
        <table>
          <tbody>
           <tr>
             <td><input type="checkbox" checked={this.state.PRPI} onChange={this.togglePRPI}/>Private Residential Property Price Index</td>
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.HRPI} onChange={this.toggleHRPI}/>HDB Resale Price Index</td>  
            </tr>
            <tr>
            <td><input type="checkbox" checked={this.state.markedSeries} onChange={this.toggleMarkSeries}/>Show Data Points</td>  
            </tr>
          </tbody>
        </table>
        <XYPlot height={400} width={350} xType="ordinal">
          {this.state.PRPI===true && this.state.markedSeries===false && <LineSeries data={PRPindex} onNearestXY={this._rememberValue} />}        
          {this.state.HRPI===true && this.state.markedSeries===false && <LineSeries data={HDBrpi} onNearestXY={this._rememberValue} />}        
          {this.state.PRPI===true && this.state.markedSeries===true && <LineMarkSeries data={PRPindex} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue}/>}        
          {this.state.HRPI===true && this.state.markedSeries===true && <LineMarkSeries data={HDBrpi} onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue}/>}        
          <LineMarkSeries data={SIBORindex}/>        
          <XAxis title="Data by Quarter" tickValues={(PRPindex.length > 15) ? PRPindex.filter((item, idx) => {
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
