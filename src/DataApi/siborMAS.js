export default async function sibor() {  
    const response = await fetch(
      "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=b5adb5c2-4604-49f3-b924-b69691252380&limit=318"
    );
    const data = await response.json();
    return data.result.records.filter((item)=>{
      return item.end_of_month.endsWith("01") || item.end_of_month.endsWith("4") || item.end_of_month.endsWith("7") || item.end_of_month.endsWith("10")
    })
    .map((item)=> {
      return {x: `${item.end_of_month.slice(0,4)}-${item.end_of_month.endsWith("1")?"Q1":item.end_of_month.endsWith("4")?"Q2":item.end_of_month.endsWith("7")?"Q3":"Q4"}`, y:`${item.interbank_1m*20}`}
    });
  }
