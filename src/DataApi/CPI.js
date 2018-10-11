const axios = require('axios');

export default async function CPI() {  
    const response = await axios(
      "http://www.tablebuilder.singstat.gov.sg/publicfacing/rest/timeseries/tabledata/15092?variables=M212191.1&offset=168"
    );
   return response.data.records;
  }
