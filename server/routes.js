import controller from "./controller.js"

function setupRoutes(router) {
  router.get('/restaurants/', controller.getRestaurants);
  router.get('/restaurants/:id/bookings', controller.getBookings);
  router.get('/restaurants/:id', controller.getSpecificRestaurant);
  router.get('/timeSlots/:id/:date', controller.getTimeSlots);
  router.post('/restaurants/:id/bookings/', controller.addReservation);
}

export default setupRoutes