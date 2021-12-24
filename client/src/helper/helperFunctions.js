import jwt from "jsonwebtoken";

export function getUserName(){
  if(localStorage.getItem('Token')){
  return jwt.decode(localStorage.getItem('Token')).name;
  } else {
    return "Not logged in"
  }
}