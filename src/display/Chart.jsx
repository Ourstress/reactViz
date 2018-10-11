import React, { Component } from 'react';
import XyPlots from './xyPlots'
import SimpleMenu from './menu'

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PRPI: true,
            HRPI: true,
            Sibor1mth: false,
            // CPI:false,
            markedSeries: false
        }   
        this.togglePRPI = this.togglePRPI.bind(this)     
        this.toggleHRPI = this.toggleHRPI.bind(this)
        this.toggleSibor1mth = this.toggleSibor1mth.bind(this)
         // this.toggleCPI = this.toggleCPI.bind(this)
        this.toggleMarkSeries = this.toggleMarkSeries.bind(this)
    }
    togglePRPI() {
        this.setState({
          PRPI: !this.state.PRPI
          })
      }
    toggleHRPI() {
        this.setState({
          HRPI: !this.state.HRPI
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
            <div>
                <SimpleMenu togglePRPI={this.togglePRPI} toggleHRPI={this.toggleHRPI} toggleSibor1mth={this.toggleSibor1mth} toggleMarkSeries={this.toggleMarkSeries}/>
                <XyPlots PRPI={this.state.PRPI} HRPI={this.state.HRPI} Sibor1mth={this.state.Sibor1mth} markedSeries={this.state.markedSeries}/>
            </div>
        );
    }
}

export default Chart;
