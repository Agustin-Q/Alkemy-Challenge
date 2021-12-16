import React, { useState, useCallback } from 'react';
import Popup from './Popup';

const defaultFromData = {
  email: '',
  password: '',
};

async function logIn(account){
  try {
    const url = 'http://localhost:5000/api/v0/login';
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account) // body data type must match "Content-Type" header
    });
    const parsedResponse = await response.json();
    return parsedResponse;
    
  } catch (error) {
    throw error;
  }
}

function LogIn() {
  const [formData, setFromData] = useState(defaultFromData);
  const [popup, setPopup] = useState('');
  const onFormChange = useCallback((event) => {
    setFromData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }, [formData]);

  const formSubmitted = useCallback(async (event) =>{
    event.preventDefault();
    //send data
    try{
    const res = await logIn(formData);
      if (res.status === 'Success'){
      setPopup({messageType: 'Success', message: `Login Success, Token: ${res.token}`});
      setFromData(defaultFromData);
      localStorage.setItem('Token', res.token);
      } else {
        setPopup({messageType: 'Error', message: `🙁 Oops something went wrong... ${res.message}`});
      }
    }catch (error){
      setPopup({messageType: 'Error', message: `🙁 Oops something went wrong... ${error}`});
    }
  }, [formData]);

  return (
    <div className='SignUp'>
      <Popup popup={popup} setPopup={setPopup}/>
      <h1>Log In</h1>
      <form onSubmit={formSubmitted}>
       <label htmlFor="email">e-mail</label>
       <input type="email" id="email" name="email" value={formData.email} onChange={onFormChange} required></input>
       <label htmlFor="password">Password</label>
       <input type="password" id="password" name="password" value={formData.password} onChange={onFormChange} required></input>
       <button>Log In</button>
     </form>
    </div>
  );
}

export default LogIn;
