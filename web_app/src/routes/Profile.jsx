import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Booking.css";



function Profile() {
  document.body.id = 'H';
  const navigate = useNavigate();
  const accountID=history.state.usr.accountDetails.accountID
  const userName=history.state.usr.accountDetails.username
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);
  };



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
      <Modal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          contentLabel="Confirmation Modal"
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
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <div class="icon-box">
                  <i class="material-icons">&#xE876;</i>
                </div>
                <h2 class="modal-title w-100">
                  Are you sure to delete this account?
                </h2>
              </div>
              <hr />
              
              <div class="modal-footer">
                <button
                  class="btn btn-success btn-block"
                  data-dismiss="modal"
                  onClick={closeConfirmationModal}
                >
                  Cancel
                </button>
                <button
                  class="btn btn-success btn-block"
                  data-dismiss="modal"
                >
                  Delete
                </button>
              </div>
              
            </div>
          </div>
        </Modal>
      
    </>
  );
}

export default Profile;