
import database from "./database.js"

let sharedAccountID;

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

const getCustomerLogin = async (req, res) => {
  let userName = req.params.userName;

  const accountDetails = await database.fetchCustomerLogin(userName)
  if (accountDetails == undefined) {
    return res.status(404).json({message: "Username is wrong"})
  }
  const currentTier = await database.fetchCurrentTier(accountDetails.accountID) // this crashes the server if username is wrong as accountDetails will be undefined
  
  return res.send({accountDetails, currentTier});
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

const addAccount = async (req, res) => {
  
  const username = req.body.userName
  const password = req.body.password
  const name = req.body.name
  const phone = req.body.phone
  const email = req.body.email
  const address = req.body.address

  const accID = await database.insertAccount(username, password);
  const cust = await database.insertCustomer(name, phone, email, accID, address)

  console.log("accountID: ", accID)
  console.log("custID: ", cust)

  return res.send({accountID: accID, customerID: cust})
}

const deleteAccount = async (req , res) =>{
  try {
    const accountID = req.params.accountID
    const result = await database.deleteAccount(accountID);
    console.log(result)

  if (result) {
      return res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployee = async (req, res) => {
  let id = req.params.id;
  const employee = await database.fetchEmployee(id);
  return res.send(employee);
}

const getCustomer = async (req, res) => {
  let id = req.params.id;
  const customer = await database.fetchCustomer(id);
  return res.send(customer);
}

const getCustomerProfile = async (req, res) => {
  let id = req.params.id;
  const customer = await database.fetchCustomerProfile(id);
  return res.send(customer);
}

const getCustomerReservation = async (req, res) => {
  let id = req.params.id;
  const cusReservation = await database.fetchCusReservation(id);
  return res.send(cusReservation);
}

const removeReservation = async (req, res) => {
  
  try {
    const id = req.params.id
    const result = await database.removeRes(id);
    console.log(result)

  if (result) {
      return res.status(200).json({ message: 'Reservation deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const updateAccount = async (req, res) => {

  try {
    const accID = req.params.id
    
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const address = req.body.address

    
    const customer = await database.updateCustomer(name, phone, email, accID, address)
  } catch {
    return res.status(500).json({ message: 'Internal server error' })
  }
  return res.status(200).json({ message: 'Account was updated' })
}
export default {updateAccount, getCustomerLogin, getCustomer, getRestaurants, getBookings, getSpecificRestaurant, getTimeSlots, addReservation, getRestaurantDetail, getBanquets, getStaffLogin, getEmployee, addAccount, deleteAccount, removeReservation, getCustomerReservation, getCustomerProfile}
