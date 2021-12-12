import React, { useState, useCallback } from 'react';
import Popup from './Popup';

const defaultFromData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const [formData, setFromData] = useState(defaultFromData);
  const [errorMessage, setErrorMessage] = useState('');
  const onFormChange = useCallback((event) => {
    setFromData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }, [formData]);

  const formSubmitted = useCallback(async (event) =>{
    event.preventDefault();
    //verify confirmPass
    if(formData.password === formData.confirmPassword){
      delete formData.confirmPassword; //remove confirm password to send to api
    } else {
      // no hacer nada\
      setErrorMessage('Passwords must match.');
      return;
    }
    //send data
    try {
      const url = 'http://localhost:5000/api/v0/account';
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // body data type must match "Content-Type" header
      });

      const parsedResponse = await response.json();
      if (parsedResponse.status === 'Success'){
        setFromData(defaultFromData);
      } else {
        setErrorMessage(parsedResponse.message);
      }
    } catch (error) {
      setErrorMessage('🙁 Oops something went wrong...');
    }
  }, [formData]);

  return (
    <div className='SignUp'>
      {errorMessage && <Popup message={errorMessage} setMessage={setErrorMessage}/>}
      <h1>SignUp</h1>
      <form onSubmit={formSubmitted}>
       <label htmlFor="name">Name</label>
       <input type="text" id="name" name="name" value={formData.name} onChange={onFormChange} required></input>
       <label htmlFor="email">e-mail</label>
       <input type="email" id="email" name="email" value={formData.email} onChange={onFormChange} required></input>
       <label htmlFor="password">Password</label>
       <input type="password" id="password" name="password" value={formData.password} onChange={onFormChange} required></input>
       <label htmlFor="confirmPassword">Confirm password</label>
       <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={onFormChange} required></input>
       <button>Sign Up</button>
     </form>
    </div>
  );
}

export default SignUp;
