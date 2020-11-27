const { Model } = require("./db.js");

class User extends Model {
  static get tableName() {
    return "user";
  }
  static get relationMappings() {
    const Driver = require("./Driver.js");
    const Passenger = require("./Passenger.js");
    return {
      Passenger: {
        relation: Model.HasManyRelation,
        modelClass: Passenger,
        join: {
          from: "User.id",
          to: "Passenger.passengerId",
        },
      },
      Driver: {
        relation: Model.HasManyRelation,
        modelClass: Driver,
        join: {
          from: "User.id",
          to: "Driver.userId",
        },
      },
    };
  }
}

module.exports = User;
