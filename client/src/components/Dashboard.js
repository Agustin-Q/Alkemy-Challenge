import { useCallback, useEffect, useState } from "react";
import NewRecord from "./NewRecord";
import Record from "./Record";
import jwt from "jsonwebtoken";
import { getBalance, getRecords } from "../services/RecordsAPI";

function getUserName(){
return jwt.decode(localStorage.getItem('Token')).name;
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
    getRecordsAndBalance(setBalance,setRecords);
    setNewRecordHidden(true);
  },[]);

  const onCreateNewRecord = useCallback(() => {
    setNewRecordHidden(false);
  },[]);

  const updateDashboard = useCallback(()=> {
    getRecordsAndBalance(setBalance,setRecords);
  },[]);

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
            <Record record={element} key={element.id} onDeleteRecord={updateDashboard}></Record>
          )
        })}
      </div>
      <div><button className="DownArrowButton"></button></div>
    </div>
  );
}

export default Dashboard