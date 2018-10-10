export default async function resalePriceIndexHDB() {  
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=52e93430-01b7-4de0-80df-bc83d0afed40"
    );
    const data = await response.json();
    return data.result.records;
  }
