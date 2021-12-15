import { useCallback, useEffect, useState } from "react";

const defaultFormData = {
  amount: '',
  category: '',
  description: '',
  type: 'Debit'};

async function sendNewRecord(newRecord){
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify(newRecord) // body data type must match "Content-Type" header
    });

    const parsedResponse = await response.json();
    console.log(response.status);
    if (response.status === 200){
      //setMessageType('Success');
      //setErrorMessage('Success-Message');
      //setPopup({messageType: 'Success', message: `Login Success, Token: ${parsedResponse.token}`});
      console.log(parsedResponse);
    } else {
      //setErrorMessage(parsedResponse.message);
      //setPopup({messageType: 'Error', message: parsedResponse.message});
    }
  } catch (error) {
    //setErrorMessage('🙁 Oops something went wrong...');
    //setPopup({messageType: 'Error', message: `🙁 Oops something went wrong... ${error}`});
  }
}
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
  },[formData]);
  if(props.hidden){
    return '';
  } else {
  return (
      <div className="NewRecord">
        <form onSubmit={onFormSubmit}>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={formData.type} onChange={onFormChange}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <label htmlFor="amount" required>Amount</label>
        <input type="text" id="amount" name="amount" value={formData.amount} onChange={onFormChange} required></input>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={onFormChange}></input>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={onFormChange}></input>
        <button>Add</button>
        </form>
      </div>  
  );
  }
}

export default NewRecord