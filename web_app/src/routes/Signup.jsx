import './Login.css'

function Signup() {
  
  return (
    <>
      <h2 style={{color:"white"}}>Create an account with us!</h2>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card" style={{borderRadius: 15 + "px"}}>
              <div className="card-body p-0">
                
                <h3 className="fw-normal mb-5" style={{color:"black"}}>Registration Form</h3>
                
                <div className="col-6 mb-4 pb-2">
                  
                  <select>
                    <option value="1">Title</option>
                    <option value="2">Miss</option>
                    <option value="3">Mrs</option>
                    <option value="4">Ms</option>
                    <option value="5">Mr</option>
                    <option value="6">None</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">First Name</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">Last Name</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>
                  </div>
                </div>

                <div className="mb-4 pb-2">
                  <div className='form-outline form-white'>
                    <label style={{color:"black"}} className="form-label label-style">Street Address</label>
                    <input type="text" className="form-control form-control-lg"></input>
                  </div>

                </div>

                <div className='row'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Post Code</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>  
                  </div> 

                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Suburb</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>  
                  </div> 

                </div>

                <div className='row'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Phone Number</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>  
                  </div> 

                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Email Address</label>
                      <input type="text" className="form-control form-control-lg"></input>
                    </div>  
                  </div> 

                </div>

                <div className="form-check mb-4 pb-3">
                  <input className="form-check-input" type="checkbox"></input>
                  <label className='form-check-label' style={{color:"black"}}>
                    I do accept the <a href="#" style={{color:"black"}}><u>Terms and Conditions</u></a> of your site
                  </label>
                </div>
                
                <button type="button" className="btn btn-success">Create</button>
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Signup
