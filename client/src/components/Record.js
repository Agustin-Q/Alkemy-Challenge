function Record(props) {
  
  return (
    <div className="Record">
      <div className="RecordInfo">
        <p className="RecordType">{props.record.type}</p>
        <p>{props.record.category}</p>
        <p>{props.record.description}</p>
      </div>
      <div className="RecordAmount">
        <h1>{props.record.type === 'Debit' && '-'}${props.record.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</h1>
      </div>
      <div className="RecordButton">
      <button className="RecordButton">Edit</button>
      <button className="RecordButton">Del</button>
      </div>
    </div>  
  );
}

export default Record