import React, { useState, useCallback } from 'react';
import Popup from './Popup';
import {signUp} from '../services/APICommunication';

const defaultFromData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const [formData, setFromData] = useState(defaultFromData);
  //const [errorMessage, setErrorMessage] = useState('');
  const [popup, setPopup] = useState('');
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
      setPopup({messageType: 'Error', message: 'Passwords must match.'});
      return;
    }
    //send data
    try {
      const res = await signUp(formData);
      if (res.status === 'Success'){
        setFromData(defaultFromData);
        setPopup({messageType: 'Success', message: `Account created successfully 😊`});
      } else {
        setPopup({messageType: 'Error', message: res.message});
      }
    } catch (error){
      setPopup({messageType: 'Error', message: `🙁 Oops something went wrong... ${error}`});
    }

  }, [formData]);

  return (
    <div className='SignUp'>
      <Popup popup={popup} setPopup={setPopup}/>
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
