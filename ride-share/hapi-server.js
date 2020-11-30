// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "faraday.cse.taylor.edu", // PostgreSQL server
    user: "owen_elliott", // Your user name
    password: "vekeyino", // Your password
    database: "owen_elliott", // Your database name
  },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const Authorization = require("./models/Authorization.js");
const Driver = require("./models/Driver.js");
const Drivers = require("./models/Drivers.js");
const Location = require("./models/Location.js");
const Passenger = require("./models/Passenger.js");
const Ride = require("./models/Ride.js");
const State = require("./models/State.js");
const User = require("./models/User.js");
const Vehicle = require("./models/Vehicle.js");
const VehicleType = require("./models/VehicleType.js");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await User.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await User.query().insert({
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
          phone: "555-555-5555",
          isAdmin: false,
        });

        if (newAccount) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/accounts",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return User.query();
      },
    },

    {
      method: "DELETE",
      path: "/accounts/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return User.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },

    {
      method: "PATCH",
      path: "/accounts/{id}",
      config: {
        description: "Update a password",
      },
      handler: async (request, h) => {
        const account = await User.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.password))
        ) {
          return User.query()
            .findById(request.params.id)
            .patch({
              password: request.params.password,
            });
        }
      },
    },

    {
      method: "GET",
      path: "/rides",
      config: {
        description: "Retrieve all rides",
      },
      handler: (request, h) => {
        return Ride.query();
      },
    },

    {
      method: "GET",
      path: "/ride/{id}",
      config: {
        description: "Get one ride",
      },
      handler: (request, h) => {
        return Ride.query().findById(request.params.id);
      },
    },

    {
      method: "POST",
      path: "/rides/{id}",
      config: {
        description: "Join a ride",
      },
      handler: async (request, h) => {
        const newPassenger = await Passenger.query().insert({
          passengerId: request.payload.userId,
          rideId: request.params.id,
        });

        if (newPassenger) {
          return {
            ok: true,
            msge: `Joined ride '${request.params.id}'!`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't join ride with id '${request.params.id}'`,
          };
        }
      },
    },

    {
      method: "DELETE",
      path: "/rides/{id}",
      config: {
        description: "Delete a ride",
      },
      handler: async (request) => {
        const rowsDeleted = await Ride.query()
          .deleteById(request.params.id);
        if (rowsDeleted === 1) {
          return {
            ok: true,
            msge: `Deleted ride with ID '${request.params.id}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't delete ride with ID '${request.params.id}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/passengers",
      config: {
        description: "Get all passengers",
      },
      handler: (request, h) => {
        return Passenger.query().withGraphFetched('User');
      },
    },
    
    {
      method: "POST",
      path: "/login",
      config: {
        description: "Log in",
        validate: {
          payload: Joi.object({
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string()
              .min(8)
              .required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await User.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.password))
        ) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: account.id,
              firstName: account.first_name,
              lastName: account.last_name,
              email: account.email,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },

    {
      method: "POST",
      path: "/driver",
      config: {
        description: "Create a Driver",
      },
      handler: async (request, h) => {
        const newDriver = await Driver.query().insert({
          userId: request.payload.userId,
          licenseNumber: request.payload.licenseNumber,
          licenseState: request.payload.licenseState,
        })

        if (newDriver) {
          return {
            ok: true,
            msge: `Congradulations! Driver created for user with id '${request.payload.userId}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create driver with id '${request.payload.userId}'`,
          };
        }
      },
    },

    {
      method: "POST",
      path: "/vehicle",
      config: {
        description: "Create a Vehicle",
      },
      handler: async (request, h) => {
        const typeExists = await Vehicle_Type.query()
          .where('type', request.payload.type)

        if(!typeExists) {
          return {
            ok: false,
            msge: `Vehicle type not accepted`,
          };
        }

        const id = await Authorization.query().max('driverId')
        const authorize = await Authorization.query().insert({
          driverId: id + 1,
          vehicleId: id + 1,
        })
        const newVehicle = await Vehicle.query().insert({
          vehicleTypeId: request.payload.userId,
          licenseNumber: request.payload.licenseNumber,
          licenseState: request.payload.licenseState,
        })

        if (newVehicle) {
          return {
            ok: true,
            msge: `Congratulations! Vehicle created for user with id '${request.payload.userId}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create driver with id '${request.payload.userId}'`,
          };
        }
      },
    },
  ]);

  // Start the server.
  await server.start();
}

process.on("unhandledRejection", (err) => {
  server.logger().error(err);
  process.exit(1);
});

// Go!
init();
