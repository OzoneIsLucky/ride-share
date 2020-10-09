import * as Authorization from "../models/State.js";
const { knex, Model } = require("../db.js");

async function authorizationTest(queryString) {
    const authorization = await Authorization.query()
        .where("driverId", "like", queryString)
        .catch((err) => console.log(err.message));

	Authorization.query( "INSERT INTO Authorization (driverId, vehicleId) VALUES (6, 7)", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	Authorization.query( "UPDATE Authorization SET driverId = 5 WHERE driverId = 6", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	Authorization.query( "DELETE FROM Authorization WHERE driverId = 5", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(authorization[0].name);
    knex.destroy();

}

authorizationTest(1);
