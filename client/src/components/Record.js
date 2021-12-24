import { useCallback, useState } from "react";
import { deleteRecord } from "../services/RecordsAPI";
import NewRecord from "./NewRecord";

function Record(props) {
  const [editRecordHidden, setEditRecordHidden] = useState(true);
  const onClickDelete = useCallback(async() => {   
    await deleteRecord(props.record.id);
    props.onDeleteRecord();
  },[props]);

  const onClickEdit = useCallback(() => {
    setEditRecordHidden(false);
  },[]);

  const onNewRecord = useCallback(() => {
    setEditRecordHidden(true);
    props.onDeleteRecord();
  },[props]);
  
  return (
    <div className="Record">
      <NewRecord hidden={editRecordHidden} onNewRecord={onNewRecord} record={props.record} type={'edit'}></NewRecord>
      <div className="RecordInfo">
        <p className="RecordType">{props.record.type}</p>
        <p>{props.record.category}</p>
        <p>{props.record.description}</p>
        <p>{props.record.date.split('T')[0]}</p>
      </div>
      <div className="RecordAmount">
        <h1>{props.record.type === 'Debit' && '-'}${props.record.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</h1>
      </div>
      <div className="RecordButton">
        <button className="RecordButton" onClick={onClickEdit}>
          <span class="material-icons">edit</span>
        </button>
        <button className="RecordButton" onClick={onClickDelete}>
          <span class="material-icons">delete_outline</span>
        </button>
      </div>
    </div>  
  );
}

export default Record