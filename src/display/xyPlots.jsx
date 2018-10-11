import React, { Component } from 'react';
import {XYPlot, LineSeries, XAxis, YAxis, Hint, LineMarkSeries} from 'react-vis';
import CPI from '../DataApi/CPI'
import sibor from '../DataApi/siborMAS'
import privateResidentialPriceIndexURA from '../DataApi/privateResidentialPriceIndexURA'
import resalePriceIndexHDB from '../DataApi/resalePriceIndexHDB'

class XyPlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HDBindex: [],
            PRPindex: [],
            sibor: [],
            CPIitems: [],
            value: null        }    
    }
    
    async componentDidMount(){
        try{
            const HDBrpiItems = await resalePriceIndexHDB()
            this.setState({HDBindex:HDBrpiItems})
            const PRPindexItems = await privateResidentialPriceIndexURA()
            this.setState({PRPindex:PRPindexItems})
            const Siboritems = await sibor()
            this.setState({sibor: Siboritems})            
            const CPIitem = await CPI()
            this.setState({CPIitems: CPIitem})
            } catch (error) {throw error}
      }

    render() {
        const {value,CPIitems,PRPindex,HDBindex,sibor} = this.state
        return (
            <div>
                <XYPlot height={400} width={350} xType="ordinal">
                    <LineSeries data={CPIitems} />
                    <LineSeries data={PRPindex} />
                    <LineSeries data={HDBindex} />
                    <LineSeries data={sibor} />
                    <XAxis title="Data by Quarter" tickValues={(PRPindex.length > 15) ? PRPindex.filter((item, idx) => {
                        return ((idx % Math.floor(PRPindex.length / 5)) === 0)? item.x :""
                        }).map(item => (item.x))
                    : HDBindex.map(item => (item.x))}/>
                    <YAxis title="Price Index" />
                    {value ? <Hint value={value} /> : null}
                </XYPlot>
            </div>
        );
    }
}
export default XyPlots;
