import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import "./Booking.css";
import bronzeTier from './.././TierIconImages/Bronze-Icon-1-298x300-removebg-preview.png';
import silverTier from './.././TierIconImages/2-2-silver-free-download-png-removebg-preview.png';
import goldTier from './.././TierIconImages/Gold-Icon-removebg-preview.png';

function Profile() {
  document.body.id = 'H';
  const navigate = useNavigate();
  const accountID=history.state.usr.accountDetails.accountID
  const userName=history.state.usr.accountDetails.username
  const customerName = history.state.usr.accountDetails.name
  const customerPoints = history.state.usr.accountDetails.points
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [deletedCount, setDeletedCount] = useState(0);

  const [customer, setCustomer] = useState([]); // get customer 
  const [cusReservation, setCusReservation] = useState([]); // get customer's reservation
  
  useEffect(() => {
    fetch(`http://localhost:6060/customer/${accountID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch customer data for account ID: ${accountID}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomer(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [accountID]);

  const showTierImage = () => {
    if (history.state.usr.accountDetails.points >= 300 && history.state.usr.accountDetails.points < 400)
    {
      return <img style={{width: 90}} src={bronzeTier}></img>
    }
    else if (history.state.usr.accountDetails.points >= 400 && history.state.usr.accountDetails.points < 500)
    {
      return <img style={{width: 90}}  src={silverTier}></img>
    }
    else if (history.state.usr.accountDetails.points >= 500)
    {
      return <img style={{width: 90}} src={goldTier}></img>
    }
  }


  useEffect(() => {
    if (customer.customerID !== undefined) {
      fetch(`http://localhost:6060/reservation/${customer.customerID}`)
      .then((response) => {
        if(!response.ok)
        {
          throw new Error (`Failed to fetch reservation data for customer ID: ${customer.customerID}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        var tempData = data
        
        for (var i = 0; i < tempData.length; i++) {
          var hours = tempData[i].timeSlot.split(":")[0];
          var AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = (hours % 12) || 12;
          var minutes = tempData[i].timeSlot.split(":")[1];
          tempData[i].timeSlot = hours + ":" + minutes + " " + AmOrPm;
          data[i].timeSlot = tempData[i].timeSlot;
        }

        setCusReservation(data); 
      })
      .catch((err) => {
        console.error(err.message);
      })
    }
  },[customer, deletedCount])

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:6060/account/${accountID}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log('Deleted successfully');
        navigate(`/login`);
      } else {
        throw new Error(`Failed to delete account: ${response.status} - ${response.statusText}`);
      }
      console.log(response)
      const responseBody = await response.json();
      console.log(responseBody)
    } catch (error) {
      console.error(error.message);
    }
  };
  
const cancelReservation = async (event, reservationID) => {
  event.preventDefault();
  try {
    const response = await fetch(`http://localhost:6060/reservation/${reservationID}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log('Deleted successfully');
      
    } else {
      throw new Error(`Failed to remove reservation: ${response.status} - ${response.statusText}`);
    }
    console.log(response)
    const responseBody = await response.json();
    console.log(responseBody)
    setDeletedCount(deletedCount + 1)

  } catch (error) {
    console.error(error.message);
  }

}

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
      <h1 style={{ color: "white", textAlign: "center", fontFamily: "Arial",fontSize: "45px" }}>
      Welcome back, {customerName}! {showTierImage()}
      </h1>
      <h2 style={{ color: "white", textAlign: "center", fontFamily: "Arial",fontSize: "35px" }}>You have achieved {customerPoints} points!</h2>
      {/* {(history.state.usr.currentTier !== undefined) && <div>You're in tier {history.state.usr.currentTier.tierName}</div>} */}
      <div className="container g-2">
        <div className="row justify-content-md-evenly"> 
          <div className="col-8">
            {cusReservation.length > 0 ?
              (<div>
                <h3 style={{ fontSize: "25px" }}>Your Upcomming Reservation</h3>
                <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Number of guests</th>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Time</th>
                        <th scope="col">Banquet selection</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cusReservation.map((item) => (
                      <tr>
                        <th scope="row">{item.date}</th>
                        <td>{item.numberOfGuests}</td>
                        <td>{item.name}</td>
                        <td>{item.timeSlot}</td>
                        <td>{item.banquetID != null ? "Yes" : "No"} </td>
                        <td><button onClick={(e)=>cancelReservation(e, item.reservationID)} className="btn btn-danger">Cancel</button></td>
                      </tr>))}
                    </tbody>
              </table>
            </div>)
            :(<div>
              <h3 style={{ fontSize: "15px" }}>You don't have any booking currently!</h3>
              {/* could have a link to home page or booking page under */}
            </div>) 
            }
          </div>
        </div>
      </div>
      {/* <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)" }}> at the bottom if you want to change for demonstration */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link
          to={`/account/${accountID}/editprofile/`}
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Edit Account
        </Link>
        <button
          onClick={openConfirmationModal}
          className="btn btn-danger"
        >
          Delete Account
        </button>
      </div>



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
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="material-icons">&#xE876;</i>
                </div>
                <h2 className="modal-title w-100">
                  Are you sure to delete this account?
                </h2>
              </div>
              <hr />
              <h3 style={{fontSize:20,fontWeight:5}}>This account will be deleted immediately. You can not undo this action.</h3>
              <div className="modal-footer">
                <button
                  className="btn btn-success btn-block"
                  data-dismiss="modal"
                  onClick={closeConfirmationModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-block"
                  data-dismiss="modal"
                  onClick={handleDeleteAccount}
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