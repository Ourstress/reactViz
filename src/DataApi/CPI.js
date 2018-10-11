const axios = require('axios');

export default async function CPI() {  
    const response = await axios(
      "http://www.tablebuilder.singstat.gov.sg/publicfacing/rest/timeseries/tabledata/15092?variables=M212191.1&offset=168"
    );
   return response.data.records.filter((item)=>{
    return item.time.endsWith("Jan") || item.time.endsWith("Apr") || item.time.endsWith("Jul") || item.time.endsWith("Oct")
    })
    .map((item)=> {
    return {x: `${item.time.slice(0,4)}-${item.time.endsWith("Jan")?"Q1":item.time.endsWith("Apr")?"Q2":item.time.endsWith("Jul")?"Q3":"Q4"}`, y:`${item.value*100/85.937}`}
    });
  }
