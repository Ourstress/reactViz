export default async function sibor() {  
    const response = await fetch(
      "http://www.tablebuilder.singstat.gov.sg/publicfacing/rest/timeseries/tabledata/15092?variables=M212191.1&offset=168"
    );
    const data = await response.json();
    return data.records;
  }
