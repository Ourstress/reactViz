export default async function privateResidentialPriceIndexURA() {  
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=947b5cbe-0b0a-4fdb-b06e-aca1e34d87fd"
    );
    const data = await response.json();
    return data.result.records.map((item)=> {
      return {x: item.quarter, y: parseFloat(item.value)}
    });
  }
