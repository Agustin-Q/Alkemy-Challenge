/**
 * Gets balance for an account.
 * Account id is taken form JWT token in local storage 'Token' item.
 * @returns {Number} Balance for the account.
 */
export async function getBalance(){
  try {
    const url = 'http://localhost:5000/api/v0/balance';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
    });
    const parsedResponse = await response.json();
    return parsedResponse.balance;
  } catch(error){
    throw error
  }
}

/**
 * Gets the last 5 records for an account.
 * Account id is taken form JWT token in local storage 'Token' item.
 * @returns {Object[]} Returns an array of records objects.
 */
export async function getRecords(){
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch(error){
    throw error;
  }
}

/**
 * Deletes a record from database.
 * @param {number} id - Id of the record to delete
 * @returns {Object[]} Returns an array of records objects.
 */
export async function deleteRecord(id){
  console.log(`Delete! Record with id ${id}`);
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify({'id' : id})
    });
    const parsedResponse = await response.json();
    if (response.status === 200){
      return parsedResponse;
    } else {
      return parsedResponse;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Adds or updates record in database.
 * Account id is taken form JWT token in local storage 'Token' item.
 * @param {Object} newRecord- record object
 * @param {number} newRecord.id - [Optional] if present will update the record if not will create a new one.
 * @param {number} newRecord.amount - amount for the record.
 * @param {string} newRecord.type - Type of the record, allowed values ['Debit', 'Credit']
 * @param {string} newRecord.category - [Optional] Category of the record
 * @param {string} newRecord.description - [Optional] Description for the record 
 * @returns {Object} Returns an array of records objects.
 */
export async function sendNewRecord(newRecord){
  let method = 'POST';
  if(newRecord.id) method = 'Put';
  try {
    const url = 'http://localhost:5000/api/v0/record';
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify(newRecord) 
    });

    const parsedResponse = await response.json();
    if (response.status === 200){
      return parsedResponse;
    } else {
      return parsedResponse;
    }
  } catch (error) {
    throw error;
  }
}