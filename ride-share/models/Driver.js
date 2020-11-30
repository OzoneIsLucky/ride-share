const { Model } = require("./db.js");

class Driver extends Model {
  static get tableName() {
    return "Driver";
  }
  static get relationMappings() {
    const Authorization = require("./Authorization.js");
    const Drivers = require("./Ride.js");
    const User = require("./User.js");
    const State = require("./State.js");

    return {
      Authorization: {
        relation: Model.HasManyRelation,
        modelClass: Authorization,
        join: {
          from: "Driver.id",
          to: "Authorization.driverId",
        },
      },
      Drivers: {
        relation: Model.HasManyRelation,
        modelClass: Drivers,
        join: {
          from: "Driver.id",
          to: "Drivers.driverId",
        },
      },
      User: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "Driver.userId",
          to: "user.id",
        },
      },
      State: {
        relation: Model.BelongsToOneRelation,
        modelClass: State,
        join: {
          from: "Driver.licenseState",
          to: "State.abbreviation",
        },
      },
    };
  }
}

module.exports = Driver;
