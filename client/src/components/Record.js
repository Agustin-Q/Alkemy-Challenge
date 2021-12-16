import { useCallback, useState } from "react";
import NewRecord from "./NewRecord";

async function deleteRecord(id){
  console.log(`Delete! Record with id ${id}`);
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify({'id' : id}) // body data type must match "Content-Type" header
    });

    const parsedResponse = await response.json();
    console.log(response.status);
    if (response.status === 200){
      console.log('Record Deleted!')
    } else {
      console.log('Delete not successful',parsedResponse.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function Record(props) {
  const [editRecordHidden, setEditRecordHidden] = useState(true);
  const onClickDelete = useCallback(async() => {   
    await deleteRecord(props.record.id);
    props.onDeleteRecord();
  },[props.record.id]);

  const onClickEdit = useCallback(() => {
    console.log('edit');
    setEditRecordHidden(false);
  });

  const onNewRecord = useCallback(() => {
    setEditRecordHidden(true);
    props.onDeleteRecord();
  });
  
  return (
    <div className="Record">
      <NewRecord hidden={editRecordHidden} onNewRecord={onNewRecord} record={props.record} type={'edit'}></NewRecord>
      <div className="RecordInfo">
        <p className="RecordType">{props.record.type}</p>
        <p>{props.record.category}</p>
        <p>{props.record.description}</p>
      </div>
      <div className="RecordAmount">
        <h1>{props.record.type === 'Debit' && '-'}${props.record.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</h1>
      </div>
      <div className="RecordButton">
      <button className="RecordButton" onClick={onClickEdit}>Edit</button>
      <button className="RecordButton" onClick={onClickDelete}>Del</button>
      </div>
    </div>  
  );
}

export default Record