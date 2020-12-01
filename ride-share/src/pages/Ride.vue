<template>
  <v-container>
    <div>
      
      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
        :hide-default-footer="true"
      >
      <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.date | moment("MM-DD-YY") }}</td>
            <td>{{ item.time | moment("h:mm a") }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.fuelPrice }}</td>
            <td>{{ item.fee }}</td>
            <td>{{ item.vehicleId }}</td>
            <td>{{ item.fromLocationId }}</td>
            <td>{{ item.toLocationId }}</td>
          </tr>
        </template>
      </v-data-table>
      <br>
      <v-data-table
        class="elevation-1"
        v-bind:headers="headers2"
        v-bind:items="passengers"
      >
      <template v-slot:item="{ item }">
        <tr v-bind:class="itemClass(item)">
          <td>{{ item.firstName }}</td>

        </tr>
      </template>
      </v-data-table>
      <br>
      <v-btn v-on:click="joinRide">Join Ride</v-btn>
      

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Ride",

  data: function() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" },
        { text: "Vehicle", value: "vehicleId" },
        { text: "From", value: "fromLocationId" },
        { text: "To", value: "toLocationId" },
      ],
      headers2: [
        { text: "Passengers in this Ride", value: "passengerId" },
      ],
      rides: [],
      passengers: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    console.log("got here");
    this.$axios.get("/rides").then(response => {
      
      this.rides = response.data.map(ride => ({
        id: ride.id,
        date: ride.date,
        time: ride.time,
        distance: ride.distance,
        fuelPrice: ride.fuelPrice,
        fee: ride.fee,
        vehicleId: ride.vehicleId,
        fromLocationId: ride.fromLocationId,
        toLocationId: ride.toLocationId,
      }));

      this.rides = this.rides.filter(
            rides => rides.id == this.$route.query.id
          );
    });
    this.$axios.get("/passengers").then(response => {
      this.passengers = response.data.map(passenger => ({
        passengerId: passenger.passengerId,
        rideId: passenger.rideId,
        firstName: passenger.User.firstName,
      }));

      this.passengers = this.passengers.filter(
            passengers => passengers.rideId == this.$route.query.id
          );
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass() {
      //pass
    },

    joinRide() {

      this.$axios
        .post(`/rides/${this.$route.query.id}`, {
          userId: this.$store.state.currentAccount.id
        })
        .then((result) => {
          // Based on whether things worked or not, show the
          // appropriate dialog.
          if (result.data.ok) {
            this.showDialog("Success", result.data.msge);
            
          } else {
            this.showDialog("Sorry", result.data.msge);
          }
        })
        .catch((err) => console.log(err));
    },

    // Delete a ride.
    deleteRide(item) {
      this.$axios.delete(`/rides/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local ride
          // by filtering the deleted account from the list of rides.
          this.rides = this.rides.filter(
            ride => ride.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentRide {
  background: rgb(226, 197, 197);
}
</style>
