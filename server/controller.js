
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

export default {getRestaurants, getBookings}
