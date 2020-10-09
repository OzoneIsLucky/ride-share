import * as Driver from "../models/State.js";
const { knex, Model } = require("../db.js");

async function driverTest(queryString) {
    const driver = await driver.query()
        .where("id", "like", queryString)
        .catch((err) => console.log(err.message));

	Driver.query( "INSERT INTO Driver (userId, licenseNumber, licenseState) VALUES (6,'license','IL')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	Driver.query( "UPDATE Driver SET userId = 5 WHERE userId = 6", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	Driver.query( "DELETE FROM Driver WHERE userId = 5", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(driver[0].name);
    knex.destroy();

}

driverTest('WA');
