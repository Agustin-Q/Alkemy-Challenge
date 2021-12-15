import { useCallback, useEffect, useState } from "react";
import NewRecord from "./NewRecord";
import Record from "./Record";
import jwt from "jsonwebtoken";

function getUserName(){
return jwt.decode(localStorage.getItem('Token')).name;
}

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

function getRecordsAndBalance(setBalance,setRecords){
  (async function(){
    setBalance((await getBalance()).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}));
  })();
  (async function(){
    const newRecords = await getRecords();
    setRecords(newRecords);
  })();
}

function Dashboard() {
  const [balance, setBalance] = useState('');
  const [records, setRecords] = useState([]);
  const [newRecordHidden, setNewRecordHidden] = useState(true);

  useEffect(() => {
    getRecordsAndBalance(setBalance,setRecords);
  }, []);

  const onNewRecord = useCallback(() => {
    console.log('new Record Callback')
    getRecordsAndBalance(setBalance,setRecords);
    setNewRecordHidden(true);
  });

  const onCreateNewRecord = useCallback(() => {
    setNewRecordHidden(false);
  });

  const onDeleteRecord = useCallback(()=> {
    getRecordsAndBalance(setBalance,setRecords);
  });

  return (
    <div className="Dashboard">
      <h1>📊 Dashboard 📊</h1>
      <h1>{getUserName()}</h1>
      <h1>Balance</h1>
      <h1>${balance}</h1>
      <button onClick={onCreateNewRecord}>Create Record</button>
      <NewRecord hidden={newRecordHidden} onNewRecord={onNewRecord}></NewRecord>
      <h1>Records</h1>
      <div className="RecordArea">
      {records.map((element) =>{
        return(
          <Record record={element} key={element.id} onDeleteRecord={onDeleteRecord}></Record>
        )
      })}
      </div>
      <div><button className="DownArrowButton"></button></div>
    </div>
  );
}

export default Dashboard