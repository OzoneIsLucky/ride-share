import * as VehicleType from "../models/State.js";
const { knex, Model } = require("../models/db.js");

async function vehicleTypeTest(queryString) {
    const vt = await VehicleType.query()
        .where("id", "like", queryString)
        .catch((err) => console.log(err.message));

	vt.query( "INSERT INTO Vehicle Type (type) VALUES ('Go Cart')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	vt.query( "UPDATE VehicleType SET type = 'Bicycle' WHERE type = 'Go Cart'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	vt.query( "DELETE FROM VehicleType WHERE type = 'Bicycle'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(vt[0].name);
    knex.destroy();

}

vehicleTypeTest(1);
