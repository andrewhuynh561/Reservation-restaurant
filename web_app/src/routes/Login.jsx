import React, {useContext,useState, useEffect} from "react";
import bcrypt from 'bcryptjs-react'
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../LoginContext";
import './Login.css'

function Login() {
  document.body.id = 'H';
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const loggedInCopy = loggedIn;
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
      try {
        console.log(userName);
        const response = await fetch(`http://localhost:6060/login/${userName}/customer`); 
   
        if (!response.ok) {
          throw new Error(`Failed to fetch info for: ${userName}`);
        }
   
        const responseBody = await response.json();
        console.log(responseBody);
        const accID = responseBody.accountDetails.accountID
        const accPw = responseBody.accountDetails.password
        
        bcrypt.compare(password, accPw, function(err, res) {
          if(res){
            console.log("valid", accID);
            var logjson = {
              accountID: accID,
              customer: true,
              state: responseBody
            }
            setLoggedIn(logjson); // sets login state - will be avalible via context to all routes
            navigate("/");
          }
          else {
            //need to add response feature
            console.log("Nah wrong password");
          }
        });

      } catch (error) {
        console.error(error);
      }
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
        console.log(responseBody.password);
        console.log(password);
        
        bcrypt.compare(password, responseBody.password, function(err, res) {
          if(res){
            console.log("valid", responseBody.accountID);
            var logjson = {
              accountID: responseBody.accountID,
              customer: false,
              state: responseBody
            }
            setLoggedIn(logjson);
            var logjson = {
              accountID: responseBody.accountID,
              customer: false
            }
            setLoggedIn(logjson);
            navigate("/");
          }
          else {
            //need to add response feature
            console.log(responseBody.password);
            console.log("Nah wrong password");
          }
        });

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
          <button type="button" className="mt-2 btn btn-primary" onClick={handleLoginChange}>Staff login</button>
        </div>
      );
    }
    else {
      return(
        <div>
          <button type="button" className="mt-4 btn btn-primary" onClick={handleLoginChange}>Customer login</button>
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
            <label className="label-style mb-2" style={{color:"white"}}>User Name</label>
            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="User Name" value={userName} onChange={handleUserNameChange}></input> 
            
          </div>

          <div className="form-group mt-3 mb-3">
            <label className="label-style mb-2" style={{color:"white"}}>Password</label>
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassChange}></input>
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
