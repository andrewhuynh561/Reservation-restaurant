import './Login.css'
import React, { useEffect, useState } from "react";
import bcrypt from 'bcryptjs-react'
import "react-datepicker/dist/react-datepicker.css";
import {  useNavigate } from "react-router-dom";
import Modal from "react-modal";

function Signup() {
  document.body.id = 'H';
  const navigate = useNavigate();

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhoneNumb] = useState("");
  
  const [email, setEmail] = useState("");
  const [postCode, setPostCode] = useState("");
  const [username, setUserName] = useState("");

  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);
    navigate(`/login`);

  };

  const createAccount = async (event) => {
    event.preventDefault();

    var hash = bcrypt.hashSync(password, 10);

    const accountData = {
      userName: username,
      password: hash,
      name: fName + " " + lName,
      phone: phone,
      email: email,
      address: street + ";" + suburb + ";" + postCode,
     };
  
     console.log(accountData);
  
     try {
       const response = await fetch(`http://localhost:6060/signup`, {
         method: "POST",
         headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(accountData),
       });
  
       if (!response.ok) {
         throw new Error(`Failed to create account`);
       }
  
       const responseBody = await response.json();
       
       openConfirmationModal();
      //  navigate(`/login`);
     } catch (error) {
       console.error(error);
     }
     

   };
  
  
  return (
    <>
      <h2 style={{color:"white"}}>Create an account with us!</h2>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
              <div className="card-body p-0">
                
                <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Registration Form</b></h3>
                
                <div className="p-3 mb-4 pb-2">
                  
                  <select defaultValue="1" className='form-select'>
                    <option value="1">Title</option>
                    <option value="2">Miss</option>
                    <option value="3">Mrs</option>
                    <option value="4">Ms</option>
                    <option value="5">Mr</option>
                    <option value="6">None</option>
                  </select>
                  
                </div>

                <div className="row p-3">
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">First Name</label>
                      <input type="text" className="form-control form-control-lg" value={fName} placeholder="First Name"
                      onChange={(e)=>(setfName(e.target.value))}></input>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">Last Name</label>
                      <input type="text" className="form-control form-control-lg" value={lName} placeholder="Last Name"
                      onChange={(e)=>(setlName(e.target.value))}></input>
                    </div>
                  </div>
                </div>

                <div className="p-3 mb-4 pb-2">
                  <div className='form-outline form-white'>
                    <label style={{color:"black"}} className="form-label label-style">Street Address</label>
                    <input type="text" className="form-control form-control-lg" value={street} placeholder="Street Address"
                      onChange={(e)=>(setStreet(e.target.value))}></input>
                  </div>

                </div>

                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Post Code</label>
                      <input type="text" className="form-control form-control-lg" value={postCode} placeholder="Post Code"
                      onChange={(e)=>(setPostCode(e.target.value))}></input>
                    </div>  
                  </div> 

                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Suburb</label>
                      <input type="text" className="form-control form-control-lg" value={suburb}  placeholder="Suburb"
                      onChange={(e)=>(setSuburb(e.target.value))}></input>
                    </div>  
                  </div> 

                </div>

                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Phone Number</label>
                      <input type="text" className="form-control form-control-lg" value={phone} placeholder="Phone Number"
                      onChange={(e)=>(setPhoneNumb(e.target.value))}></input>
                    </div>  
                  </div> 

                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Email Address</label>
                      <input type="text" className="form-control form-control-lg" value={email} placeholder="Email Address"
                      onChange={(e)=>(setEmail(e.target.value))}></input>
                    </div>  
                  </div> 

                </div>

                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style" >User Name</label>
                      <input type="text" className="form-control form-control-lg" value={username} placeholder="User Name"
                      onChange={(e)=>(setUserName(e.target.value))}></input>
                    </div>  
                  </div> 

                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Password</label>
                      <input type="password" className="form-control form-control-lg" value={password} placeholder="Password"
                      onChange={(e)=>(setPassword(e.target.value))}></input>
                    </div>  
                  </div> 

                </div>

                <div className="form-check mb-4 pb-3">
                  <div>
                    <input className="form-check-input" style={{float: "none", marginRight: 10 + "px"}} type="checkbox"></input>
                    <label className='form-check-label' style={{color:"black"}}>
                      I do accept the <a href="#" style={{color:"black"}}><u>Terms and Conditions</u></a> of your site
                    </label>
                  </div>
                </div>
                
                <button type="button" onClick={createAccount} className="btn btn-success">Create</button>
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isConfirmationModalOpen}
        onRequestClose={closeConfirmationModal}
        contentLabel="Confirmation Modal"
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            background:"white",
            width: '45rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '0.3rem',
          }}} 
      >
        <h3>Your account has been successfully created!</h3><hr />
        <button
         className="close-btn"
        onClick={closeConfirmationModal}>Close</button>
      </Modal>
    </>
    
  )
}

export default Signup
