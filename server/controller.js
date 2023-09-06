
import database from "./database.js"

const getRestaurants = async (req, res) => {
  const rests = await database.fetchRestaurants()
  return res.send(rests);
}

const getBookings = async (req, res) => {
  let restId = req.params.id;

  var bookings = [
    {
      time: "7 pm"
    }
  ]
  return res.send(bookings);
}

const getSpecificRestaurant = async (req, res) => {
  let restID = req.params.id;
  const rest = await database.fetchRest(restID)
  return res.send(rest);
}

const getTimeSlots = async (req, res) => {
  let restID = req.params.id;
  let date = req.params.date;
  const timeSlots = await database.fetchTimeSlots(restID, date)
  return res.send(timeSlots);
}

export default {getRestaurants, getBookings, getSpecificRestaurant, getTimeSlots}
