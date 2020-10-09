import * as State from "../models/State.js";

const { knex, Model } = require("../models/db.js");

async function stateTest(queryString) {
    const states = await State.query()
        .where("abbreviation", "like", queryString)
        .catch((err) => console.log(err.message));

	states.query( "INSERT INTO State (abbreviation, name) VALUES ('New Fake','NF')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	states.query( "UPDATE State SET abbreviation = 'FK' WHERE abbreviation = 'NF'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	states.query( "DELETE FROM State WHERE abbreviation = 'FK'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(states[0].name);
    knex.destroy();

}

stateTest('WA');
