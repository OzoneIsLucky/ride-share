CREATE TABLE "user"
(
    id          serial      NOT NULL,
    "firstName" varchar(40) NOT NULL,
    "lastName"  varchar(40) NOT NULL,
    email       varchar(40) NOT NULL,
    password    varchar(40) NOT NULL,
    phone       varchar(40),
    "isAdmin"   boolean DEFAULT FALSE,
    CONSTRAINT user_pk
        PRIMARY KEY (id)
);

CREATE UNIQUE INDEX user_email_uindex
    ON "user" (email);

CREATE TABLE "Vehicle_Type"
(
    id   serial NOT NULL,
    type varchar(40),
    CONSTRAINT vehicle_type_pk
        PRIMARY KEY (id)
);

CREATE TABLE "State"
(
    abbreviation char(2) NOT NULL,
    name         varchar(20),
    CONSTRAINT state_pk
        PRIMARY KEY (abbreviation)
);

CREATE TABLE "Driver"
(
    id              serial      NOT NULL,
    "userId"        integer,
    "licenseNumber" varchar(40) NOT NULL,
    "licenseState"  char(2),
    CONSTRAINT driver_pk
        PRIMARY KEY (id),
    CONSTRAINT driver_state_abbreviation_fk
        FOREIGN KEY ("licenseState") REFERENCES "State",
    CONSTRAINT driver_user_id_fk
        FOREIGN KEY ("userId") REFERENCES "user"
);

CREATE TABLE "Vehicle"
(
    id              serial NOT NULL,
    make            varchar(40),
    model           varchar(40),
    color           varchar(40),
    "vehicleTypeId" integer,
    capacity        integer,
    mpg             double precision,
    "licenseState"  char(2),
    "licensePlate"  varchar(40),
    CONSTRAINT vehicle_pk
        PRIMARY KEY (id),
    CONSTRAINT vehicle_vehicle_type_id_fk
        FOREIGN KEY ("vehicleTypeId") REFERENCES "Vehicle_Type",
    CONSTRAINT vehicle_state_abbreviation_fk
        FOREIGN KEY ("licenseState") REFERENCES "State"
);

CREATE TABLE "Authorization"
(
    "driverId"  integer NOT NULL,
    "vehicleId" integer NOT NULL,
    CONSTRAINT authorization_pk
        PRIMARY KEY ("driverId", "vehicleId"),
    CONSTRAINT authorization_driver_id_fk
        FOREIGN KEY ("driverId") REFERENCES "Driver",
    CONSTRAINT authorization_vehicle_id_fk
        FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"
);

CREATE TABLE "Location"
(
    id        serial NOT NULL,
    name      varchar(40),
    address   varchar(40),
    city      varchar(40),
    state     char(2),
    "zipCode" integer,
    CONSTRAINT location_pk
        PRIMARY KEY (id),
    CONSTRAINT location_state_abbreviation_fk
        FOREIGN KEY (state) REFERENCES "State"
);

CREATE TABLE "Ride"
(
    id               serial NOT NULL,
    date             date,
    time             timestamp,
    distance         double precision,
    "fuelPrice"      double precision,
    fee              double precision,
    "vehicleId"      integer,
    "fromLocationId" integer,
    "toLocationId"   integer,
    CONSTRAINT ride_pk
        PRIMARY KEY (id),
    CONSTRAINT ride_location_id_fk
        FOREIGN KEY ("fromLocationId") REFERENCES "Location",
    CONSTRAINT ride_location_id_fk_2
        FOREIGN KEY ("toLocationId") REFERENCES "Location",
    CONSTRAINT ride_vehicle_id_fk
        FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"
);

CREATE TABLE "Passenger"
(
    "passengerId" integer NOT NULL,
    "rideId"      integer NOT NULL,
    CONSTRAINT passenger_pk
        PRIMARY KEY ("passengerId", "rideId"),
    CONSTRAINT passenger_ride_id_fk
        FOREIGN KEY ("rideId") REFERENCES "Ride",
    CONSTRAINT passenger_user_id_fk
        FOREIGN KEY ("passengerId") REFERENCES "user"
);

CREATE TABLE "Drivers"
(
    "driverId" integer,
    "rideId"   integer,
    CONSTRAINT drivers_pk
        UNIQUE ("driverId", "rideId"),
    CONSTRAINT drivers_driver_id_fk
        FOREIGN KEY ("driverId") REFERENCES "Driver",
    CONSTRAINT drivers_ride_id_fk
        FOREIGN KEY ("rideId") REFERENCES "Ride"
);
