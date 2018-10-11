export default async function sibor() {  
    const response = await fetch(
      "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=b5adb5c2-4604-49f3-b924-b69691252380&limit=318"
    );
    const data = await response.json();
    return data.result.records;
  }
