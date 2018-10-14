const axios = require('axios');

const privateResidentialPriceIndexURA = async () => {  
  const response = await axios(
    "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=947b5cbe-0b0a-4fdb-b06e-aca1e34d87fd"
  );
  return response.data.result.records.map((item)=> {
    return {x: item.quarter, y: parseFloat(item.value)}
  });
}

export default privateResidentialPriceIndexURA