import * as Drivers from "../models/State.js";
const { knex, Model } = require("../db.js");

async function driversTest(queryString) {
    const drivers = await Drivers.query()
        .where("driverId", queryString)
        .catch((err) => console.log(err.message));

	Drivers.query( "INSERT INTO Drivers (driverId, rideId) VALUES (4,4)", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	Drivers.query( "UPDATE Drivers SET rideId = 5 WHERE driverId = 4", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	Drivers.query( "DELETE FROM Drivers WHERE rideId = 5", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(drivers[0].name);
    knex.destroy();

}

driversTest(1);
