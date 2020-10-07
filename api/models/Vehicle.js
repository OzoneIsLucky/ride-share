const { knex, Model } = require("./db.js");

class Vehicle extends Model {
    static get tableName() {
        return "Vehicle";
    }
    static get relationMappings() {
        const Authorization = require('./Authorization.js');
        const Ride = require('./Ride.js');
        const VehicleType = require('./VehicleType.js');
        const State = require('./State.js');

        return {
            Authorization: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: "Vehicle.id",
                    to: "Authorization.vehicleId"
                }
            },
            Ride: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: "Vehicle.id",
                    to: "Ride.vehicleId"
                }
            },
            VehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: VehicleType,
                join: {
                    from: "Vehicle.vehicleTypeId",
                    to: "Vehicle_Type.id"
                }
            },
            State: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: "Vehicle.licenseState",
                    to: "State.abbreviation"
                }
            }
        };
    }
}