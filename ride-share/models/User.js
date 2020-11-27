const { Model } = require("./db.js");
const { hash, compare } = require("bcrypt");

const SALT_ROUNDS = 10;

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

  // Encrypt the password before storing it in the database.
  // SHOULD ALSO DO THIS ON UPDATE!

  // eslint-disable-next-line no-unused-vars
  async $beforeInsert(queryContext) {
    this.password = await hash(this.password, SALT_ROUNDS);
  }

  async verifyPassword(plainTextPassword) {
    return compare(plainTextPassword, this.password);
  }
}

module.exports = User;
