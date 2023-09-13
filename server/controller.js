
import database from "./database.js"

const getRestaurants = async (req, res) => {
  const rests = await database.fetchRestaurants()
  return res.send(rests);
}

const getBookings = async (req, res) => {
  let restId = req.params.id;
  const bookings = await database.fetchBookings(restId)
  return res.send(bookings);
}

const getRestaurantDetail = async (req, res) => {
  let restID = req.params.id;
  const rest = await database.fetchRest(restID)
  return res.send(rest);
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

const addReservation = async (req, res) => {
  let restID = req.params.id;
  
  const date = req.body.date 
  const numberOfGuests = req.body.numberOfGuests
  const customerId = req.body.customerId 
  const timeSlotId = req.body.timeSlotId 
  const banquetId = req.body.banquetId

  const result = await database.insertBookings(date, numberOfGuests, restID, customerId, timeSlotId, banquetId);
  console.log("result:", result);

  return res.send({reservationID: result});
}

const getBanquets = async (req, res) => {
  let restID = req.params.id; 
  const banquets = await database.fetchBanquets(restID);
  return res.send(banquets);
}

const getStaffLogin = async (req, res) => {
  let userName = req.params.userName;

  const accountDetails = await database.fetchStaffLogin(userName)
  return res.send(accountDetails);
}

const getEmployee = async (req, res) => {
  let id = req.params.id;
  const employee = await database.fetchEmployee(id);
  return res.send(employee);
}

export default {getRestaurants, getBookings, getSpecificRestaurant, getTimeSlots, addReservation, getRestaurantDetail, getBanquets, getStaffLogin, getEmployee}
