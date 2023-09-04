import controller from "./controller.js"

function setupRoutes(router) {
  router.get('/restaurants/', controller.getRestaurants);
  router.get('/restaurants/:id/bookings', controller.getBookings);
}

export default setupRoutes