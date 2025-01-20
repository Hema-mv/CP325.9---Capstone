import { useState } from "react";
//import { userService } from "./users-services";
import { login } from "../utilities/users-service";

function LoginForm(props) {

  const [ formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [error, setError] = useState("");
  function handleChange (e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){ 
    e.preventDefault();
    //console.log(formData);
    const credentials={...formData};
    try{
      // The promise returned by the login service method will resolve to the user
      // object included int he payload of the JWT
      const user=await login(credentials);
      console.log('credentials',user)
      props.setUser(user);
      console.log('navigate',user)
      navigate("/products");
      //  const submitData={...formData};
      //   console.log(submitData);
      //   const user=await login(submitData);
      //   console.log(user);
      //   props.setUser(user);   
    }
    catch(err){
      setError("Login failed - try again");
    }
  }
  return(
    <>
      <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>

</>
 );
}
export default LoginForm;