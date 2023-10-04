import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

function splitAddress(addr) {

  const arr = addr.split(";")
  const street   = arr[0]
  const suburb   = arr[1]
  const postcode = arr[2]
  return {street, suburb, postcode}
}

function splitName(name) {

  const arr = name.split(" ")
  const fname   = arr[0]
  const lname   = arr[1]
  return {fname, lname}
}

function EditProfile() {
  const [customer, setCustomer] = useState([]); // get customer
  const { id } = useParams();

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhoneNumb] = useState("");
  
  const [email, setEmail] = useState("");
  const [postCode, setPostCode] = useState("");
  
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);
  };


  useEffect(() => {
    fetch(`http://localhost:6060/account/${id}/editprofile/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch customer data for customer ID: ${id}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomer(data);

        const nameParts = splitName(data.name)
        const addrParts = splitAddress(data.address)

        console.log("nameParts", nameParts)
        setfName(nameParts.fname)
        setlName(nameParts.lname)
        setPhoneNumb(data.phone)

        setEmail(data.email)
        setPostCode(addrParts.postcode)

        setSuburb(addrParts.suburb)
        setStreet(addrParts.street)
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const updateAccount = async () => {
    try {
      console.log("making request")
      const accountData = {
        name: fName + " " + lName,
        phone: phone,
        email: email,
        address: street + ";" + suburb + ";" + postCode 
      }

      const response = await fetch(`http://localhost:6060/account/${id}/editprofile/`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });
 
      console.log("response", response)
      if (!response.ok) {
        throw new Error(`Failed to update account`);
      }
 
      const responseBody = response.json();
      
      openConfirmationModal();
     
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card mt-4" style={{ borderRadius: 15 + "px" }}>
            <div className="card-body p-0">
              <h3 className="fw-normal mb-4 mt-4" style={{ color: "black" }}>
                <b>Edit Profile</b>
              </h3>

              <div className="row p-3">
                <div className="col-md-6 mb-4 pb-2">
                  <div className="form-outline">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={fName}
                      placeholder="First Name"
                      onChange={(e) => setfName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="col-md-6 mb-4 pb-2">
                  <div className="form-outline">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={lName}
                      placeholder="Last Name"
                      onChange={(e) => setlName(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="p-3 mb-4 pb-2">
                <div className="form-outline form-white">
                  <label
                    style={{ color: "black" }}
                    className="form-label label-style"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={street}
                    placeholder="Street Address"
                    onChange={(e) => setStreet(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-5 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Post Code
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={postCode}
                      placeholder="Post Code"
                      onChange={(e) => setPostCode(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="col-md-7 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Suburb
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={suburb}
                      placeholder="Suburb"
                      onChange={(e) => setSuburb(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-md-5 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={phone}
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNumb(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="col-md-7 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={email}
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              {/*<div className="row p-3">
                <div className="col-md-5 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={username}
                      placeholder="User Name"
                      onChange={(e) => setUserName(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="col-md-7 mb-4 pb-2">
                  <div className="form-outline form-white">
                    <label
                      style={{ color: "black" }}
                      className="form-label label-style"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="form-check mb-4 pb-3">
                <div>
                  <input
                    className="form-check-input"
                    style={{ float: "none", marginRight: 10 + "px" }}
                    type="checkbox"
                  ></input>
                  <label
                    className="form-check-label"
                    style={{ color: "black" }}
                  >
                    I do accept the{" "}
                    <a href="#" style={{ color: "black" }}>
                      <u>Terms and Conditions</u>
                    </a>{" "}
                    of your site
                  </label>
                </div>
              </div>*/}

              <button
                type="button"
                onClick={updateAccount}
                className="btn btn-success"
              >
                Save
              </button>
            </div>
            <Modal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          contentLabel="Confirmation Modal"
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
            },
          }}
        >
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="material-icons">&#xE876;</i>
                </div>
                <h2 className="modal-title w-100">
                  Your account has been updated !
                </h2>
              </div>
              <hr />
              
              <div className="modal-footer">
                <button
                  className="btn btn-success btn-block"
                  data-dismiss="modal"
                  onClick={closeConfirmationModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
