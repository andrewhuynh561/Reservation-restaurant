import React, {useState} from "react";
import bcrypt from 'bcryptjs-react'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  document.body.id = 'H';
  const navigate = useNavigate();

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
        console.log(responseBody.password);
        console.log(password);
        
        bcrypt.compare(password, responseBody.password, function(err, res) {
          if(res){
            console.log("valid", responseBody.accountID);
            navigate(`/account/${responseBody.accountID}`, {state: true, replace: true}); 
          }
          else {
            //need to add response feature
            console.log(responseBody.password);
            console.log(valid, "Nah wrong password");
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
            navigate(`/dashboard/${responseBody.accountID}`, {state: true, replace: true});
          }
          else {
            //need to add response feature
            console.log(responseBody.password);
            console.log(valid, "Nah wrong password");
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

//DO NOT TOUCH
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//         console.log(hash);
//     });
// });

// bcrypt.compare(password, hash, function(err, res) {
//   console.log(res);
// });

export default Login
