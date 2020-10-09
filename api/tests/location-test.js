import * as Location from "../models/State.js";
const { knex, Model } = require("../db.js");

async function locationTest(queryString) {
    const locations = await Location.query()
        .where("state", "like", queryString)
        .catch((err) => console.log(err.message));

	locations.query( "INSERT INTO Location (name, address, city, state, zipCode) VALUES ('Ihop','493 Park Way','Fort Wayne, 'WI','18505')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	locations.query( "UPDATE Location SET name = 'Blue' WHERE name = 'Ihop'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	locations.query( "DELETE FROM Location WHERE name = 'Blue'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(locations[0].name);
    knex.destroy();

}

locationTest('IL');
