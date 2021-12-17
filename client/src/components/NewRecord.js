import { useCallback, useEffect, useState } from "react";
import { sendNewRecord } from "../services/RecordsAPI";

const defaultFormData = {
  amount: '',
  category: '',
  description: '',
  type: 'Debit'};

function NewRecord(props) {
  const [formData, setFormData] = useState(defaultFormData);

  const onFormChange = useCallback((event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  },[formData]);

  const onFormSubmit = useCallback(async (event) => {
    event.preventDefault();
    let newRecord = formData;
    console.log(newRecord);
    for (const property in newRecord){
      if(!newRecord[property]) delete newRecord[property]; //remove undefined/empty properties
    }
    console.log(newRecord);
    await sendNewRecord(newRecord);
    setFormData(defaultFormData);
    props.onNewRecord(); // send callback to parent component, dashboard
  },[formData, props]);

  const onCloseButton = useCallback(() => {
    setFormData(defaultFormData);
    if(props.onNewRecord) props.onNewRecord();
  },[props]);

  useEffect(() => {
    if(props.record){
      let record = props.record;
      for (let element in record){
        if(!record[element]) record[element] = ''; // if element is null/undefined replace with ''
      }
      setFormData(record);
    }
  },[props.record, props.hidden]);


  if(props.hidden){
    return '';
  } else {
  return (
    <div className="NoPadding">
      <div className="NewRecordGrayArea"></div>
      <div className="NewRecord">
          <form onSubmit={onFormSubmit}>
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={formData.type} onChange={onFormChange}>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
          <label htmlFor="amount" required>Amount</label>
          <input type="number" id="amount" name="amount" value={formData.amount} onChange={onFormChange} required></input>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={onFormChange}></input>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={onFormChange}></input>
          <button type="submit">Add</button><button type="button" onClick={onCloseButton}>Close</button>
          </form>
      </div> 
      </div> 
  );
  }
}

export default NewRecord