const { knex, Model } = require("./db.js");

class Passenger extends Model {
    static get tableName() {
        return "Passenger";
    }
    static get relationMappings() {
        const Driver = require('./Driver.js');
        const User = require('./User.js');
        return {
            Ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: "Passenger.rideId",
                    to: "Ride.id"
                }
            },
            User: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "Passenger.passengerId",
                    to: "User.id"
                }
            }
        };
    }
}