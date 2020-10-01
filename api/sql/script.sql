create table "user"
(
    id          serial      not null
        constraint user_pk
            primary key,
    "firstName" varchar(40) not null,
    "lastName"  varchar(40) not null,
    email       varchar(40) not null,
    password    varchar(40) not null,
    phone       varchar(40),
    "isAdmin"   boolean default false
);

create unique index user_email_uindex
    on "user" (email);

create table "Vehicle_Type"
(
    id   serial not null
        constraint vehicle_type_pk
            primary key,
    type varchar(40)
);

create table "State"
(
    abbreviation char(2) not null
        constraint state_pk
            primary key,
    name         varchar(20)
);

create table "Driver"
(
    id              serial      not null
        constraint driver_pk
            primary key,
    "userId"        integer
        constraint driver_user_id_fk
            references "user",
    "licenseNumber" varchar(40) not null,
    "licenseState"  char(2)
        constraint driver_state_abbreviation_fk
            references "State"
);

create table "Vehicle"
(
    id              serial not null
        constraint vehicle_pk
            primary key,
    make            varchar(40),
    model           varchar(40),
    color           varchar(40),
    "vehicleTypeId" integer
        constraint vehicle_vehicle_type_id_fk
            references "Vehicle_Type",
    capacity        integer,
    mpg             double precision,
    "licenseState"  char(2)
        constraint vehicle_state_abbreviation_fk
            references "State",
    "licensePlate"  varchar(40)
);

create table "Authorization"
(
    "driverId"  integer not null
        constraint authorization_driver_id_fk
            references "Driver",
    "vehicleId" integer not null
        constraint authorization_vehicle_id_fk
            references "Vehicle",
    constraint authorization_pk
        primary key ("driverId", "vehicleId")
);

create table "Location"
(
    id        serial not null
        constraint location_pk
            primary key,
    name      varchar(40),
    address   varchar(40),
    city      varchar(40),
    state     char(2)
        constraint location_state_abbreviation_fk
            references "State",
    "zipCode" integer
);

create table "Ride"
(
    id               serial not null
        constraint ride_pk
            primary key,
    date             date,
    time             timestamp,
    distance         double precision,
    "fuelPrice"      double precision,
    fee              double precision,
    "vehicleId"      integer
        constraint ride_vehicle_id_fk
            references "Vehicle",
    "fromLocationId" integer
        constraint ride_location_id_fk
            references "Location",
    "toLocationId"   integer
        constraint ride_location_id_fk_2
            references "Location"
);

create table "Passenger"
(
    "passengerId" integer not null
        constraint passenger_user_id_fk
            references "user",
    "rideId"      integer not null
        constraint passenger_ride_id_fk
            references "Ride",
    constraint passenger_pk
        primary key ("passengerId", "rideId")
);

create table "Drivers"
(
    "driverId" integer
        constraint drivers_driver_id_fk
            references "Driver",
    "rideId"   integer
        constraint drivers_ride_id_fk
            references "Ride",
    constraint drivers_pk
        unique ("driverId", "rideId")
);


