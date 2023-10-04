import controller from "./controller.js"

function setupRoutes(router) {
  router.get('/restaurants/', controller.getRestaurants);
  router.get('/restaurants/:id/bookings', controller.getBookings);
  router.get('/restaurants/:id', controller.getSpecificRestaurant);
  router.get('/timeSlots/:id/:date', controller.getTimeSlots);
  router.post('/restaurants/:id/bookings/', controller.addReservation);
  router.get('/restaurants/:id/restaurant', controller.getRestaurantDetail);
  router.get('/restaurants/:id/banquets', controller.getBanquets);
  router.get('/login/:userName/staff', controller.getStaffLogin);
  router.get('/employee/:id', controller.getEmployee);
  router.get('/login/:userName/customer', controller.getCustomerLogin);
  router.get('/customer/:id', controller.getCustomer);
  router.post('/signup/', controller.addAccount);
  router.delete('/account/:accountID', controller.deleteAccount);
  router.get('/reservation/:id', controller.getCustomerReservation)
  router.delete('/reservation/:id', controller.removeReservation)
  router.get('/account/:id/editprofile/', controller.getCustomerProfile)
  router.put('/account/:id/editprofile/', controller.updateAccount)
}

export default setupRoutes