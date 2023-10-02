import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Booking.css";



function Profile() {
  document.body.id = 'H';
  const navigate = useNavigate();
  const accountID=history.state.usr.accountDetails.accountID
  const userName=history.state.usr.accountDetails.username
 

 


  useEffect(() => {
    console.log("user", history.state.usr)
    console.log("accountID:", accountID);
    console.log("user name:", userName);
    if(history.state.usr === undefined) {
        console.log("got here");
        navigate(`/`);
    }
  }, [history.state.usr]);

  return (
    <>
      <div>
      <h1>Welcome back, Mate</h1>
      {(history.state.usr.currentTier != undefined) && <div>You're in tier {history.state.usr.currentTier.tierName}</div>}

     
      <button onClick={openConfirmationModal} className="btn btn-danger">Delete Account</button>

      {/* Delete Account Confirmation Modal */}
      {/* {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Account Deletion</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleDeleteAccount} className="btn btn-danger">Delete</button>
            <button onClick={closeDeleteModal} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )} */}
      </div>
      
    </>
  );
}

export default Profile;