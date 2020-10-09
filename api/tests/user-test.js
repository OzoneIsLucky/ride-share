import * as User from "../models/State.js";
const { knex, Model } = require("../models/db.js");

async function userTest(queryString) {
    const users = await User.query()
        .where("id", "like", queryString)
        .catch((err) => console.log(err.message));

	users.query( "INSERT INTO User (firstName, lastName, email, password, phone) VALUES ('First','Last','unique@yahoo.edu','superstrong','3873940534')", function (err, result) {
    	if (err) throw err;
    	console.log("1 record inserted");
	});
	users.query( "UPDATE User SET firstName = 'Marcus' WHERE password = 'superstrong'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record updated");
	});
	users.query( "DELETE FROM User WHERE firstName = 'Marcus'", function (err, result) {
    	if (err) throw err;
    	console.log("1 record deleted");
	});

    console.log(users[0].name);
    knex.destroy();

}

userTest(1);
