import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "./Booking.css";
import MenuImage from "./Elements/menuImage";
import Payment from "../components/Payment";
import dayjs from 'dayjs'

function Booking() {
  document.body.id = "H";

  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [timeslot, setTimeslot] = useState(null);
  const [guest, setGuest] = useState("");
  const [banquets, setBanquets] = useState([]);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [reservationID, setReservationID] = useState(0);
  const [selectedBanquetID, setSelectedBanquetID] = useState(null);

  const updateBanquet = (select) => {
    var id = select.options[select.selectedIndex].value;
    setSelectedBanquetID(id);
  };
  const handleChangeinTimes = (newTimeslot) => {
    setTimeslot(newTimeslot);
  };
  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);
  };

  const isDayDisable = (banDate) => {
    const dayOfWeek = banDate.getDay();
    if (id == 1) {
      // Disable Sunday (day 0) Mexikana restaurant
      return dayOfWeek !== 0;
    } else if (id == 2) {
      //Disable Monday (day 1) and Tuesday (day 2) La Oeste De La Mar restaurant
      return dayOfWeek !== 1 && dayOfWeek !== 2;
    } else if (id == 3) {
      //Disable Monday (day 1)  Bambooleaf restaurant
      return dayOfWeek !== 1;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetch(`http://localhost:6060/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for restaurant ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRestaurant(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  useEffect(() => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    fetch(`http://localhost:6060/timeSlots/${id}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        var tempData = data
        console.log(tempData);
        for (var i = 0; i < tempData.length; i++) {
          var hours = tempData[i].timeSlot.split(":")[0];
          var AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = (hours % 12) || 12;
          var minutes = tempData[i].timeSlot.split(":")[1];
          tempData[i].timeSlot = hours + ":" + minutes + " " + AmOrPm;
        }

        console.log(tempData);

        setTimeSlots([...tempData]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, date]);

  useEffect(() => {
    fetch(`http://localhost:6060/restaurants/${id}/banquets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for restaurant ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("banquets", data);
        setBanquets(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  // date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId
  const handleSubmit = async (event) => {
    event.preventDefault();

    var banquetId = selectedBanquetID;
    if (banquetId == -1) {
      banquetId = null;
    }

    console.log();

    const reservationData = {
      date: dayjs(date).format('YYYY-MM-DD'), // Fixed
      numberOfGuests: guest,
      restaurantId: id,
      customerId: null,
      timeSlotId: timeslot.timeSlotID,
      banquetId: banquetId,
    };

    console.log(reservationData);

    try {
      const response = await fetch(
        `http://localhost:6060/restaurants/${id}/bookings`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create reservation for restaurant ID ${id}`);
      }

      const responseBody = await response.json();
      console.log("id", responseBody.reservationID);
      setReservationID(responseBody.reservationID);
      openConfirmationModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    console.log(date);
  };

  return (
    <>
      <h1 className="word title" id="res-title">Reservation for {restaurant.name}</h1>
      <div className="row g-2 justify-content-md-evenly">
        <div className="col-4">
          <MenuImage id={id} />
        </div>
        <div className="col-3">
          <form onSubmit={handleSubmit} className="newResForm">
            <div>
              <h3 className="word">Select the date</h3>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                filterDate={isDayDisable}
                dateFormat="dd/MM/yyyy"
              />
              <p className="word-selection">
                Selected date: {date.toDateString()}
              </p>
              <h3 className="word">Select the time</h3>
              {timeSlots.map((timeslot) => {
                const onclickEvent = () => {
                  handleChangeinTimes(timeslot);
                };

                return (
                  <button className="btn"
                    type="button"
                    key={timeslot.timeSlotID}
                    onClick={onclickEvent}
                    style={{
                      backgroundColor: "red",
                      color: "black",
                      margin: 2,
                      padding: 2.5,
                      //border: "1px solid black",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "blue";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "red";
                      e.target.style.color = "black";
                    }}
                  >
                    {timeslot.timeSlot}
                  </button>
                );
              })}
              <p className="word-selection">
                Selected Time: {timeslot && timeslot.timeSlot}
              </p>{" "}
              {/* there to see if the time is updated and displayed */}
              {banquets.length > 0 && (
              <div>
                <h3 className="word">Select your banquet option</h3>
                <select
                  onChange={(e) => {
                    updateBanquet(e.target);
                  }}
                  style={{ width: "200px", height: "30px" }}
                  id="banquetOptions"
                  name="banquetOptions"
                  form="banquetForm"
                >
                  <option value={-1}>None</option>
                  {banquets.map((banquet) => (
                    <option key={banquet.banquetID} value={banquet.banquetID}>
                      {banquet.banquetName} {banquet.banquetPrice}
                    </option>
                  ))}
                </select>
              </div>
            )}
              <h4 className="word">Select number of guests</h4>
              <input
                name="numberOfGuests"
                type="number"
                min="0"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
          </form>
          {selectedBanquetID != -1 && <Payment></Payment>}
        </div>

        <div className="newResbtn">
          <br />
          <br />
          <br />
          <button
            className="reservation-btn"
            type="button"
            onClick={handleSubmit}
          >
            Booking<span></span>
          </button>
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
                  Your reservation has been made !
                </h2>
              </div>
              <hr />
              <p className="p">Date: {date.toISOString().split("T")[0]}</p>
              <p className="p">Time: {timeslot && timeslot.timeSlot}</p>
              <p className="p">Location : {restaurant.name}</p>
              <p className="p">Customer: None</p>
              <p className="p">Guest :{guest}</p>
              <p className="p">Reservation: {reservationID}</p>
              <div class="modal-footer">
                <button
                  class="btn btn-success btn-block"
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
    </>
  );
}

export default Booking;
