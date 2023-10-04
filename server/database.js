import sqlite3 from "sqlite3";

//const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Restaurant-Booking.db');

// this lets us do selects with a promise.
function select(db, query) {
    console.log("running query \"" + query + "\"")
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

  function remove(db, query) {
    return new Promise((resolve, reject) => {
        const queries = [];
        db.run(query, function(res, err) {
            if (err) {
                reject(err); // optional: again, you might choose to swallow this error.
            } else {
                resolve(this.changes); // resolve the promise
            }
        });
    });
  }

  function modify(db, query) {
    console.log("running modify", query)
    return new Promise((resolve, reject) => {
        const queries = [];
        db.run(query, function(res, err) {
            if (err) {
                reject(err); // optional: again, you might choose to swallow this error.
            } else {
                resolve({}); // resolve the promise
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

// FETCH 

const fetchRestaurants = async () => {
  return await select(db, "SELECT * from Restaurant");
}

const fetchBookings = async (id) => {
    return await select(db, "SELECT * FROM Reservation AS R LEFT JOIN TimeSlot AS T ON R.timeSlotID = T.timeSlotID WHERE R.restaurantID = " + id);
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

const fetchBanquets = async (id) => {
    return (await select(db, "SELECT * FROM Banquet WHERE restaurantID = " + id));
}

const fetchStaffLogin = async (userName) => {
    return (await select(db, "SELECT * FROM Account WHERE username == '" + userName + "' AND accountID IN (SELECT accountID from Employee)"))[0];
}

const fetchEmployee = async (id) => {
    return (await select(db, "SELECT * FROM Employee WHERE accountID == " + id))[0];
}

const fetchCustomerLogin = async (userName) => {
    return (await select(db, `SELECT * from Account JOIN Customer on Account.accountID == Customer.accountID WHERE Account.username == '${userName}'`))[0];
}

const fetchCustomer = async (id) => {
    return (await select(db, "SELECT * FROM Customer WHERE accountID == " + id))[0];
}

const fetchCustomerProfile = async (id) => {
    return (await select(db, "SELECT * FROM Customer JOIN Account ON Account.accountID = Customer.accountID WHERE Customer.accountID == " + id))[0];
}

const fetchCurrentTier  = async (id) => {
    return (await select(db, `SELECT * FROM Tiers where Tiers.minSpendpm <= (SELECT points from Account WHERE accountID == '${id}')
                                ORDER BY minSpendpm DESC
                                LIMIT 1`))?.[0];
}

const fetchCusReservation = async (id) => {
    return await select(db, "SELECT * FROM Reservation AS R LEFT JOIN TimeSlot AS T ON R.timeSlotID = T.timeSlotID"+ 
                            " LEFT JOIN Restaurant AS RR ON R.restaurantID = RR.restaurantID WHERE R.customerID = " + id);
} 

// INSERT
const insertBookings = async (date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId) => {
    return await insert(db, `INSERT INTO Reservation (date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId) values ('${date}', ${numberOfGuests}, ${restaurantId}, ${customerId}, ${timeSlotId}, ${banquetId})`);
}

const insertAccount = async (username, password) => {
    return await insert(db, `INSERT INTO Account (username, password) values ('${username}', '${password}')`);
}

const insertCustomer = async (name, phone, email, accountID, address) => {
    return await insert(db, `INSERT INTO Customer (name, phone, email, accountID, address) values ('${name}', '${phone}', '${email}', ${accountID}, '${address}')`);
}
//DELETE
const deleteAccount = async (accountID) => {
    return await remove(db,`DELETE FROM Account WHERE accountID = ${accountID}`);
}

const removeRes = async (reservationID) => {
    return await remove(db,`DELETE FROM Reservation WHERE reservationID = ${reservationID}`);
}

const updateCustomer = async (name, phone, email, accID, address) => {
    return await modify(db, `UPDATE Customer SET name = '${name}', phone = '${phone}', email = '${email}', address = '${address}' WHERE accountID = ${accID}`);
}
export default {updateCustomer, fetchRestaurants, fetchRest, fetchTimeSlots, insertBookings, fetchRestDetail, fetchBanquets, fetchStaffLogin, fetchEmployee, fetchCustomer, fetchCustomerLogin, fetchBookings, fetchCurrentTier, insertAccount, insertCustomer, deleteAccount, removeRes, fetchCusReservation, fetchCustomerProfile}
