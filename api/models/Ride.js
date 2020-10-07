const { knex, Model } = require("./db.js");

class Ride extends Model {
    static get tableName() {
        return "Ride";
    }
    static get relationMappings() {
        const Drivers = require('./Drivers.js');
        const Passenger = require('./Passenger.js');
        const Vehicle = require('./Vehicle.js');
        const Location = require('./Location.js');

        return {
            Drivers: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: "Ride.id",
                    to: "Drivers.rideId"
                }
            },
            Passenger: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join: {
                    from: "Ride.id",
                    to: "Passenger.rideId"
                }
            },
            Vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: "Ride.vehicleId",
                    to: "Vehicle.id"
                }
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: "Ride.fromLocationId",
                    to: "Location.id"
                }
            }
        };
    }
}