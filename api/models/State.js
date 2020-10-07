const { knex, Model } = require("./db.js");

class State extends Model {
    static get tableName() {
        return "State";
    }
    static get relationMappings() {
        const Vehicle = require('./Vehicle.js');
        const Driver = require('./Driver.js');
        const Location = require('./Location.js');
        return {
            Vehicle: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: "State.abbreviation",
                    to: "Vehicle.licenseState"
                }
            },
            Driver: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: "State.abbreviation",
                    to: "Driver.licenseState"
                }
            },
            Location: {
                relation: Model.HasManyRelation,
                modelClass: Location,
                join: {
                    from: "State.abbreviation",
                    to: "Location.state"
                }
            }
        };
    }
}
/*
async function stateTest(queryString) {
    const states = await State.query()
        .where("abbreviation", "like", queryString)
        .catch((err) => console.log(err.message));

    console.log(states[0].name);
    knex.destroy();

}

stateTest('WA');*/