import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
  const [customerLogin, setCustomerLogin] = useState(true);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = () => {
    setCustomerLogin(!customerLogin);
  }

  const handleUserNameChange = (userName) => {
    setUsername(userName.target.value);
  }

  const handlePassChange = (password) => {
    setPassword(password.target.value);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if(customerLogin) {
      //fill in later
    }
    else {
      try {
        console.log(userName);
        const response = await fetch(`http://localhost:6060/login/${userName}/staff`);
   
        if (!response.ok) {
          throw new Error(`Failed to fetch info for: ${userName}`);
        }
   
        const responseBody = await response.json();
        console.log(responseBody);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const WelcomeMessage = () => {
    if(customerLogin) {
      return(
        <div>
          <h2 style={{color:"white"}}>Welcome to our customer login page</h2>
          <p style={{color:"white"}}>Please enter your user name and password!</p>
        </div>
      );
    }
    else {
      return(
        <div>
          <h2 style={{color:"white"}}>Welcome to our staff login page</h2>
          <p style={{color:"white"}}>Please enter your staff user name and password!</p>
        </div>
      );
    }
  }

  const AfterLinks = () => {
    if(customerLogin) {
      return(
        <div>
          <p className="mt-3"> 
            Don't have an account? &nbsp;
            <Link to={`/signup/`}>Sign up here</Link>
          </p>
          <button type="button" className="staff" onClick={handleLoginChange}>Staff login</button>
        </div>
      );
    }
    else {
      return(
        <div>
          <button type="button" className="staff" onClick={handleLoginChange}>Customer login</button>
        </div>
      );
    }
  }

  return (
    <>
      <WelcomeMessage />
      <div className="row">
        <div className="col-3"></div>

        <form className="col-6">
          <div className="form-group mt-3 mb-3">
            <label className="label-style mb-2" style={{color:"white"}} for="exampleInputEmail1">User Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name" value={userName} onChange={handleUserNameChange}></input> 
            
          </div>

          <div className="form-group mt-3 mb-3">
            <label className="label-style mb-2" style={{color:"white"}} for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePassChange}></input>
          </div>
          <p>Forgot password?</p>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
          
          <AfterLinks />
        </form>
      </div>
    </>
  )
}

export default Login
