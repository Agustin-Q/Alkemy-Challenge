import { useEffect, useState } from "react";

function Record() {
  
  return (
    <div className="Record">
      <div className="RecordInfo">
        <p className="RecordType">Credit</p>
        <p>Salary</p>
        <p>December Salary</p>
      </div>
      <div className="RecordAmount">
        <h1>$1.000,00</h1>
      </div>
      <div className="RecordButton">
      <button className="RecordButton">Edit</button>
      <button className="RecordButton">Del</button>
      </div>
    </div>  
  );
}

export default Record