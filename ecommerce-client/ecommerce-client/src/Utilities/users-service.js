import * as userAPI from "./users-api";


// I need to pass in userData because this is attempting to add a new user to the database
export async function signUp(userData) {
  // delegate the network request code to the users-api.js API module
  // which will ultimately return JWT
  const token = await userAPI.signUp(userData);
  console.log(token);
  // for now, we will console.log the token to see that it exists and return the name and email that was sent to us we will also eventually save the token in localStorage
  localStorage.setItem("token", token)
  return {
    name: userData.name,
    email: userData.email,
  };
}
export async function login(credentials) {
  // delegate the network request code to the users-api.js API module
  // which will ultimately return JWT
  const token = await userAPI.login(credentials);
  // for now, we will console.log the token to see that it exists and return the name and email that was sent to us we will also eventually save the token in localStorage
  localStorage.setItem("token", token)

  return getUser();
}
export function getToken() {
  // getItem return null if there is no string in the key 'token' or the key doesn't exist
  const token= localStorage.getItem("token");
 
  if(!token) return null;
  //obtain the payload of the token
  const payload=JSON.parse(atob(token.split('.')[1]));
  //check if the token is expired
  // A JWT's expiration is expressed in milliseconds, not seconds,so convert
  if(payload.exp<Date.now()/1000){
    // token has expired and we remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}
export function getUser(){
  
  const token=getToken();

  return token?JSON.parse(atob(token.split('.')[1])).user:null;
}
export function logOut(){
  localStorage.removeItem("token");
}

export default {login, signUp, logOut, getUser, getToken};

