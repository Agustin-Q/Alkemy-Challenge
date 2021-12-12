import { useEffect, useState } from "react";
import NewRecord from "./NewRecord";
import Record from "./Record";

async function getBalance(){
  try {
    const url = 'http://localhost:5000/api/v0/balance';
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
    });
    const parsedResponse = await response.json();
    return parsedResponse.balance;
  } catch(error){
    console.log(error);
  }
}

async function getRecords(){
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
    });
    const parsedResponse = await response.json();
    console.log('get records', parsedResponse);
    return parsedResponse;
  } catch(error){
    console.log(error);
  }
}

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [records, setRecords] = useState([]);
  useEffect(() => {
    (async function(){
      setBalance((await getBalance()).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}));
    })();
    (async function(){
      const newRecords = await getRecords();
      setRecords(newRecords);
    })();
  }, []);
  return (
    <div className="Home">
      <h1>📊 Dashboard 📊</h1>
      <h1>Balance</h1>
      <h1>${balance}</h1>
      <h1>Create Record</h1>
      <NewRecord></NewRecord>
      <h1>Records</h1>
      <div className="RecordArea">
      {records.map((element) =>{
        return(
          <Record record={element} key={element.id}></Record>
        )
      })}
      </div>
    </div>
  );
}

export default Dashboard