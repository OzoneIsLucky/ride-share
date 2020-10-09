import * as Vehicle from "../models/State.js";
const { knex, Model } = require("../models/db.js");

async function vehicleTest(queryString) {
    const vehicles = await Vehicle.query()
        .where("id", "like", queryString)
        .catch((err) => console.log(err.message));

	vehicles.query( "INSERT INTO Vehicle (make, model, color, vehicleTypeId, capacity, mpg, licenseState, licensePlate) VALUES ('Taylor','University','Purple',4,2500,100.1,'IL','Trojans')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	vehicles.query( "UPDATE Vehicle SET color = 'Red' WHERE licensePlate = 'Trojans'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	vehicles.query( "DELETE FROM vehicles WHERE make = 'Taylor'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(vehicles[0].name);
    knex.destroy();

}

vehicleTest(1);
