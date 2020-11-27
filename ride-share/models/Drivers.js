const { Model } = require("./db.js");

class Drivers extends Model {
  static get tableName() {
    return "Drivers";
  }
  static get relationMappings() {
    const Driver = require("./Driver.js");
    const Ride = require("./Ride.js");
    return {
      Ride: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ride,
        join: {
          from: "Drivers.rideId",
          to: "Ride.id",
        },
      },
      Driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: Driver,
        join: {
          from: "Drivers.driverId",
          to: "Driver.id",
        },
      },
    };
  }
}

module.export = Drivers;
