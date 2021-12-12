import { useEffect, useState } from "react";
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

function Dashboard() {
  const [balance, setBalance] = useState('');
  useEffect(() => {
    (async function(){
      setBalance((await getBalance()).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}));
    })();
  }, []);
  return (
    <div className="Home">
      <h1>📊 Dashboard 📊</h1>
      <h1>Balance</h1>
      <h1>${balance}</h1>
      <button>Create Record</button>
      <div className="RecordArea">
        <Record/>
      </div>
    </div>
  );
}

export default Dashboard