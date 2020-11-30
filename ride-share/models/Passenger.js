const { Model } = require("./db.js");

class Passenger extends Model {
  static get tableName() {
    return "Passenger";
  }

  static get idColumn() {
    return ["passengerId", "rideId"];
  }

  static get relationMappings() {
    const Ride = require("./Ride.js");
    const User = require("./User.js");
    return {
      Ride: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ride,
        join: {
          from: "Passenger.rideId",
          to: "Ride.id",
        },
      },
      User: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "Passenger.passengerId",
          to: "user.id",
        },
      },
    };
  }
}

module.exports = Passenger;
