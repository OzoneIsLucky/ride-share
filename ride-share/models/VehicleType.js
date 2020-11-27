const { Model } = require("./db.js");

class VehicleType extends Model {
  static get tableName() {
    return "Vehicle_Type";
  }
  static get relationMappings() {
    const Vehicle = require("./Vehicle.js");
    return {
      Vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: "Vehicle_Type.id",
          to: "Vehicle.vehicleTypeId",
        },
      },
    };
  }
}

module.exports = VehicleType;
