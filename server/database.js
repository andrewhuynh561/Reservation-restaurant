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

function insert(db, query) {
    return new Promise((resolve, reject) => {
        const queries = [];
        db.run(query, function(res, err) {
            if (err) {
                reject(err); // optional: again, you might choose to swallow this error.
            } else {
                resolve(this.lastID); // resolve the promise
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

const fetchRestDetail = async (id) => {
    return (await select(db, "SELECT * from Restaurant WHERE restaurantID="+id))[0];
}

const fetchTimeSlots = async (restaurantId, date) => {
    return await select(db, "SELECT timeSlotID, timeSlot FROM TimeSlot WHERE timeSlotID NOT IN (SELECT timeSlotID FROM Reservation WHERE date == '" + date + "' ) AND restaurantID = " + restaurantId)
}

const insertBookings = async (date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId) => {
    return await insert(db, `INSERT INTO Reservation (date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId) values ('${date}', ${numberOfGuests}, ${restaurantId}, ${customerId}, ${timeSlotId}, ${banquetId})`);
}

const fetchBanquets = async (id) => {
    return (await select(db, "SELECT * FROM Banquet WHERE restaurantID = " + id));
}


export default {fetchRestaurants, fetchRest, fetchTimeSlots, insertBookings, fetchRestDetail, fetchBanquets}
