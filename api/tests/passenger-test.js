import * as Passenger from "../models/State.js";
const { knex, Model } = require("../db.js");

async function passengerTest(queryString) {
    const passengers = await Passenger.query()
        .where("passengerId", "like", queryString)
        .catch((err) => console.log(err.message));

	passengers.query( "INSERT INTO Passenger (passengerId, rideId) VALUES (10,7)", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	passengers.query( "UPDATE Passenger SET rideId = 6 WHERE passengerId = 10", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	passengers.query( "DELETE FROM Passenger WHERE rideId = 6", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(passengers[0].name);
    knex.destroy();

}

passengersTest(1);
