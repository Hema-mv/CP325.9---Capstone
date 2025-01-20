import { useState } from "react";
import SignUpForm from "../components/SignupForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import '../styles/auth.css'; 
function AuthPage(props) {
  const [signUp, setSignUp] = useState(true);

  function togglePage() {
    setSignUp(!signUp);
  }

  return (
    <html><body>
      <div class="signup-wrapper">
    <div className="signupcontainer">
      <h1></h1>
      <>
        {signUp ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      Or go here to:
      <br />
      <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
    </div>
    </div>
    </body>
    </html>
  );
}

export default AuthPage;