import sqlite3 from "sqlite3";

//const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Restaurant-Booking.db');

// this lets us do selects with a promise.
function select(db, query) {
  return new Promise((resolve, reject) => {
      const queries = [];
      db.each(query, (err, row) => {
          if (err) {
              reject(err); // optional: you might choose to swallow errors.
          } else {
              queries.push(row); // accumulate the data
          }
      }, (err, n) => {
          if (err) {
              reject(err); // optional: again, you might choose to swallow this error.
          } else {
              resolve(queries); // resolve the promise
          }
      });
  });
}

//let restList = [];


//db.serialize(() => {
    /*db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();*/

//    db.each("SELECT restaurantID, name from Restaurant" , (err, row) => {
//        console.log(row.restaurantID + ": " + row.name);
//        restList.push({id: row.restaurantID, name: row.name});
//    });
//});

//db.close();

const fetchRestaurants = async () => {
  return await select(db, "SELECT * from Restaurant");
}

const fetchRest = async (id) => {
    return (await select(db, "SELECT * from Restaurant WHERE restaurantID="+id))[0];
}

const fetchTimeSlots = async (id, date) => {
    return await select(db, "SELECT * FROM TimeSlot AS T LEFT JOIN Reservation AS R ON R.timeSlotID = T.timeSlotID WHERE T.restaurantID ==" + id + " AND (date != '" + date + "' OR date IS NULL)");
}

export default {fetchRestaurants, fetchRest, fetchTimeSlots}
