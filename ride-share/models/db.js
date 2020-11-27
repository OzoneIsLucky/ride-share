// Connect knex to the database.
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "faraday.cse.taylor.edu",
    user: "owen_elliott",
    password: "vekeyino",
    database: "owen_elliott",
  },
});
// Connect objection to knex.
const { Model } = require("objection");
Model.knex(knex);
module.exports = { knex, Model };
