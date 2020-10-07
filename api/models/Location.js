const { knex, Model } = require("./db.js");

class Location extends Model {
    static get tableName() {
        return "Location";
    }
    static get relationMappings() {
        const Ride = require('./Ride.js');
        const State = require('./State.js');
        return {
            Ride: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: "Location.id",
                    to: "Ride.fromLocationId"
                }
            },
            State: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: "State.abbreviation",
                    to: "Location.state"
                }
            }
        };
    }
}