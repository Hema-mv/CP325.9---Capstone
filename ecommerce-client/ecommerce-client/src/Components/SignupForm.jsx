import { useState } from "react";
// adding in auth, i am importing SignUp from utilities
import { signUp } from "../utilities/users-service";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // ** this is where we will eventually add this to our database
    // but through utilities/user - services (so im making util functions to handle api)
    try {
      // set this up to be able to add a new user
      const submitData = { ...formData };
      delete submitData.confirmPassword;
      console.log(submitData);
      const user = await signUp(submitData);
      console.log(user);
      props.setUser(user);
    } catch (err) {
      // ! later add messages based on what actually failed
      setError("Sign up failed - try again");
    }
  };

  return (
    <>
     
      <div className="signup-form">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <br/>
          <label>Display Name:</label>  <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Display Name"
            required
          />
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email address will be your login"
            required
          />
          <br />
          <label>Password</label>  <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Display password"
            required
          />
          <br />
          <label>Confirm Password</label>  <br />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Must match password"
            required
          />
          <br />
          <button
            type="submit"
            disabled={formData.password !== formData.confirmPassword}
          >
            SIGN UP now
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;