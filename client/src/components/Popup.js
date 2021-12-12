import React, { useState, useCallback, useEffect } from 'react';

function Popup(prop){
  const closePopup = useCallback(() => {
    prop.setMessage('');
  });
  if(prop.message !==""){
    return (
      <div className="Popup">
        <p className="Popup">
          {prop.message}
        </p>
        <button className="Popup" onClick={closePopup}>X</button>
      </div>
    );
  } else{
    return '';
  }
}

export default Popup;