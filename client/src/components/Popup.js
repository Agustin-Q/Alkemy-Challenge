import React, {useCallback} from 'react';

function Popup(prop){
  const closePopup = useCallback(() => {
    prop.setPopup({messageType: '', message: ''});
  });
  console.log(prop);
  if(prop.popup.message !=="" && prop.popup.message){
    return (
      <div className={`Popup ${prop.popup.messageType}`}>
        <p className="Popup">
          {prop.popup.message}
        </p>
        <button className="Popup" onClick={closePopup}>X</button>
      </div>
    );
  } else{
    return '';
  }
}

export default Popup;