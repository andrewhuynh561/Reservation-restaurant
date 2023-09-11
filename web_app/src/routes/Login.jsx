
import { Link } from "react-router-dom";
import './Login.css'

function Login() {

  return (
    <>
      <h2 style={{color:"white"}}>Welcome to our login page</h2>
      <p style={{color:"white"}}>Please enter your user name and password!</p>
      <div className="row">
        <div className="col-3"></div>

        <form className="col-6">
          <div className="form-group mt-3 mb-3">
            <label className="label-style mb-2" style={{color:"white"}} for="exampleInputEmail1">User Name</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name"></input> 
            
          </div>

          <div className="form-group mt-3 mb-3">
            <label className="label-style mb-2" style={{color:"white"}} for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
          <p>Forgot password?</p>
          <button type="submit" className="btn btn-primary">Sign in</button>
          <p className="mt-3"> 
            Don't have an account? &nbsp;
            <Link to={`/signup/`}>Sign up here</Link>
          </p>
          
        </form>
      </div>
    </>
  )
}

export default Login
