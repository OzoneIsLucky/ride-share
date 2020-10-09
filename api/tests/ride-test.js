import * as Ride from "../models/State.js";
const { knex, Model } = require("../models/db.js");

async function rideTest(queryString) {
    const rides = await ride.query()
        .where("id", "like", queryString)
        .catch((err) => console.log(err.message));

	rides.query( "INSERT INTO Ride (date, time, distance, fuelPrice, fee, vehicleId, fromLocationId, toLocationId) VALUES ('December 31, 1963','23:15:30',12.5,4.6,7.0,2,1,2)", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	rides.query( "UPDATE Ride SET fee = 0.0 WHERE time = '23:15:30'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	rides.query( "DELETE FROM rides WHERE time = '23:15:30'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(rides[0].name);
    knex.destroy();

}

rideTest(1);
